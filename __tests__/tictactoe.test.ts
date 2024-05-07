import { TicTacToe } from "../src/assets/ts/tictactoe";

describe('TicTacToe', () => {
    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    test('should create a new instance of TicTacToe', () => {
        expect(ticTacToe).toBeInstanceOf(TicTacToe);
    });

    /* ___ Methods ___ */
    test('should get the legal actions', () => {
        let state: number[] = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        let legalActions: number[] = TicTacToe.getLegalActions(state);
        expect(legalActions.length).toBe(9);

        state = [0, 1, 0, 1, 0, 1, 0, 1, 0];
        legalActions = TicTacToe.getLegalActions(state);
        expect(legalActions.length).toBe(0);

        state = [0, 1, -1, 1, 0, -1, 0, 1, 0];
        legalActions = TicTacToe.getLegalActions(state);
        expect(legalActions.length).toBe(2);
    });

    test('should check if the state has legal actions', () => {
        let state: number[] = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        expect(TicTacToe.hasLegalActions(state)).toBe(true);

        state = [0, 1, 0, 1, 0, 1, 0, 1, 0];
        expect(TicTacToe.hasLegalActions(state)).toBe(false);

        state = [0, 1, -1, 1, 0, -1, 0, 1, 0];
        expect(TicTacToe.hasLegalActions(state)).toBe(true);
    });

    test('should get the winner', () => {
        let state: number[] = [-1, -1, -1, -1, -1, -1, -1, -1, -1]; // Game continues
        expect(ticTacToe.getWinner(state)).toBe(TicTacToe.GAME_CONTINUES);

        state = [0, 0, 0, -1, -1, -1, -1, -1, -1]; // Machine wins
        expect(ticTacToe.getWinner(state)).toBe(TicTacToe.MACHINE);

        state = [1, -1, -1, -1, 1, -1, -1, -1, 1]; // Human wins
        expect(ticTacToe.getWinner(state)).toBe(TicTacToe.HUMAN);

        state = [0, 1, 0, 0, 1, 1, 1, 0, 0]; // Draw
        expect(ticTacToe.getWinner(state)).toBe(TicTacToe.DRAW);
    });

    test('should return the other player', () => {
        expect(TicTacToe.getOtherPlayer(TicTacToe.MACHINE)).toBe(TicTacToe.HUMAN);
        expect(TicTacToe.getOtherPlayer(TicTacToe.HUMAN)).toBe(TicTacToe.MACHINE);
    });
});