import { BoardShape } from "./BoardShape.js";

export interface GulpGenerator
{
    gulps(): BoardShape[];
    updateGulps( coords: BoardShape[] ): void;
}