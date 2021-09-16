import React from "react"

import { targets, parents } from "./svgElements"
import { parseViewBox } from "./svgFunctions"
import { node2element } from "./convertElements"
import { isInnerCircle } from "./geometoryCalculator"

export abstract class Manager {
    private readonly _id = `viewer`
    private readonly _viewer = `svg`
    protected _svg: string = ``
    protected _component: JSX.Element = <div />
    private _figures: Array<SVGCircleElement | SVGEllipseElement> = []
    protected _viewBox: number[] = [0, 0, 0, 0]

    abstract onClickedCircle(figure: SVGCircleElement | SVGEllipseElement): void

    set svg(svg: string) {
        this._svg = svg
        this._component = <div
            id={this._id}
            dangerouslySetInnerHTML={{
                __html: svg
            }}
            onClick={(event: React.MouseEvent): void => {
                const [x ,y] = this.calcuClickCoordinate({
                    event: event
                })
                this._figures.forEach((figure, key, array) => {
                    if (figure instanceof SVGCircleElement) {
                        if (isInnerCircle({
                            circle: figure, 
                            x: x, 
                            y: y
                        })) {
                            this.onClickedCircle(figure)
                        }
                    }
                })
            }}
        />
        
        // すぐにやるとDOMから取得できないので
        // 遅延させて解析する
        setTimeout(
            () => this.analysisSvgFigure(),
            100
        )
    }

    get svg(): string {
        return this._svg
    }

    get component(): JSX.Element {
        return this._component
    }

    get viewBox(): number[] {
        return this._viewBox
    }

    private analysisSvgFigure(): void {
        const viewer = document.getElementById(this._id)
        if (!viewer) {
            return
        }

        this._figures = []
        let child: ChildNode | null = viewer.firstChild
        while(child) {
            child = child.nextSibling
            if (child) {
                if (child.nodeName === `svg`) {
                    const svg = child as SVGElement
                    svg.setAttribute(`id`, this._viewer)
                    this._viewBox = parseViewBox({svg: svg})
                }
                this.searchFigures({node: child})
            }
        }
        console.log(this._figures)
        // this.searchFigures({node: svg})
    }

    private searchFigures({node}: {node: ChildNode}): void {
        let child: ChildNode | null = node?.firstChild
        while (child) {
            if (parents.includes(child.nodeName)) {
                this.searchFigures({node: child})
                return
            }
            if (targets.includes(child.nodeName)) {
                
                this._figures.push(node2element({node: child}))
            }
            child = child.nextSibling
        }
    }

    private calcuClickCoordinate({
        event,
    }: {
        event: React.MouseEvent,
    }): number[] {
        const viewer = document.getElementById(this._viewer)
        const [width, height] = [
            viewer?.clientWidth as number,
            viewer?.clientHeight as number
        ]

        return this.convertCoordinate({
            x: event.clientX,
            y: event.clientY,
            width: width,
            height: height
        })
    }

    private convertCoordinate({
        x,
        y,
        width,
        height,
    }: {
        x: number,
        y: number,
        width: number,
        height: number,
    }): number[] {
        return [
            x / width * this._viewBox[2] + this._viewBox[0],
            y / height * this._viewBox[3] + this._viewBox[1]
        ]
    }
}