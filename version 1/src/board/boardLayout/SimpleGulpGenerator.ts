import {GulpGenerator} from '../GulpGenerator.js'
import { BoardShape, BoardShapeType } from '../BoardShape.js';
import { BoardUpdate } from '../BoardUpdate.js';
import { Coordinate } from '../../Coordinate.js'

export class SimpleGulpGenerator extends BoardUpdate implements GulpGenerator
{
    private gulpsCache:BoardShape[] = [];

    constructor(
        private readonly boardDimension: number,
        private readonly gulpCount: number,
        private readonly blocks: BoardShape[] )
    {
        super();
        this.gulpsCache = [];
        for ( let i = 0; i < this.gulpCount; i++ )
        {
            this.gulpsCache.push( this.newGulp() );
        }
    }

    public updateGulps( gulps: BoardShape[] ): void {
        this.gulpsCache = gulps;
        this.gulpsCache.push( this.newGulp() );
    }

    public gulps(): BoardShape[] {
        return this.gulpsCache;
    }

    private newGulp(): BoardShape
    {
        let gulp
        while( !gulp )
        {
            gulp = Coordinate.randomSquare( this.boardDimension );
            if ( Coordinate.checkCollision( gulp, this.blocks ) )
            {
                gulp = null;
            }
        }
        return new BoardShape( BoardShapeType.gulp, gulp );
    }
}