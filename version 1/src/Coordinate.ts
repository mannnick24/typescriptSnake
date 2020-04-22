export class Coordinate
{
    private static randomInt( n: number )
    {
        return Math.floor( Math.random() * n );
    }

    static randomSquare( dim: number )
    {
        return new Coordinate( Coordinate.randomInt( dim ), Coordinate.randomInt( dim ) )
    }

    static checkCollision( toCheck: Coordinate[] | Coordinate, sourceCoordinates: Coordinate[] )
    {
        const toCheckArray = toCheck instanceof Coordinate ? [ toCheck ] : toCheck;
        const checkxSet = new Set();
        const checkySet = new Set();

        toCheckArray.forEach( coord =>
        {
            checkxSet.add( coord.x );
            checkySet.add( coord.y );
        } );
        return sourceCoordinates.some( sourceCoord =>
        {
            if ( checkxSet.has( sourceCoord.x ) && checkySet.has( sourceCoord.y ) )
            {
                return toCheckArray.some( checkCoord =>
                {
                    return checkCoord.x === sourceCoord.x && checkCoord.y === sourceCoord.y;
                } );
            }
            return false;
        } );
    }
    readonly x: number;
    readonly y: number;

    constructor( x: number, y: number )
    {
        this.x = x;
        this.y = y;
    }

    next( x: number, y: number )
    {
        return new Coordinate( x + this.x, y + this.y  );
    }
}