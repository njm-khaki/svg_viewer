import React from "react"
import { log } from "../../util/decorator";

import { Manager } from "./manager";
import { convertCoordinate } from "./functions/coordinateCalculator";
import { isInnerCircle, isInnerEllipse } from "./functions/geometoryCalculator"
import { Offset } from "./models/offset";

export abstract class OperationManager extends Manager {
    /**
     * 図形がクリックされたときの動作
     * 継承先で実装する
     * @param figure 
     */
    protected abstract onClickedCircle(figure: SVGCircleElement | SVGEllipseElement): void

    /**
     * クリック時の処理を実装する
     * @param event 
     */
    onClick(event: React.MouseEvent): void {
        const clickPosition: Offset = this.calcuClickCoordinate({
            event: event
        })
        this.nannkaTekitouniClicksaretaZukeiWpSagasu({
            position: new Offset({
                x: clickPosition.x,
                y: clickPosition.y
            })
        })
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
    }): Offset {
        return convertCoordinate({
            point: new Offset({
                x: event.clientX,
                y: event.clientY,
            }),
            elementSize: this.size,
            viewBox: this.viewBox,
        })
    }

    /**
     * 抽出した円・楕円の内側をクリックしたか判定する
     * 内側のときは継承先で実装したメソッドを呼び出す
     * @param param0 
     */
    @log(`nannkaTekitouniClicksaretaZukeiWpSagasu`)
    // @ts-ignore
    private nannkaTekitouniClicksaretaZukeiWpSagasu({
        position,
    }: {
        position: Offset,
    }): void {
        this.figures.forEach((figure, key, array) => {
            const isClicked: boolean = figure instanceof SVGCircleElement ? isInnerCircle({
                circle: figure,
                position: position,
            }) : figure instanceof SVGEllipseElement ? isInnerEllipse({
                ellipse: figure,
                position: position,
            }) : false

            if (isClicked) {
                this.onClickedCircle(figure)
            }
        })
    }
}