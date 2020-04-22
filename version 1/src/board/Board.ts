import { BoardLayout } from './BoardLayout.js';
import { Snake } from './Snake.js';
import type {MoveArrayType} from '../CanvasBoardView.js';
import { BoardUpdate } from './BoardUpdate.js';
import { Coordinate } from '../Coordinate.js'

export class Board extends BoardUpdate
{
    private readonly boardLayout: BoardLayout;
    private readonly snake: Snake;

    constructor( boardLayout: BoardLayout )
    {
        super();
        this.boardLayout = boardLayout;

        this.snake = new Snake( 3, boardLayout );

        this.updateBoard( ...boardLayout.blockCoordinates() );
        this.updateBoard( ...boardLayout.gulpGenerator().gulps() );
        this.updateBoard( ...this.snake.popUpdates() );
    }

    public popUpdates()
    {
        this.updateBoard( ...this.boardLayout.gulpGenerator().popUpdates() );
        this.updateBoard( ...this.snake.popUpdates() );
        return super.popUpdates();
    }

    move( moveArrayType: MoveArrayType )
    {
        if ( moveArrayType[0] === 0 && moveArrayType[1] === 0 )
            return;
        // array destructuring
        const [x, y] = moveArrayType;
        this.snake.move( x, y );

        if ( this.checkEdgeCollision( this.snake.head ) )
        {
            throw new Error( "you hit the edge" );
        }

        this.didGulp( this.snake.head );
    }

    checkEdgeCollision( coord: Coordinate )
    {
        return coord.x < 0 || coord.x > this.boardLayout.dimension ||
            coord.y < 0 || coord.y > this.boardLayout.dimension;
    }

    didGulp( coord: Coordinate )
    {
        const gulps = this.boardLayout.gulpGenerator().gulps();

        let gulped = -1;

        for( let i = 0; i < gulps.length; i++ )
        {
            if ( gulps[i].x === coord.x && gulps[i].y === coord.y )
            {
                gulped = i;
                break;
            }
        }

        // TODO replenish gulps with the gulp generator
        if ( gulped > -1)
        {
            this.snake.gulp();
            gulps.splice( gulped, 1 );
            this.boardLayout.gulpGenerator().updateGulps( gulps );
            return true;
        }
        return false;
    }
}