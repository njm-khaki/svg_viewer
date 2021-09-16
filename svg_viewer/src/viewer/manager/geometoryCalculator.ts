const sqrt = Math.sqrt
const square = (x: number): number => Math.pow(x, 2)
const radius: string = `r`
const x: string = `cx`
const y: string = `cy`

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

export const extractCircleCenter = ({
    circle,
}: {
    circle: SVGCircleElement
}): number[] => [
    Number(circle.getAttribute(x)),
    Number(circle.getAttribute(y))
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
        origin: extractCircleCenter({circle: circle})
    }) <= r
}