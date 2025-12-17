import { RealPlayer, ComputerPlayer } from "./player";

describe("RealPlayer class", () => {
    test("check existance", () => {
        const player = new RealPlayer();
        expect(player).toBeDefined();
    })
})

describe("ComputerPlayer class", () => {
    test("check existance", () => {
        const player = new ComputerPlayer();
        expect(player).toBeDefined();
    })
})