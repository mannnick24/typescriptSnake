import { BoardShape } from "./BoardShape.js";

export abstract class BoardUpdate
{
    private readonly updates: BoardShape[] = [];

    protected updateBoard( ...shapes: BoardShape[] )
    {
        this.updates.push( ...shapes );
    }

    public popUpdates()
    {
        const tempUpdates = this.updates.slice();
        this.updates.length = 0;
        return tempUpdates;
    }
}