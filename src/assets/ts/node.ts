import { TicTacToe } from "./tictactoe";

/**
 * @class Node
 * @description The Node class represents a node in the Monte Carlo Tree Search algorithm.
 *
 * @property {Node | null} _PARENT - The parent node of the current node.
 * @property {number} _ACTION - The action that led to the current node.
 * @property {number[]} _STATE - The state of the current node.
 * @property {number} _value - The value of the current node.
 * @property {number} _UCT - The UCT value of the current node.
 * @property {number} _visits - The number of visits of the current node.
 * @property {Node[]} _children - The children of the current node.
 * @property {number} _winner - The winner of the current node.
 */
export class Node {

    private readonly _PARENT: Node | null = null;

    private readonly _ACTION: number;

    private readonly _STATE: number[];

    private readonly _PLAYER: number;

    private _value: number = 0;

    private _UCT: number = 0;

    private _visits: number = 0;

    private _children: Node[] = [];

    private _winner: number = TicTacToe.GAME_CONTINUES;

    /**
     * @constructor
     * @description The constructor of the Node class.
     *
     * @param {Node | null} parent - The parent node of the current node. If the current node is the root node, the parent node is null.
     * @param {number} player - The player of the current node.
     * @param {number} action - The action that led to the current node.
     * @param {number[]} state - The state of the current node.
     */
    constructor (parent: Node | null, player: number, state: number[], action: number) {
        this._PARENT = parent;
        this._PLAYER = player
        this._STATE = state;
        this._ACTION = action;
    }

    /**
     * @method setUCT
     * @description Sets the UCT value of the current node.
     * @link https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation
     *
     * @returns {void}
     */
    private setUCT (): void {
        if (this._visits === 0) {  // If the current node has not been visited yet.
            this._UCT = Number.MAX_VALUE;
        } else if (this._PARENT) {
            this._UCT = this._value + Math.sqrt(2 * Math.log(this._PARENT.visits) / this._visits);
        }
    }

    /**
     * @method addChild
     * @description Adds a child to the current node.
     *
     * @param {Node} child - The child to add.
     * @returns {void}
     */
    public addChild (child: Node): void {
        this._children.push(child);
    }

    /**
     * @method update
     * @description Updates the value of the current node.
     *
     * @param {Node} node - The node to update.
     * @param {number} winner - The winner of the game.
     * @returns {void}
     */
    public update (node: Node, winner: number): void {
        // Update the value of the current node.
        switch (winner) {
            case TicTacToe.MACHINE:
                this._value += 1;
                break;
            case TicTacToe.HUMAN:
                this._value -= 1;
                break;
            case TicTacToe.GAME_CONTINUES:
                this._value += 0;
                break;
        }

        this._visits++;  // Increment the number of visits of the current node.
        this.setUCT();   // Update the UCT value of the current node.
    }

    /**
     * @method getBestChild
     * @description Returns the best child of the current node.
     *
     * @returns {Node} - The best child of the current node.
     */
    public getBestChild (): Node {
        let bestChild: Node = this.children[0];
        this.children.forEach(child => {
            if (child.UCT > bestChild.UCT) {
                bestChild = child;
            }
        });
        return bestChild;
    }

    /**
     * @method isLeaf
     * @description Check if the current node is a leaf node.
     *
     * @returns {boolean} - True if the current node is a leaf node, false otherwise.
     */
    public isLeaf (): boolean {
        return this.children.length === 0;
    }

    /**
     * @method isFullyExpanded
     * @description Check if the current node is fully expanded.
     *
     * @returns {boolean} - True if the current node is fully expanded, false otherwise.
     */
    public isFullyExpanded (): boolean {
        return this.children.length === TicTacToe.getLegalActions(this._STATE).length;
    }

    // ___ Getters ___ //

    /**
     * @method PARENT
     * @getter The parent node of the current node.
     *
     * @returns {Node | null} - The parent node of the current node.
     */
    public get PARENT (): Node | null {
        return this._PARENT;
    }

    /**
     * @method ACTION
     * @getter The action that led to the current node.
     *
     * @returns {number} - The action that led to the current node.
     */
    public get ACTION (): number {
        return this._ACTION;
    }

    /**
     * @method STATE
     * @getter The state of the current node.
     *
     * @returns {number[]} - The state of the current node.
     */
    public get STATE (): number[] {
        return this._STATE;
    }

    /**
     * @method PLAYER
     * @getter The player of the current node.
     *
     * @returns {number} - The player of the current node.
     */
    public get PLAYER (): number {
        return this._PLAYER;
    }

    /**
     * @method value
     * @getter The value of the current node.
     *
     * @returns {number} - The value of the current node.
     */
    public get value (): number {
        return this._value;
    }

    /**
     * @method UCT
     * @getter The UCT value of the current node.
     *
     * @returns {number} - The UCT value of the current node.
     */
    public get UCT (): number {
        return this._UCT;
    }

    /**
     * @method visits
     * @getter The number of visits of the current node.
     *
     * @returns {number} - The number of visits of the current node.
     */
    public get visits (): number {
        return this._visits;
    }

    /**
     * @method children
     * @getter The children of the current node.
     *
     * @returns {Node[]} - The children of the current node.
     */
    public get children (): Node[] {
        return this._children;
    }

    /**
     * @method winner
     * @getter The winner of the current node.
     *
     * @returns {number} - The winner of the current node.
     */
    public get winner (): number {
        return this._winner;
    }


    // ___ Setters ___ //

    /**
     * @method value
     * @setter The value of the current node.
     *
     * @param {number} winner - The value to set.
     */
    public set winner (winner: number) {
        if (winner < TicTacToe.GAME_CONTINUES || winner > TicTacToe.DRAW) {
            throw new Error("Invalid winner value.");
        } else {
            this._winner = winner;
        }
    }
}