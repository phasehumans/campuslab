import { executeCodeAgainstTestcases } from '../../shared/codeRunner.js'

export const executeCode = async (data: { sourceCode: string; language: string; testcases: Array<{ input: string; output?: string }> }) => {
    return executeCodeAgainstTestcases(data)
}
