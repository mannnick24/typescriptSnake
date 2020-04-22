import { Coordinate } from '../Coordinate.js'

export enum BoardShapeType
{
    snakeHead, snakeBody, boardBlock, gulp, clear
}

export class BoardShape extends Coordinate
{
    constructor(
        public readonly boardShapeType: BoardShapeType,
        coordinate: Coordinate )
    {
        super( coordinate.x, coordinate.y );
    }
}
