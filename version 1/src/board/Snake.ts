import { BoardShape, BoardShapeType } from "./BoardShape.js";
import { BoardUpdate } from "./BoardUpdate.js";
import { Coordinate } from '../Coordinate.js'
import { BoardLayout } from "./BoardLayout.js";

export class Snake extends BoardUpdate
{
    private readonly body: BoardShape[];
    private gulped = false;

    constructor( length: number, boardLayout: BoardLayout )
    {
        super();
        this.body = this.randomBody( length, boardLayout );

        while( Coordinate.checkCollision( this.body, boardLayout.furniture() ) )
        {
            this.body = this.randomBody( length, boardLayout );
        }

        for( const seg of this.body )
        {
            this.updateBoard( seg );
        }
    }

    private randomBody( length: number, boardLayout: BoardLayout )
    {
        const body:BoardShape[] = [];

        // head in the middle third
        const third = Math.floor( boardLayout.dimension / 3 );
        const randInMidThird = Math.floor( ( Math.random() * third ) ) + third;
        const head = new BoardShape(
            BoardShapeType.snakeHead,
            new Coordinate( randInMidThird , randInMidThird ) );
        body.push( head );
        let tail = head;

        for( let i = 1; i < length; i++ )
        {
            tail = new BoardShape( BoardShapeType.snakeBody, tail.next( 1, 0 ) );
            body.push( tail );
        }
        return body;
    }

    // TODO refactor the gulping
    move( deltaX: number, deltaY: number )
    {
        if ( deltaX === 0 && deltaY === 0 )
            return;
        // after move, the head is going to be a body
        this.updateBoard( new BoardShape( BoardShapeType.snakeBody, this.head ) );

        const newHead = new BoardShape( BoardShapeType.snakeHead, this.head.next( deltaX, deltaY ) );
        if ( this.checkSelfCollision( newHead ) )
        {
            throw new Error( "you bit yourself" );
        }
        // bring me the head of alfredo garcia
        this.head = newHead;
        this.updateBoard( new BoardShape( BoardShapeType.snakeHead, this.head ) );

        if ( !this.gulped )
        {
            this.updateBoard( new BoardShape( BoardShapeType.clear, this.tail ) );
            this.body.length = this.body.length - 1;
        }
        else
        {
            this.gulped = false;
        }
    }

    gulp()
    {
        this.gulped = true;
    }

    checkSelfCollision( coord: Coordinate )
    {
        return this.body.some( snakeCoord =>
        {
            return snakeCoord.x === coord.x && snakeCoord.y === coord.y;
        } );
    }

    get head()
    {
        return this.body[0];
    }

    set head( coord: BoardShape )
    {
        this.body.unshift( coord )
    }

    get tail()
    {
        return this.body[ this.length - 1 ];
    }

    set tail( coord: BoardShape )
    {
        this.body.push( coord );
    }

    get length()
    {
        return this.body.length;
    }
}