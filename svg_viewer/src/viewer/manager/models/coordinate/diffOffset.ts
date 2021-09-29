import { Offset } from "../offset"
import { Diff } from "./diff"

export class DiffOffset extends Diff<Offset> {
    
    get diff(): Offset | null {
        const sub = (v1: Offset) => (v2: Offset): Offset => new Offset({
            x: v1.x - v2.x,
            y: v1.y - v2.y,
        })
        return this._previous === null || this._current === null
            ? null
            : sub(this._current)(this._previous)
    }
}