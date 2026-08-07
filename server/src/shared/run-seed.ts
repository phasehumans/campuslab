import { ensureSeedData } from './bootstrap.js';

console.log('Seeding database...');
ensureSeedData()
    .then(() => {
        console.log('Seed data successfully inserted!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error seeding data:', error);
        process.exit(1);
    });
