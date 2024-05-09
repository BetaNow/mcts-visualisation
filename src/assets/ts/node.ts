import { TicTacToe } from "./tictactoe";

/**
 * @class Node
 * @description Represents a node in the MCTS tree
 *
 * @property {Node} _PARENT - The parent node
 * @property {number} _PLAYER - The player that made the move to reach this node
 * @property {number[][]} _BOARD - The board state at this node
 * @property {number} _MOVE - The move that was made to reach this node
 *
 * @property {Node[]} _children - The children of this node
 * @property {number} _visits - The number of times this node has been visited
 * @property {number} _wins - The number of times this node has resulted in a win
 * @property {number} _draws - The number of times this node has resulted in a draw
 * @property {number} _losses - The number of times this node has resulted in a loss
 * @property {number} _UCT - The Upper Confidence Bound for Trees value of this node
 * @property {number} _winner - The winner of the game at this node
 */
export class Node {

    // ___ PROPERTIES ___ //

    private readonly _PARENT: Node | null;
    private readonly _PLAYER: number;
    private readonly _BOARD: number[];
    private readonly _MOVE: number;

    private _children: Node[] = [];
    private _visits: number = 0;
    private _wins: number = 0;
    private _draws: number = 0;
    private _losses: number = 0;
    private _UCT: number = 0;
    private _winner: number = TicTacToe.GAME_CONTINUE;

    // ___ CONSTRUCTOR ___ //

    /**
     * @constructor
     * @description Creates a new Node instance
     *
     * @param {Node} parent - The parent node
     * @param {number} player - The player that made the move to reach this node
     * @param {number[]} board - The board state at this node
     * @param {number} move - The move that was made to reach this node
     */
    constructor (parent: Node | null, player: number, board: number[], move: number) {
        this._PARENT = parent;
        this._PLAYER = player;
        this._BOARD = board;
        this._MOVE = move;
    }

    // ___ METHODS ___ //

    /**
     * @method setUCT
     * @description Sets the UCT value of this node
     *
     * @return {void}
     */
    public setUCT (): void {
        if (this._visits === 0) {
            this._UCT = Number.MAX_VALUE;
        } else {
            let exploitation: number = (this._wins + this._draws / 2) / this._visits;
            let exploration: number = Math.sqrt(2) * Math.sqrt(Math.log(this._PARENT.getProperty('_visits')) / this._visits);
            this._UCT = exploitation + exploration;
        }
    }

    /**
     * @method isLeaf
     * @description Determines if this node is a leaf node
     *
     * @return {boolean} - True if this node is a leaf node, false otherwise
     */
    public isLeaf (): boolean {
        return this._children.length === 0;
    }

    /**
     * @method isTerminal
     * @description Determines if this node is a terminal node
     *
     * @return {boolean} - True if this node is a terminal node, false otherwise
     */
    public isTerminal (): boolean {
        return this._winner !== TicTacToe.GAME_CONTINUE;
    }

    /**
     * @method findBestChild
     * @description Finds the best child node of this node
     *
     * @return {Node} - The best child node
     */
    public findBestChild (): Node {
        this._children.forEach((child: Node) => child.setUCT());
        this._children.sort((a: Node, b: Node) => b.getProperty('_UCT') - a.getProperty('_UCT'));

        return this.getChild(0);
    }

    /**
     * @method update
     * @description Updates the node with the result of a simulation
     *
     * @param {number} winner - The winner of the game
     * @return {void}
     */
    public update (winner: number): void {
        switch (winner) {
            case TicTacToe.GAME_DRAW:
                this._draws++;
                break;
            case this._PLAYER:
                this._wins++;
                break;
            default:
                this._losses++;
                break;
        }
        this._visits++;
    }

    // ___ GETTERS & SETTERS ___ //

    /**
     * @method getProperty
     * @description Gets the value of a property
     *
     * @param {string} property - The property to get the value of
     * @return {any} - The value of the property
     */
    public getProperty (property: string): any {
        return this[property];
    }

    /**
     * @method getChild
     * @description Gets the child node at the specified index
     *
     * @param {number} index - The index of the child node to get
     * @return {Node} - The child node at the specified index
     */
    public getChild (index: number): Node {
        return this._children[index];
    }

    /**
     * @method setProperty
     * @description Sets the value of a property
     *
     * @param {string} property - The property to set the value of
     * @param {any} value - The value to set the property to
     * @return {void}
     */
    public setProperty (property: string, value: any): void {
        // Handle read-only properties, and properties that should not be set directly
        switch (property) {
            case '_PARENT':
            case '_PLAYER':
            case '_BOARD':
            case '_MOVE':
                throw new Error('Property is read-only');
            case '_children':
                throw new Error('Cannot set children directly, use addChild()');
            case '_UCT':
                throw new Error('Cannot set UCT directly, use setUCT()');
            case '_visits':
            case '_wins':
            case '_draws':
            case '_losses':
            case '_winner':
                this[property] = value;
                break;
            default:
                throw new Error('Property does not exist');
        }
    }

    /**
     * @method addChild
     * @description Adds a child node to this node
     *
     * @param {Node} child - The child node to add
     * @return {void}
     */
    public addChild (child: Node): void {
        this._children.push(child);
    }
}