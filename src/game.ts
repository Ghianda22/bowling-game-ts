const MAX_POINTS_PER_ROLL: number = 10;
const MAX_ROLLS_PER_GAME: number = 21;

export class Game {
    _score: number = 0;
    _rollsInGame: number[] = [];

    /**
     * This method calculates the bonuses of the game and returns the final score.
     * <br>
     * Bonuses:
     * <br>
     * - Spare: when the player knocks down all MAX_POINTS_PER_ROLL pins in two rolls
     * <br>
     * -> bonus = number of pins of the next roll
     * <br>
     * - Strike: when the player knocks down all MAX_POINTS_PER_ROLL pins in the first roll of the frame
     * <br>
     * -> bonus = number of pins of the next two rolls
     * <br>
     *
     * @return the final score of the game with bonuses
     */
    public score(): number {
        for (let i = 0; i < this._rollsInGame.length; i += 2) {
            if (this._rollsInGame.length > i + 3) {

                let firstRollAfterCurrentFrame: number = this._rollsInGame[i + 2];

                if (this.isNotSpare(i)) {
                    continue;
                }

                this._score += firstRollAfterCurrentFrame;

                if (this.isNotStrike(i)) {
                    continue;
                }

                if (firstRollAfterCurrentFrame !== MAX_POINTS_PER_ROLL) {
                    this._score += this._rollsInGame[i + 3];
                } else {
                    this._score += this._rollsInGame[i + 4];
                }
            }
        }
        return this._score;
    }


    /**
     * This method is called after each roll.
     * It saves the roll in the list and sums it to the partial score
     */
    roll(knockedDownPins: number) {
        this._rollsInGame.push(knockedDownPins);

        if(knockedDownPins == MAX_POINTS_PER_ROLL && this.isNotLastFrame() && this.isFirstRollOfFrame(knockedDownPins)){
            this._rollsInGame.push(0);
        }

        this._score += knockedDownPins;

    }


    isNotSpare(i: number): boolean {
        return (this._rollsInGame[i] + this._rollsInGame[i + 1]) !== MAX_POINTS_PER_ROLL;
    }

    isNotStrike(i: number): boolean {
        return this._rollsInGame[i] !== MAX_POINTS_PER_ROLL;
    }

    isNotLastFrame(): boolean {
        return this._rollsInGame.length < MAX_ROLLS_PER_GAME - 3;
    }

    isFirstRollOfFrame(knockedDownPins: number): boolean {
        return this._rollsInGame.lastIndexOf(knockedDownPins) % 2 == 0;
    }
}