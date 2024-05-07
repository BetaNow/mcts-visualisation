/**
 * @class TicTacToe
 * @description The TicTacToe class.
 *
 * @property {number[][]} _WINNING_COMBINATIONS - The winning combinations.
 * @property {number} GAME_CONTINUES - The game continues.
 * @property {number} EMPTY - The empty cell.
 * @property {number} MACHINE - The machine player.
 * @property {number} HUMAN - The human
 * @property {number} DRAW - The draw.
 */
export class TicTacToe {

    private readonly _WINNING_COMBINATIONS: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    public static readonly GAME_CONTINUES: number = -2;

    public static readonly EMPTY: number = -1;

    public static readonly MACHINE: number = 0;

    public static readonly HUMAN: number = 1;

    public static readonly DRAW: number = 2;

    /**
     * @method getWinner
     * @description Get the winner of the game.
     *
     * @param {number[]} state - The current state.
     * @returns {number} - The winner of the game.
     */
    public getWinner (state: number[]): number {
        let winner: number = null;
        let i: number = 0;

        // While the game continues and there are still winning combinations to check.
        while (winner === null && i < this._WINNING_COMBINATIONS.length) {
            const [a, b, c] = this._WINNING_COMBINATIONS[i];
            if (state[a] === state[b] && state[b] === state[c] && state[a] !== TicTacToe.EMPTY) {
                winner = state[a];
            }
            i++;
        }

        // If there is no winner, check if the game is a draw or if it continues.
        if (winner === null) {
            return TicTacToe.hasLegalActions(state) ? TicTacToe.GAME_CONTINUES : TicTacToe.DRAW;
        } else {
            return winner;
        }
    }

    /**
     * @method getLegalActions
     * @description Get the legal actions of the current state.
     *
     * @param {number[]} state - The current state.
     * @returns {number[]} - The legal actions of the current state.
     */
    public static getLegalActions (state: number[]): number[] {
        return state.map((cell, index) => cell === TicTacToe.EMPTY ? index : -1).filter(cell => cell !== -1);
    }

    /**
     * @method hasLegalActions
     * @description Check if the current state has legal actions.
     *
     * @param {number[]} state - The current state.
     * @returns {boolean} - True if the current state has legal actions, false otherwise.
     */
    public static hasLegalActions (state: number[]): boolean {
        return state.some(cell => cell === TicTacToe.EMPTY);
    }

    /**
     * @method getOtherPlayer
     * @description Get the other player.
     *
     * @param {number} player - The current player.
     * @returns {number} - The other player.
     */
    public static getOtherPlayer (player: number): number {
        return player === TicTacToe.MACHINE ? TicTacToe.HUMAN : TicTacToe.MACHINE;  // player ^= 1;
    }
}