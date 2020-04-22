import { Board } from './board/Board.js';
import { SimpleBoardLayout } from './board/boardLayout/SimpleBoardLayout.js';
import { BoardShape, BoardShapeType } from './board/BoardShape.js';

// could have used constants but this is a typescript experiment
type moveType = -1 | 0 | 1;
export type MoveArrayType = [ moveType, moveType ];

const twoPI = Math.PI * 2;

export class CanvasBoardView
{
    public static LOOP_TIME = 200;
    private ctx2d: CanvasRenderingContext2D;
    private board: Board;
    private keyInstruction: MoveArrayType;
    private squareSize: number;
    private halfSquare: number

    private boardSize: number;

    constructor()
    {
        this.keyInstruction = [0, 0];
        const canvas = document.getElementById( "snakeCanvas" ) as HTMLCanvasElement;
        // how many squares
        this.boardSize = canvas.width / 20;
        // make the squares fill the space
        this.squareSize = canvas.width / this.boardSize;
        this.halfSquare = this.squareSize / 2;
        this.board = new Board( new SimpleBoardLayout( this.boardSize, 2 ) );

        const ctx = canvas.getContext( "2d" );
        if ( ctx == null )
            throw new Error( "no ctx 2d" );
        this.ctx2d = ctx;
        document.addEventListener("keydown", ( e ) => this.handleKeyEvt( e ) );

        // reset
        const reset = document.getElementById( "reset" ) as HTMLButtonElement;
        reset.addEventListener("click", () => this.handleReset() );
    }

    start()
    {
        this.draw();
        const gameLoop = ()=>
        {
            this.draw()
            setTimeout( gameLoop, CanvasBoardView.LOOP_TIME );
        };
        gameLoop();
    }

    draw()
    {
        try
        {
            this.board.move( this.keyInstruction );

            const boardShapes = this.board.popUpdates();

            for( const boardShape of boardShapes )
            {
                this.drawShape( boardShape );
            }
        }
        catch( e )
        {
            document.getElementById("message")!.textContent = e;
        }
    }

    private drawShape( shape: BoardShape )
    {
        const pixelX = shape.x * this.squareSize;
        const pixelY = shape.y * this.squareSize;
        const radius = this.halfSquare - ( this.squareSize / 10 );

        this.ctx2d.clearRect(pixelX, pixelY, this.squareSize, this.squareSize);

        // for now all board shapes are squares
        if ( shape.boardShapeType === BoardShapeType.snakeHead )
        {
            this.ctx2d.beginPath();
            this.ctx2d.arc( pixelX + this.halfSquare, pixelY + this.halfSquare, radius, 0, twoPI, false);
            this.ctx2d.fillStyle = 'black';
            this.ctx2d.fill();
            // this.ctx2d.lineWidth = 5;
            this.ctx2d.strokeStyle = '#003300';
            this.ctx2d.stroke();
        }
        else if ( shape.boardShapeType === BoardShapeType.gulp )
        {
            this.ctx2d.beginPath();
            this.ctx2d.arc( pixelX + this.halfSquare, pixelY + this.halfSquare, radius, 0, twoPI, false);
            this.ctx2d.fillStyle = 'green';
            this.ctx2d.fill();
            // this.ctx2d.lineWidth = 5;
            this.ctx2d.strokeStyle = '#003300';
            this.ctx2d.stroke();
        }
        else if ( shape.boardShapeType !== BoardShapeType.clear )
        {
            this.ctx2d.fillRect(pixelX, pixelY, this.squareSize, this.squareSize);
        }
    }

    private handleReset()
    {
        this.keyInstruction = [ 0, 0 ];
        this.ctx2d.clearRect(0, 0, this.squareSize * this.boardSize, this.squareSize * this.boardSize);
        this.board = new Board( new SimpleBoardLayout( this.boardSize, 2 ) );
    }

    private handleKeyEvt( event: KeyboardEvent )
    {
        let newInstruction = this.keyInstruction;
        // left arrow
        if (event.keyCode === 37) {
            newInstruction = [ -1, 0 ];
        }
        // up
        else if (event.keyCode === 38) {
            newInstruction = [ 0, -1 ];
        }
        // right
        else if (event.keyCode === 39) {
            newInstruction = [ 1, 0 ];
        }
        // down
        else if (event.keyCode === 40) {
            newInstruction = [ 0, 1 ];
        }

        if ( Math.abs( newInstruction[0] - this.keyInstruction[0] ) !== 2 &&
            Math.abs( newInstruction[0] - this.keyInstruction[0] ) !== 2 )
        {
            // never go back
            this.keyInstruction = newInstruction;
        }
     }
}