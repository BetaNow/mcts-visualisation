/**
 * @class TicTacToe
 * @description A class to represent the game of Tic-Tac-Toe
 *
 * @property {number[][]} _WINNING_COMBINATIONS - The winning combinations for the game
 *
 * @property {number} GAME_CONTINUE - The game is still in progress
 * @property {number} EMPTY - The cell is empty
 * @property {number} MACHINE - The machine player
 * @property {number} HUMAN - The human
 * @property {number} GAME_DRAW - The game is a draw
 */
export class TicTacToe {

    // ___ PROPERTIES ___ //

    private static readonly _WINNING_COMBINATIONS: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Rows
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    public static readonly GAME_CONTINUE: number = -2;
    public static readonly EMPTY: number = -1;
    public static readonly MACHINE: number = 0;
    public static readonly HUMAN: number = 1;
    public static readonly GAME_DRAW: number = 2;

    // ___ METHODS ___ //

    /**
     * @method getLegalMoves
     * @description Returns the legal moves for the given board state
     *
     * @param {number[]} board - The board state
     * @return {number[]} The legal moves
     */
    public static getLegalMoves (board: number[]): number[] {
        return board.map((cell: number, index: number) => cell === TicTacToe.EMPTY ? index : TicTacToe.EMPTY)
            .filter((move: number) => move !== TicTacToe.EMPTY);
    }

    /**
     * @method getWinner
     * @description Returns the winner of the game for the given board state
     *
     * @param {number[]} board - The board state
     * @return {number} The winner of the game
     */
    public static getWinner (board: number[]): number {
        let winner: number = TicTacToe.GAME_CONTINUE;
        let i = 0;

        while (winner === TicTacToe.GAME_CONTINUE && i < TicTacToe._WINNING_COMBINATIONS.length) {
            const [a, b, c] = TicTacToe._WINNING_COMBINATIONS[i];

            if (board[a] !== TicTacToe.EMPTY && board[a] === board[b] && board[a] === board[c]) {
                winner = board[a];
            }

            i++;
        }

        if (winner === TicTacToe.GAME_CONTINUE) {
            return TicTacToe.hasLegalMoves(board) ? TicTacToe.GAME_CONTINUE : TicTacToe.GAME_DRAW;
        } else {
            return winner;
        }
    }

    /**
     * @method hasLegalMoves
     * @description Returns whether the given board state has legal moves
     *
     * @param {number[]} board - The board state
     * @return {boolean} Whether the given board state has legal moves
     */
    public static hasLegalMoves (board: number[]): boolean {
        return TicTacToe.getLegalMoves(board).length > 0;
    }

    /**
     * @method cloneBoard
     * @description Clones the given board state
     *
     * @param {number[]} board - The board state
     * @return {number[]} The cloned board state
     */
    public static cloneBoard (board: number[]): number[] {
        return board.slice();
    }

    /**
     * @method getOpponent
     * @description Returns the opponent of the given player
     *
     * @param {number} player - The player
     * @return {number} The opponent of the given player
     */
    public static getOpponent (player: number): number {
        return TicTacToe.MACHINE === player ? TicTacToe.HUMAN : TicTacToe.MACHINE; // player ^= 1
    }

    /**
     * @method printBoard
     * @description Prints the given board state
     * <pre>
     *     0 | 1 | 2
     *    ---+---+---
     *     3 | 4 | 5
     *    ---+---+---
     *     6 | 7 | 8
     * </pre>
     *
     * @param {number[]} board - The board state
     * @return {void}
     */
    public static printBoard (board: number[]): void {
        let newBoard: (' ' | 'X' | 'O')[] = board.slice().map((cell: number) => cell === TicTacToe.EMPTY ? ' ' : cell === TicTacToe.MACHINE ? 'X' : 'O');
        console.log(`\n ${newBoard[0]} | ${newBoard[1]} | ${newBoard[2]}\n---+---+---\n ${newBoard[3]} | ${newBoard[4]} | ${newBoard[5]}\n---+---+---\n ${newBoard[6]} | ${newBoard[7]} | ${newBoard[8]}`);
    }
}