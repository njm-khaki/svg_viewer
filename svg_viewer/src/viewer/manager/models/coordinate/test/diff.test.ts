import { Offset, zero } from "../../offset";

import { Diff } from "../diff";
import { DiffOffset } from "../diffOffset";

test(`diff offset test`, () => {
    const diff: Diff<Offset> = new DiffOffset()
    const v1 = new Offset({
        x: 1,
        y: 0
    })
    diff.push(v1)
    
    const v2 = new Offset({
        x: 0,
        y: 1
    })
    diff.push(v2)

    const ans = new Offset({
        x: -1,
        y: 1
    })
    expect(diff.diff).toEqual(ans)

    const inverse = new Offset({
        x: 0,
        y: 1
    })
    diff.push(inverse)
    expect(diff.diff).toEqual(zero())

    diff.clear()
    expect(diff.diff).toBeNull()
})
