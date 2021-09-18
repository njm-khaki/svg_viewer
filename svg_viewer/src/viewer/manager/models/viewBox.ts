import { Offset } from "./offset"
import { Size } from "./size"

export class ViewBox {
    private readonly _offset: Offset
    private readonly _size: Size
    
    constructor ({
        offset,
        size,
    }: {
        offset: Offset,
        size: Size
    }) {
        this._offset = offset
        this._size = size
    }

    get offset(): Offset {
        return this._offset
    }

    get size(): Size {
        return this._size
    }
}