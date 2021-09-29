const sqrt = Math.sqrt
const square = (x: number): number => Math.pow(x, 2)

export const zero = (): Offset => new Offset({
    x: 0,
    y: 0
})

export class Offset {
    private readonly _x: number
    private readonly _y: number
    
    constructor ({
        x,
        y,
    }: {
        x: number,
        y: number,
    }) {
        this._x = x
        this._y = y
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    get norm(): number {
        return sqrt(square(this._x) + square(this._y))
    }
}