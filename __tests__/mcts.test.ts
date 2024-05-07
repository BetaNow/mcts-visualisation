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

    /* ___ VARIABLES ___ */
    test('should have a property _ROOT', () => {
        expect(mcts).toHaveProperty('_ROOT');
        expect(mcts.ROOT).toStrictEqual(new Node(null, 1, Array(9).fill(-1), -1));
    });

    test('should have a property _SIMULATION', () => {
        expect(mcts).toHaveProperty('_SIMULATION');
    });

    test('should have a property _bestMove', () => {
        expect(mcts).toHaveProperty('_bestMove');
        expect(mcts.bestMove).toBeInstanceOf(Node);
    });

    /* ___ METHODS ___ */
    test('should have a method search', () => {
        expect(mcts).toHaveProperty('search');
        expect(mcts.search).toBeInstanceOf(Function);

        mcts.search(1000);
        expect(mcts.bestMove).toBeInstanceOf(Node);

        // The best move should be the best child of the root node.
        expect(mcts.bestMove).toStrictEqual(mcts.ROOT.getBestChild());

        // The first best move is always the center of the board.
        expect(mcts.bestMove.STATE).toStrictEqual([-1, -1, -1, -1, TicTacToe.MACHINE, -1, -1, -1, -1]);
    });
});