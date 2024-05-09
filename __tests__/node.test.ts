import { TicTacToe } from "../src/assets/ts/tictactoe";
import { Node } from "../src/assets/ts/node";

describe('Node', () => {
    let node: Node;

    beforeEach(() => {
        node = new Node(null, TicTacToe.MACHINE, Array(9).fill(-1), -1);
    });

    /* ___ Constructor ___ */
    test('should create a new instance of Node', () => {
        expect(node).toBeInstanceOf(Node);
    });
});
