import { Offset } from "../models/offset"
import { Size } from "../models/size"

/**
 * 平方根を求める
 * 省略形
 */
const sqrt = Math.sqrt
/**
 * 2乗した値を返す
 * 省略形
 * @param x 
 * @returns 
 */
const square = (x: number): number => Math.pow(x, 2)
/**
 * 円・楕円の属性情報
 * 数学ライクな変数名で呼び出す
 */
const radius: string = `r`
const x: string = `cx`
const y: string = `cy`
const a: string = `rx`
const b: string = `ry`

/**
 * 2点間の距離を求める
 * @param param0 
 * @returns 
 */
export const norm = ({
    point,
    origin
}: {
    point: Offset,
    origin: Offset,
}): number => sqrt(square(point.x - origin.x) + square(point.y - origin.y))

/**
 * 図形情報から中心座標を抜き出す
 * @param param0 
 * @returns 
 */
export const extractCenter = ({
    sphere,
}: {
    sphere: SVGCircleElement | SVGEllipseElement
}): Offset => new Offset({
    x: Number(sphere.getAttribute(x)),
    y:Number(sphere.getAttribute(y))
})

/**
 * 指定した座標が特定の円の内側か判定する
 * @param param0 
 * @returns 
 */
export const isInnerCircle = ({
    circle,
    position
}: {
    circle: SVGCircleElement,
    position: Offset
}): boolean => {
    const r: number = Number(circle.getAttribute(radius))
    return norm({
        point: position,
        origin: extractCenter({sphere: circle})
    }) <= r
}

/**
 * 楕円の各軸方向の長さを取得する
 * @param param0 
 * @returns 
 */
export const extractAxis = ({
    ellipse,
}: {
    ellipse: SVGEllipseElement
}): Size => new Size({
    width: Number(ellipse.getAttribute(a)),
    height: Number(ellipse.getAttribute(b)),
})

/**
 * 楕円の焦点座標を求める
 * @param param0 
 * @returns 
 */
export const calcuFocus = ({
    origin,
    axis,
}: {
    origin: Offset
    axis: Size,
}): Offset[] => {
    const focus = (a: number, b: number): number => sqrt(square(a) - square(b))
    const landscape: boolean = axis.width > axis.height
    const c = landscape ? focus(axis.width, axis.height) : focus(axis.height, axis.width)
    return landscape ? [
        new Offset({
            x: origin.x + c, 
            y: origin.y
        }),
        new Offset({
            x: origin.x - c,
            y: origin.y
        })
    ] : [
        new Offset({
            x: origin.x,
            y: origin.y + c
        }),
        new Offset({
            x: origin.x,
            y: origin.y - c
        })
    ]
}

/**
 * 指定した座標が特定の楕円の内側か判定する
 * @param param0 
 * @returns 
 */
export const isInnerEllipse = ({
    ellipse,
    position,
}: {
    ellipse: SVGEllipseElement,
    position: Offset,
}): boolean => {
    const axis: Size = extractAxis({ellipse: ellipse})
    const length: number = axis.width > axis.height ? 2 * axis.width : 2 * axis.height;
    const center: Offset = extractCenter({sphere: ellipse})
    const [focus, nega]: Offset[] = calcuFocus({
        origin: center,
        axis: axis
    })
    const dis = (focus: Offset) => norm({
        point: position, 
        origin: focus,
    })

    return length >= dis(focus) + dis(nega)
}

