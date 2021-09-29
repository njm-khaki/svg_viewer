export abstract class Diff<T> {
    protected _previous: T | null
    protected _current: T | null

    constructor () {
        this._previous = null
        this._current = null
    }

    abstract push(value: T): void

    abstract get diff(): T | null

    get previos(): T | null {
        return this._previous
    }

    get current(): T | null {
        return this._current
    }

    clear() {
        this._previous = null
        this._current = null
    }
}