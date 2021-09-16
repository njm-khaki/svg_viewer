import React from "react"

import { log } from "./../../util/decorator"

import { targets, parents } from "./svgElements"
import { parseViewBox } from "./svgFunctions"
import { node2element } from "./convertElements"
import { isInnerCircle, isInnerEllipse } from "./geometoryCalculator"

/**
 * SVGビューワーの抽象クラス
 */
export abstract class Manager {
    // ビューワーのid
    private readonly _id = `viewer`
    // svgタグにもidを振ると楽になる
    private readonly _viewer = `svg`
    // 表示するSVGの内容
    protected _svg: string = ``
    // 表示するSVGに合わせてJSX.Elementを生成する
    protected _component: JSX.Element = <div />
    // SVGタグから抽出した円・楕円情報
    private _figures: Array<SVGCircleElement | SVGEllipseElement> = []
    // SVGの表示領域
    protected _viewBox: number[] = [0, 0, 0, 0]

    /**
     * 図形がクリックされたときの動作
     * 継承先で実装する
     * @param figure 
     */
    abstract onClickedCircle(figure: SVGCircleElement | SVGEllipseElement): void

    /**
     * 表示するSVGをセットする
     */
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
                this.nannkaTekitouniClicksaretaZukeiWpSagasu({
                    x: x,
                    y: y
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

    /**
     * セットしたSVG確認用
     */
    @log(`get svg`)
    // @ts-ignore
    get svg(): string {
        return this._svg
    }

    /**
     * セットしたSVGも応じてJSX.Elementを生成する
     */
    @log(`get component`)
    // @ts-ignore
    get component(): JSX.Element {
        return this._component
    }

    /**
     * SVGの表示領域
     */
    @log(`get viewBox`)
    // @ts-ignore
    get viewBox(): number[] {
        return this._viewBox
    }

    /**
     * SVGタグを解析して円・楕円を抽出する
     * @returns 
     */
    @log(`analysisSvgFigure`)
    // @ts-ignore
    private analysisSvgFigure(): void {
        // 表示領域を抽出
        const viewer = document.getElementById(this._id)
        if (!viewer) {
            return
        }

        // 円・楕円情報を初期化
        this._figures = []
        // 子要素を取得
        let child: ChildNode | null = viewer.firstChild
        // 子要素でループさせる
        while(child) {
            if (child) {
                if (child.nodeName === `svg`) {
                    /// SVG要素にidを振っておく
                    const svg = child as SVGElement
                    svg.setAttribute(`id`, this._viewer)
                    // 表示領域を抽出する
                    this._viewBox = parseViewBox({svg: svg})
                }
                // 円・楕円を探索する
                this.searchFigures({node: child})
            }
            child = child.nextSibling
        }
        // 探索結果を確認
        console.log(this._figures)
        // this.searchFigures({node: svg})
    }

    /**
     *  SVGから円・楕円を抽出する
     * @param param0 
     * @returns 
     */
    @log(`searchFigures`)
    // @ts-ignore
    private searchFigures({node}: {node: ChildNode}): void {
        // 子要素でループ
        let child: ChildNode | null = node?.firstChild
        while (child) {
            if (parents.includes(child.nodeName)) {
                // SVGとGタグではさらに子要素を探索する
                this.searchFigures({node: child})
                return
            }
            if (targets.includes(child.nodeName)) {
                // 探索対象の図形であれば
                // nodeから図形情報に変換する
                this._figures.push(node2element({node: child}))
            }
            child = child.nextSibling
        }
    }

    /**
     * ブラウザ上でクリックした座標を
     * SVG上の座標に変換する
     * @param param0 
     * @returns 
     */
    @log(`calcuClickCoordinate`)
    // @ts-ignore
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

    /**
     * ブラウザ上の座標空間から
     * SVG上の座標空間へ変換する
     * @param param0 
     * @returns 
     */
    @log(`convertCoordinate`)
    // @ts-ignore
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

    /**
     * 抽出した円・楕円の内側をクリックしたか判定する
     * 内側のときは継承先で実装したメソッドを呼び出す
     * @param param0 
     */
    @log(`nannkaTekitouniClicksaretaZukeiWpSagasu`)
    // @ts-ignore
    private nannkaTekitouniClicksaretaZukeiWpSagasu({
        x,
        y,
    }: {
        x: number,
        y: number
    }): void {
        this._figures.forEach((figure, key, array) => {
            const isClicked: boolean = figure instanceof SVGCircleElement ? isInnerCircle({
                circle: figure, 
                x: x, 
                y: y
            }) : figure instanceof SVGEllipseElement ? isInnerEllipse({
                ellipse: figure,
                x: x,
                y: y
            }) : false
            
            if (isClicked) {
                this.onClickedCircle(figure)
            }
        })
    }
}