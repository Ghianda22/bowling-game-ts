import {Game} from "../src/game";
import {expect, test} from "@jest/globals";

const game = new Game();

test('givenEmptyGame_thenScoreShouldReturn0', () => {
    //given
    //when
    const actualScore: number = game.score();

    //then
    expect(actualScore).toBe(0);
})

