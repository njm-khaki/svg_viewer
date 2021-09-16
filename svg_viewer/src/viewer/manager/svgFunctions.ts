const viewBox: string = `viewBox`

export const parseViewBox = ({ svg }: { svg: SVGElement }): number[] => {
    try {
        const box= svg.getAttribute(viewBox) as string
        return box.split(` `).map((value) => Number(value))
    } catch (e) {
        return [0, 0, 0, 0]
    }
}