import React from "react"

import { log } from "./../../util/decorator"

import { targets, parents } from "./defines/svgElements"
import { parseViewBox } from "./functions/svgFunctions"
import { node2element } from "./functions/convertElements"
import { Offset } from "./models/offset"
import { Size } from "./models/size"
import { ViewBox } from "./models/viewBox"

/**
 * SVGビューワーの抽象クラス
 */
export abstract class Manager {
    // ビューワーのid
    private readonly _id = `viewer`
    // svgタグにもidを振ると楽になる
    private readonly _viewer = `svg`
    // 表示するSVGの内容
    private _svg: string = ``
    // 表示するSVGに合わせてJSX.Elementを生成する
    private _component: JSX.Element = <div />
    // SVGタグから抽出した円・楕円情報
    private _figures: Array<SVGCircleElement | SVGEllipseElement> = []
    // SVGの表示領域
    private _viewBox: ViewBox = new ViewBox({
        offset: new Offset({
            x: 0,
            y: 0,
        }),
        size: new Size({
            width: 0,
            height: 0.
        }),
    })

    /**
     * 継承先でクリック時の処理を実装させる
     * @param event 
     */
    protected abstract onClick(event: React.MouseEvent): void

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
            onClick={(event: React.MouseEvent) => this.onClick(event)}
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
    get viewBox(): ViewBox {
        return this._viewBox
    }

    /**
     * SVGビューワーの表示サイズを返す
     */
    get size(): Size {
        const viewer = document.getElementById(this._viewer)
        return new Size({
            width: viewer?.clientWidth as number,
            height: viewer?.clientHeight as number
        })
    }

    /**
     * 図形情報
     */
    protected get figures(): Array<SVGCircleElement | SVGEllipseElement> {
        return this._figures
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
}