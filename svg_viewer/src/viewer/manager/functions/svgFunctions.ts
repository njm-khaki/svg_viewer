import { Offset } from "../models/offset"
import { Size } from "../models/size"
import { ViewBox } from "../models/viewBox"

const viewBox: string = `viewBox`

/**
 * SVGの表示領域を抽出する
 * @param param0 
 * @returns 
 */
export const parseViewBox = ({ svg }: { svg: SVGElement }): ViewBox => {
    try {
        const box= svg.getAttribute(viewBox) as string
        const range: number[] = box.split(` `).map((value) => Number(value))
        return new ViewBox({
            offset: new Offset({
                x: range[0],
                y: range[1],
            }),
            size: new Size({
                width: range[2],
                height: range[3],
            }),
        })
    } catch (e) {
        return new ViewBox({
            offset: new Offset({
                x: 0,
                y: 0,
            }),
            size: new Size({
                width: 0,
                height: 0,
            }),
        })
    }
}