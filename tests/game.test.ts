import {Game} from "../src/game";
import {describe, expect, it, test} from "@jest/globals";

const getRandomIntFrom0ToBound = (bound: number): number => Math.floor(Math.random() * bound);


test('Given an empty game, score should return 0', () => {
    //given
    const game = new Game();

    //when
    const actualScore: number = game.score();

    //then
    expect(actualScore).toBe(0);
})

test('Given an empty game, when calling roll(x), score should return x', () => {
    //given
    const game = new Game();

    const x: number = getRandomIntFrom0ToBound(11);

    //when
    game.roll(x);
    const actualScore: number = game.score();

    //then
    expect(actualScore).toBe(x);
})

test('Given a game with no spares nor strikes, score should be the sum of the rolls', () => {
    //given
    const game = new Game();

    let rolls: number [] = [];
    let expectedScore: number = 0;

    for (let i = 0; i < 10; i += 2) { //incrementing of 2 to pass from a frame to other

        //defining the rolls for the frame, assuring the sum never get to 10
        rolls[i] = getRandomIntFrom0ToBound(10);
        rolls[i + 1] = getRandomIntFrom0ToBound(10 - rolls[i]);

        //calculating the expected score
        expectedScore += rolls[i];
        expectedScore += rolls[i + 1];

        //assigning the rolls to the game
        game.roll(rolls[i]);
        game.roll(rolls[i + 1]);
    }


    //when
    const actualScore = game.score();

    //then
    expect(actualScore).toBe(expectedScore);
})


describe('Given a game with a spare, score should double the next roll', () => {
    it.each([
        [[8, 2, 2, 4, 5, 4, 3, 3, 2, 3, 2, 5, 7, 0, 0, 1, 5, 1, 2, 6], 67],
        [[2, 8, 7, 2, 8, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 63],
        [[5, 5, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4], 96],
        [[9, 1, 3, 2, 4, 1, 1, 7, 5, 3, 0, 0, 6, 1, 3, 0, 2, 7, 9, 0], 67]
    ])("", (rolls: number[], expectedScore: number) => {
        //given
        const game = new Game();

        for (const knockedDownPins of rolls) {
            game.roll(knockedDownPins);
        }

        //when
        const actualScore = game.score();


        //then
        // expect(actualScore).toBe(expectedScore);
    })
})

describe('Given a game with a strike, score should double the next two rolls', () => {
    it.each([
        [[8, 2, 2, 4, 5, 4, 3, 3, 10, 2, 5, 7, 0, 0, 1, 5, 1, 2, 6], 79],
        [[2, 8, 7, 2, 8, 1, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 73],
        [[5, 5, 5, 4, 5, 4, 5, 4, 10, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4], 106],
        [[9, 1, 3, 2, 4, 1, 1, 7, 10, 0, 0, 6, 1, 3, 0, 2, 7, 9, 1], 70]
    ])("", (rolls: number[], expectedScore: number) => {
        //given
        const game = new Game();

        for (const knockedDownPins of rolls) {
            game.roll(knockedDownPins);
        }

        //when
        const actualScore = game.score();

        //then
        expect(actualScore).toBe(expectedScore);
    })
})

describe('Given a game with a spare in the last frame, score should include the bonus roll', () => {
    it.each([
        [[8, 2, 2, 4, 5, 4, 3, 3, 10, 2, 5, 7, 0, 0, 1, 5, 1, 4, 6, 4], 85],
        [[2, 8, 7, 2, 8, 1, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 3], 82],
        [[5, 5, 5, 4, 5, 4, 5, 4, 10, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 6], 113],
        [[9, 1, 3, 2, 4, 1, 1, 7, 10, 0, 0, 6, 1, 3, 0, 2, 7, 9, 1, 8], 78]
    ])("", (rolls: number[], expectedScore: number) => {
        //given
        const game = new Game();

        for (const knockedDownPins of rolls) {
            game.roll(knockedDownPins);
        }

        //when
        const actualScore = game.score();

        //then
        expect(actualScore).toBe(expectedScore);
    })
})

describe('Given a game with a strike in the last frame, score should include the bonus rolls', () => {
    it.each([
        [[8, 2, 2, 4, 5, 4, 3, 3, 10, 2, 5, 7, 0, 0, 1, 5, 1, 10, 6, 4], 91],
        [[2, 8, 7, 2, 8, 1, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 10, 8, 3], 90],
        [[5, 5, 5, 4, 5, 4, 5, 4, 10, 5, 4, 5, 4, 5, 4, 5, 4, 10, 5, 6], 118],
        [[9, 1, 3, 2, 4, 1, 1, 7, 10, 0, 0, 6, 1, 3, 0, 2, 7, 10, 1, 8], 79]
    ])("", (rolls: number[], expectedScore: number) => {
        //given
        const game = new Game();

        for (const knockedDownPins of rolls) {
            game.roll(knockedDownPins);
        }

        //when
        const actualScore = game.score();

        //then
        expect(actualScore).toBe(expectedScore);
    })
})

describe('Given a game with all spares, score should include bonus rolls', () => {
    it.each([
        [[9, 1, 2, 8, 0, 10, 1, 9, 9, 1, 1, 9, 8, 2, 4, 6, 2, 8, 4, 6, 3],134],
        [[6, 4, 0, 10, 3, 7, 8, 2, 7, 3, 6, 4, 3, 7, 4, 6, 4, 6, 5, 5, 8],148],
        [[5, 5, 4, 6, 4, 6, 4, 6, 7, 3, 5, 5, 4, 6, 5, 5, 4, 6, 1, 9, 0],138],
        [[4, 6, 6, 4, 1, 9, 0, 10, 8, 2, 1, 9, 4, 6, 9, 1, 8, 2, 5, 5, 5],147]
    ])('', (rolls: number[], expectedScore: number) => {
        //given
        const game = new Game();

        for (const knockedDownPins of rolls) {
            game.roll(knockedDownPins);
        }

        //when
        const actualScore = game.score();

        //then
        expect(actualScore).toBe(expectedScore);
    })
})


test('Given a game with all spares, score should include bonus rolls', () => {
    //given
    const game = new Game();
    let expectedScore: number = 100;  //since frames are 10 and there's a spare in each frame, the score it's a minimum of 100
    for (let i = 0; i < 10; i++) {
        const firstRoll: number = getRandomIntFrom0ToBound(10); //it cant' score 10 or it'd be a strike
        const secondRoll: number = 10 - firstRoll;
        game.roll(firstRoll);
        game.roll(secondRoll);
        if (i > 0) {
            expectedScore += firstRoll;
        }
    }

    const extraRoll = getRandomIntFrom0ToBound(11);
    game.roll(extraRoll);
    expectedScore += extraRoll;

    //when
    const actualScore = game.score();

    //then
    expect(actualScore).toBe(expectedScore);

})

test('Given a game with all strikes (max points), score should return 300', () => {
    //given
    const game = new Game();
    for (let i = 0; i < 12; i++) {
        game.roll(10);
    }

    //when
    const actualScore = game.score();

    //then
    expect(actualScore).toBe(300);

})

