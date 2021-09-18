import { Offset } from "../models/offset"
import { Size } from "../models/size"
import { ViewBox } from "../models/viewBox"

/**
     * ブラウザ上の座標空間から
     * SVG上の座標空間へ変換する
     * @param param0 
     * @returns 
     */
export const convertCoordinate = ({
    point,
    elementSize,
    viewBox
}: {
    point: Offset,
    elementSize: Size,
    viewBox: ViewBox
}): Offset => {
    return new Offset({
        x: point.x / elementSize.width * viewBox.size.width + viewBox.offset.x,
        y: point.y / elementSize.height * viewBox.size.height + viewBox.offset.y
    })
}