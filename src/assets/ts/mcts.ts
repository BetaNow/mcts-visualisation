import { Node } from './node';
import { TicTacToe } from "./tictactoe";

/**
 * @class MCTS
 * @description The Monte Carlo Tree Search algorithm.
 *
 * @property {Node} _ROOT - The root node of the tree.
 * @property {TicTacToe} _SIMULATION - The TicTacToe game.
 * @property {Node} _bestMove - The best move of the current state.
 */
export class MCTS {

    private readonly _ROOT: Node;
    
    private readonly _SIMULATION: TicTacToe;

    private _bestMove: Node;

    /**
     * @constructor
     * @description The constructor of the MCTS class.
     *
     * @param {number[]} state - The current state.
     * @param {number} player - The player of the current state.
     */
    constructor (state: number[], player: number) {
        this._ROOT = new Node(null, player, state, -1);
        this._SIMULATION = new TicTacToe();
        this._bestMove = this._ROOT;
    }

    /**
     * @method search
     * @description The Monte Carlo Tree Search algorithm.
     *
     * @param {number} iterations - The number of iterations.
     * @returns {void}
     */
    public search (iterations: number = 100): void {
        // For each iteration. (Selection, Expansion, Simulation, Backpropagation)
        for (let i = 0; i < iterations; i++) {
            let node: Node = this.select();
            let child: Node = this.expand(node);
            let winner: number = this.simulate(child);
            this.backPropagate(child, winner);
        }
        this._bestMove = this._ROOT.getBestChild();
    }

    /**
     * @method select
     * @description The selection phase of the Monte Carlo Tree Search algorithm.
     * @description Select the best child node.
     * @private
     *
     * @returns {Node} - The selected node.
     */
    private select (): Node {
        let node: Node = this._ROOT;
        while (!node.isLeaf() && node.isFullyExpanded()) {
            node = node.getBestChild();
        }
        return node;
    }

    /**
     * @method expand
     * @description The expansion phase of the Monte Carlo Tree Search algorithm.
     * @description Expand the selected node.
     * @private
     *
     * @param {Node} node - The selected node.
     * @returns {Node} - The expanded node.
     */
    private expand (node: Node): Node {
        // Get a random legal action.
        let actions: number[] = TicTacToe.getLegalActions(node.STATE);
        let action: number = actions[Math.floor(Math.random() * actions.length)];
        let state: number[] = node.STATE.slice();
        state[action] = TicTacToe.getOtherPlayer(node.PLAYER);

        // Create a new child node.
        let child: Node = new Node(node, 1 - node.PLAYER, state, action);
        node.addChild(child);
        return child;
    }

    /**
     * @method simulate
     * @description The simulation phase of the Monte Carlo Tree Search algorithm.
     * @description Simulate the game until the end.
     * @private
     *
     * @param {Node} node - The expanded node.
     * @returns {number} - The winner of the simulation.
     */
    private simulate (node: Node): number {
        // Copy the current state.
        let state: number[] = node.STATE.slice();
        let player: number = TicTacToe.getOtherPlayer(node.PLAYER);
        let winner: number = this._SIMULATION.getWinner(state);

        // While the game continues.
        while (winner === TicTacToe.GAME_CONTINUES) {
            // Play a random move.
            let actions: number[] = TicTacToe.getLegalActions(state);
            let action: number = actions[Math.floor(Math.random() * actions.length)];
            state[action] = player;
            // Switch the player.
            player = TicTacToe.getOtherPlayer(player);
            // Check if there is a winner.
            winner = this._SIMULATION.getWinner(state);
        }
        
        return winner;
    }

    /**
     * @method backPropagate
     * @description The backpropagation phase of the Monte Carlo Tree Search algorithm.
     * @description Update the value of the nodes.
     * @private
     *
     * @param {Node} node - The expanded node.
     * @param {number} winner - The winner of the simulation.
     * @returns {void}
     */
    private backPropagate (node: Node, winner: number): void {
        while (node !== null) {
            node.update(winner);
            node = node.PARENT;
        }
    }


    // ___ Getters ___ //

    /**
     * @method ROOT
     * @getter The root node of the tree.
     *
     * @returns {Node} - The root node of the tree.
     */
    public get ROOT (): Node {
        return this._ROOT;
    }

    /**
     * @method bestMove
     * @getter The best move of the current state.
     *
     * @returns {Node} - The best move of the current state.
     */
    public get bestMove (): Node {
        return this._bestMove;
    }

}