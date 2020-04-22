import { BoardLayout } from '../BoardLayout.js';
import { SimpleGulpGenerator } from './SimpleGulpGenerator.js';
import { GulpGenerator } from '../GulpGenerator.js';
import { BoardShape } from '../BoardShape.js';

export class SimpleBoardLayout implements BoardLayout
{
    private readonly _gulpGenerator: GulpGenerator;

    constructor(
        // assume square
        readonly dimension: number,
        private readonly gulpCount: number )
    {
        this._gulpGenerator = new SimpleGulpGenerator(
            this.dimension,
            this.gulpCount,
             this.blockCoordinates() );
    }

    blockCoordinates(): BoardShape[] {
        return [];
    }

    vortexCoordinates(): BoardShape[] {
        return [];
    }

    gulpGenerator(): GulpGenerator {
        return this._gulpGenerator;
    }

    furniture(): BoardShape[]
    {
        return [ ...this.blockCoordinates().slice(), ...this._gulpGenerator.gulps() ];
    }
}