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

    test('should return the player', () => {
        expect(node.PLAYER).toBe(TicTacToe.MACHINE);
    });

    test('should return the value', () => {
        expect(node.value).toBe(0);
    });

    test('should return the number of visits', () => {
        expect(node.visits).toBe(0);
    });

    test('should return the children', () => {
        expect(node.children).toBeInstanceOf(Array);
    });

    test('should return the winner', () => {
        expect(node.winner).toBe(TicTacToe.GAME_CONTINUES);
    });

    /* ___ Methods ___ */
    test('should calculate the UCT value', () => {
        // Add a child to the node.
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1, -1], 1));
        let firstChild = node.children[0];

        // Update the value of the node.
        node.update(TicTacToe.MACHINE);
        firstChild.update(TicTacToe.MACHINE);

        expect(firstChild.UCT).toBe(1); // exploitation = 1 + exploration = 0

        // Update the value of the node.
        node.update(TicTacToe.HUMAN);
        firstChild.update(TicTacToe.HUMAN);

        expect(firstChild.UCT).toBe(Math.sqrt(2 * Math.log(2) / 2)); // exploitation = -1 + exploration = 0.8325546111576977
    });

    test('should add a child to the node', () => {
        // Create new child
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1, -1], 1));
        expect(node.children.length).toBe(1);

        // Create new child
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, -1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1], 2));
        expect(node.children.length).toBe(2);
    });

    test('should update the value of the node', () => {
        // Add a child to the node.
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1, -1], 1));
        const firstChild = node.children[0];

        firstChild.update(TicTacToe.DRAW);
        expect(firstChild.value).toBe(0);  // += 0

        firstChild.update(TicTacToe.MACHINE);
        expect(firstChild.value).toBe(1);  // += 1

        firstChild.update(TicTacToe.HUMAN);
        expect(firstChild.value).toBe(0);  // -= 1

        // Increment the number of visits.
        expect(firstChild.visits).toBe(3);
    });

    test('should return the best child of the node', () => {
        // Create new nodes.
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1, -1], 1));
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, -1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1], 2));

        // Set the UCT value of the children. (one win and one loss)
        node.children[0].update(TicTacToe.MACHINE);
        node.children[1].update(TicTacToe.HUMAN);

        // Check if the best child is the winning child.
        expect(node.getBestChild()).toBe(node.children[0]);
    });

    test('should return true if the node is a leaf', () => {
        // Check if the node is a leaf.
        expect(node.isLeaf()).toBe(true);

        // Add a child to the node.
        node.addChild(new Node(node, TicTacToe.HUMAN, [-1, TicTacToe.MACHINE, -1, -1, -1, -1, -1, -1, -1], 1));
        expect(node.isLeaf()).toBe(false);
    });

    test('should return true if the node is fully expanded', () => {
        // Check if the node is fully expanded.
        expect(node.isFullyExpanded()).toBe(false);

        // Add all the children to the node.
        for (let i = 0; i < 9; i++) {
            let state = Array(9).fill(-1);
            state[i] = TicTacToe.MACHINE;
            node.addChild(new Node(node, TicTacToe.HUMAN, state, i));
        }

        // Check if the node is fully expanded.
        expect(node.isFullyExpanded()).toBe(true);
    });
});
