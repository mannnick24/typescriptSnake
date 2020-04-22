import { GulpGenerator } from './GulpGenerator.js';
import { BoardShape } from './BoardShape.js';

export interface BoardLayout
{
    readonly dimension: number;
    blockCoordinates(): BoardShape[];
    vortexCoordinates(): BoardShape[];
    gulpGenerator(): GulpGenerator;
    furniture(): BoardShape[];
}