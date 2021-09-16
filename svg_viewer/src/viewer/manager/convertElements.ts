const circle = `circle`

/**
 * Childnodeから円・楕円情報に変換する
 * @param param0 
 * @returns 
 */
export const node2element = ({
    node
}: {
    node: ChildNode
}): SVGCircleElement | SVGEllipseElement => node.nodeName === circle ? node as SVGCircleElement : node as SVGEllipseElement