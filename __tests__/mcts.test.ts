import { MCTS } from '../src/assets/ts/mcts';
import { Node } from '../src/assets/ts/node';
import { TicTacToe } from "../src/assets/ts/tictactoe";

describe('MCTS', () => {
    let mcts: MCTS;

    beforeEach(() => {
        mcts = new MCTS(Array(9).fill(-1), 1);
    });

    test('should create a new instance of MCTS', () => {
        expect(mcts).toBeInstanceOf(MCTS);
    });
});