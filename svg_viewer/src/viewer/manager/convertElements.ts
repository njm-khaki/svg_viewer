const circle = `circle`

export const node2element = ({
    node
}: {
    node: ChildNode
}): SVGCircleElement | SVGEllipseElement => node.nodeName === circle ? node as SVGCircleElement : node as SVGEllipseElement