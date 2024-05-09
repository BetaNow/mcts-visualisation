import { Node } from "./node";
import { TicTacToe } from "./tictactoe";

/**
 * @class MCTS
 * @description Represents the Monte Carlo Tree Search algorithm
 *
 * @property {Node} _ROOT - The root node of the MCTS tree
 * @property {Node} _bestNode - The best node found by the MCTS algorithm
 */
export class MCTS {

    // ___ PROPERTIES ___ //

    private readonly _ROOT: Node;
    private _bestNode: Node;

    // ___ CONSTRUCTOR ___ //

    /**
     * @constructor
     * @description Creates a new MCTS instance
     *
     * @param {number[]} board - The board state
     * @param {number} player - The player to move
     */
    constructor (board: number [], player: number) {
        this._ROOT = new Node(null, player, board, -1);
        this._bestNode = this._ROOT;
    }

    // ___ PRIVATE METHODS ___ //

    /**
     * @method select
     * @description Selects the best node to explore next
     *
     * @param {Node} node - The node to select from
     * @return {Node} The selected node
     * @private
     */
    private select (node: Node): Node {
        let current: Node = this._ROOT;

        while (true) {
            if (current.isTerminal()) {
                return current;
            }

            if (current.isLeaf()) {
                this.expand(current);
                return current.getChild(0);
            } else {
                current = current.findBestChild();

                if (current.getProperty('_visits') === 0) {
                    return current;
                }
            }
        }
    }

    /**
     * @method expand
     * @description Expands the children of the given node
     *
     * @param {Node} node - The node to expand
     * @return {void}
     * @private
     */
    private expand (node: Node): void {
        const legalMoves: number[] = TicTacToe.getLegalMoves(node.getProperty('_BOARD'));

        for (let move of legalMoves) {
            const board: number[] = TicTacToe.cloneBoard(node.getProperty('_BOARD'));
            const player = TicTacToe.getOpponent(node.getProperty('_PLAYER'));

            board[move] = player;
            node.addChild(new Node(node, player, board, move));
        }
    }

    /**
     * @method simulate
     * @description Simulates a game from the given node
     *
     * @param {Node} node - The node to simulate from
     * @return {number} The winner of the game
     * @private
     */
    private simulate (node: Node): number {
        let board: number[] = TicTacToe.cloneBoard(node.getProperty('_BOARD'));
        let player: number = node.getProperty('_PLAYER');
        let winner: number = TicTacToe.getWinner(board);

        while (winner === TicTacToe.GAME_CONTINUE) {
            let legalMoves: number[] = TicTacToe.getLegalMoves(board);
            let move: number = legalMoves[Math.floor(Math.random() * legalMoves.length)];

            board[move] = player;
            winner = TicTacToe.getWinner(board);
            player = TicTacToe.getOpponent(player);
        }

        return winner;
    }

    /**
     * @method backPropagate
     * @description Back-propagates the result of the simulation
     *
     * @param {Node} node - The node to back-propagate from
     * @param {number} winner - The winner of the simulation
     * @return {void}
     * @private
     */
    private backPropagate (node: Node, winner: number): void {
        while (node !== null) {
            node.update(winner);
            node = node.getProperty('_PARENT');
        }
    }

    // ___ PUBLIC METHODS ___ //

    /**
     * @method search
     * @description Searches for the best node using the MCTS algorithm
     *
     * @param {number} iterations - The number of iterations to perform
     * @return {Node} The best node found
     */
    public search (iterations: number): Node {
        for (let i = 0; i < iterations; i++) {
            let node: Node = this.select(this._ROOT);
            let winner: number = this.simulate(node);
            this.backPropagate(node, winner);
        }

        let visits: number = 0;
        this._ROOT.getProperty('_children').forEach((child: Node) => {
            if (child.getProperty('_visits') > visits) {
                this._bestNode = child;
                visits = child.getProperty('_visits');
            }
        });

        TicTacToe.printBoard(this._bestNode.getProperty('_BOARD'));
        return this._bestNode;
    }

    // ___ GETTERS ___ //

    /**
     * @method get ROOT
     * @description Returns the root node of the MCTS tree
     *
     * @return {Node} The root node
     */
    public get ROOT (): Node {
        return this._ROOT;
    }

    /**
     * @method get bestNode
     * @description Returns the best node found by the MCTS algorithm
     *
     * @return {Node} The best node
     */
    public get bestNode (): Node {
        return this._bestNode;
    }
}