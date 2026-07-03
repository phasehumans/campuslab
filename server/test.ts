import { db } from './src/config/db.js'
import { getContestRoomRecord, buildContestRoomResponse } from './src/modules/contest/contest.service.js'

async function test() {
    try {
        console.log("Fetching room...");
        const room = await getContestRoomRecord("X6QWLB");
        console.log("Room:", !!room);
        if (room) {
            console.log("Building response...");
            const response = await buildContestRoomResponse(room, room.hostUserId);
            console.log("Response:", !!response);
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await db.$disconnect();
    }
}
test();
