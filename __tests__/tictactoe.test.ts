import { TicTacToe } from "../src/assets/ts/tictactoe";

describe('TicTacToe', () => {
    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    test('should create a new instance of TicTacToe', () => {
        expect(ticTacToe).toBeInstanceOf(TicTacToe);
    });
});