export class Size {
    private readonly _width: number
    private readonly _height: number
    
    constructor ({
        width,
        height,
    }: {
        width: number,
        height: number,
    }) {
        this._width = width
        this._height = height
    }

    get width(): number {
        return this._width
    }

    get height(): number {
        return this._height
    }

    get area(): number {
        return this._width * this._height
    }
}