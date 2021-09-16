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
    point: number[],
    origin: number[],
}): number => sqrt(square(point[0] - origin[0]) + square(point[1] - origin[1]))

/**
 * 図形情報から中心座標を抜き出す
 * @param param0 
 * @returns 
 */
export const extractCenter = ({
    sphere,
}: {
    sphere: SVGCircleElement | SVGEllipseElement
}): number[] => [
    Number(sphere.getAttribute(x)),
    Number(sphere.getAttribute(y))
]

/**
 * 指定した座標が特定の円の内側か判定する
 * @param param0 
 * @returns 
 */
export const isInnerCircle = ({
    circle,
    x,
    y,
}: {
    circle: SVGCircleElement,
    x: number,
    y: number
}): boolean => {
    const r: number = Number(circle.getAttribute(radius))
    return norm({
        point: [x, y],
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
}): number[] => [
    Number(ellipse.getAttribute(a)),
    Number(ellipse.getAttribute(b))
]

/**
 * 楕円の焦点座標を求める
 * @param param0 
 * @returns 
 */
export const calcuFocus = ({
    x,
    y,
    a,
    b,
}: {
    x: number,
    y: number,
    a: number,
    b: number
}): number[][] => {
    const focus = (a: number, b: number): number => sqrt(square(a) - square(b))
    const landscape:boolean = a > b
    const c = landscape ? focus(a, b) : focus(b, a)
    return landscape ? [
        [x + c, y],
        [x - c, y]
    ] : [
        [x, y + c],
        [x, y - c]
    ]
}

/**
 * 指定した座標が特定の楕円の内側か判定する
 * @param param0 
 * @returns 
 */
export const isInnerEllipse = ({
    ellipse,
    x,
    y
}: {
    ellipse: SVGEllipseElement,
    x: number,
    y: number,
}): boolean => {
    const [a, b]: number[] = extractAxis({ellipse: ellipse})
    const axis: number = a > b ? 2 * a : 2 * b;
    const [_x, _y]: number[] = extractCenter({sphere: ellipse})
    const [focus, nega]: number[][] = calcuFocus({
        x: _x,
        y: _y,
        a: a,
        b: b
    })
    const dis = (focus: number[]) => norm({point: [x, y], origin: focus})

    return axis >= dis(focus) + dis(nega)
}

