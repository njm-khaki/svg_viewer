const sqrt = Math.sqrt
const square = (x: number): number => Math.pow(x, 2)
const radius: string = `r`
const x: string = `cx`
const y: string = `cy`
const a: string = `rx`
const b: string = `ry`

/**
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

export const extractCenter = ({
    sphere,
}: {
    sphere: SVGCircleElement | SVGEllipseElement
}): number[] => [
    Number(sphere.getAttribute(x)),
    Number(sphere.getAttribute(y))
]

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

export const extractAxis = ({
    ellipse,
}: {
    ellipse: SVGEllipseElement
}): number[] => [
    Number(ellipse.getAttribute(a)),
    Number(ellipse.getAttribute(b))
]

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

