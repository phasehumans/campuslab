import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'

// Import all topic files
import { arraysStringsProblems } from './seed-data/01-arrays-strings.js'
import { sortingSearchingProblems } from './seed-data/02-sorting-searching.js'
import { linkedListsProblems } from './seed-data/03-linked-lists.js'
import { stacksQueuesProblems } from './seed-data/04-stacks-queues.js'
import { hashmapsSetsProblems } from './seed-data/05-hashmaps-sets.js'
import { twoPointersSlidingProblems } from './seed-data/06-two-pointers-sliding.js'
import { recursionBacktrackingProblems } from './seed-data/07-recursion-backtracking.js'
import { treesProblems } from './seed-data/08-trees.js'
import { graphsProblems } from './seed-data/09-graphs.js'
import { dynamicProgrammingProblems } from './seed-data/10-dynamic-programming.js'
import { greedyProblems } from './seed-data/11-greedy.js'
import { heapsProblems } from './seed-data/12-heaps.js'
import { triesStringsProblems } from './seed-data/13-tries-strings.js'
import { bitManipulationProblems } from './seed-data/14-bit-manipulation.js'
import { mathNumberTheoryProblems } from './seed-data/15-math-number-theory.js'

import type { SeedProblem } from './seed-data/types.js'

const DATABASE_URL =
    process.env.DATABASE_URL ?? 'postgresql://myuser:mypassword@localhost:5433/campus_lab'

async function main() {
    const pool = new Pool({ connectionString: DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const db = new PrismaClient({ adapter })

    const forceReseed = process.argv.includes('--force')

    try {
        // Check if problems already exist
        const existingCount = await db.problem.count()

        if (existingCount > 0 && !forceReseed) {
            console.log(`\n⚠️  Database already contains ${existingCount} problems.`)
            console.log('   Use --force flag to delete existing problems and re-seed.')
            console.log('   Example: npx tsx prisma/seed.ts --force\n')
            return
        }

        if (forceReseed && existingCount > 0) {
            console.log(`\n🗑️  Deleting ${existingCount} existing problems...`)
            await db.testCaseResult.deleteMany({})
            await db.submission.deleteMany({})
            await db.problemSolved.deleteMany({})
            await db.problem.deleteMany({})
            console.log('   Done.\n')
        }

        // Create or find admin user for seeding
        const ADMIN_PRN = 'admin'
        let adminUser = await db.user.findUnique({ where: { prn: ADMIN_PRN } })

        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('Admin@123', 10)
            adminUser = await db.user.create({
                data: {
                    name: 'Admin',
                    prn: ADMIN_PRN,
                    role: 'ADMIN',
                    password: hashedPassword,
                },
            })
            console.log('👤 Created admin user (PRN: admin, Password: Admin@123)')
        } else {
            console.log('👤 Using existing admin user')
        }

        // Collect all problems
        const allProblems: SeedProblem[] = [
            ...arraysStringsProblems,
            ...sortingSearchingProblems,
            ...linkedListsProblems,
            ...stacksQueuesProblems,
            ...hashmapsSetsProblems,
            ...twoPointersSlidingProblems,
            ...recursionBacktrackingProblems,
            ...treesProblems,
            ...graphsProblems,
            ...dynamicProgrammingProblems,
            ...greedyProblems,
            ...heapsProblems,
            ...triesStringsProblems,
            ...bitManipulationProblems,
            ...mathNumberTheoryProblems,
        ]

        console.log(`\n📦 Total problems to seed: ${allProblems.length}`)
        console.log(`   Easy: ${allProblems.filter((p) => p.difficulty === 'EASY').length}`)
        console.log(`   Medium: ${allProblems.filter((p) => p.difficulty === 'MEDIUM').length}`)
        console.log(`   Hard: ${allProblems.filter((p) => p.difficulty === 'HARD').length}`)
        console.log('')

        // Insert problems in batches
        const BATCH_SIZE = 25
        let inserted = 0

        for (let i = 0; i < allProblems.length; i += BATCH_SIZE) {
            const batch = allProblems.slice(i, i + BATCH_SIZE)

            await Promise.all(
                batch.map((problem) =>
                    db.problem.create({
                        data: {
                            title: problem.title,
                            description: problem.description,
                            difficulty: problem.difficulty,
                            tags: problem.tags,
                            constraints: problem.constraints,
                            hints: problem.hints,
                            editorial: problem.editorial,
                            examples: problem.examples,
                            testcases: problem.testcases,
                            codesnippets: problem.codesnippets,
                            referneceSolution: problem.referneceSolution,
                            userId: adminUser.id,
                        },
                    })
                )
            )

            inserted += batch.length
            const progress = Math.round((inserted / allProblems.length) * 100)
            process.stdout.write(`\r🌱 Seeding... ${inserted}/${allProblems.length} (${progress}%)`)
        }

        console.log(`\n\n✅ Successfully seeded ${inserted} problems!`)

        // Verification
        const counts = await db.problem.groupBy({
            by: ['difficulty'],
            _count: { id: true },
        })

        console.log('\n📊 Verification:')
        for (const row of counts) {
            console.log(`   ${row.difficulty}: ${row._count.id}`)
        }

        const totalCount = await db.problem.count()
        console.log(`   Total: ${totalCount}`)
        console.log('')
    } catch (error) {
        console.error('\n❌ Seed failed:', error)
        process.exit(1)
    } finally {
        await db.$disconnect()
        await pool.end()
    }
}

main()
