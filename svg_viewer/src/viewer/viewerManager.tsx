import { Manager } from "./manager/manager";

export class ViewerManager extends Manager {
    private readonly _fill = `fill`

    onClickedCircle(figure: SVGCircleElement | SVGEllipseElement): void {
        figure.setAttribute(this._fill, this.changeColor())
        console.log(`on click!!`)
    }

    private changeColor(): string {
        const rand = (): number => Math.floor(Math.random() * 255)
        return `rgb(${rand()},${rand()},${rand()})`
    }
}