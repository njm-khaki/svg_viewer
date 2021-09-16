import { Manager } from "./manager/manager";

/**
 * SVGビューワー実装クラス
 */
export class ViewerManager extends Manager {
    private readonly _fill = `fill`

    /**
     * 円・楕円の内側をクリックしたときの動作
     */
    onClickedCircle(figure: SVGCircleElement | SVGEllipseElement): void {
        // 適当な色で塗りつぶす
        figure.setAttribute(this._fill, this.changeColor())
        console.log(`on click!!: ${figure}`)
    }

    /// RGB適当な色を生成する
    private changeColor(): string {
        const rand = (): number => Math.floor(Math.random() * 255)
        return `rgb(${rand()},${rand()},${rand()})`
    }
}