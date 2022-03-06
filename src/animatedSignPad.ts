/*
    Author: Paul Richez
    Date 26/02/2022
    Animated Sign Pad is an all in one module to generate animated signatures easily 
    github : https://github.com/PaulRichez/animated-sign-pad
*/

export interface IMouseCoord {
    x: Number,
    y: Number
}
export type linecap = "butt" | "round" | "square";
export interface IOptions {
    lineWidth?: number,
    strokeStyle?: String,
    linecap?: linecap,
    timeBetweenLineDraw?: number,
}

export interface IPaths {
    pointPaths: String,
    start: Date,
    end: Date,
}

const defaultOptions = {
    lineWidth: 3,
    strokeStyle: '#000',
    linecap: 'round' as linecap,
    timeBetweenLineDraw: 200,
}
export class ASP {


    private _ctx: any;
    private _mouseCoord: IMouseCoord = { x: 0, y: 0 };

    private drawer = this.draw.bind(this);
    private stoper = this.stop.bind(this);

    private paths: IPaths[] = [];

    constructor(public canvas: HTMLCanvasElement, public options: IOptions = { lineWidth: defaultOptions.lineWidth, strokeStyle: defaultOptions.strokeStyle, linecap: defaultOptions.linecap, timeBetweenLineDraw: defaultOptions.timeBetweenLineDraw }) {
        this._ctx = canvas.getContext('2d');
        this.canvas.addEventListener('pointerdown', this.start.bind(this));
    }

    private initEvent() {
        this.canvas.addEventListener('pointerup', this.stoper);
        this.canvas.addEventListener('pointerleave', this.stoper);
        this.canvas.addEventListener('pointermove', this.drawer);
    }

    private removeEvent() {
        this.canvas.removeEventListener('pointerup', this.stoper);
        this.canvas.removeEventListener('pointerleave', this.stoper);
        this.canvas.removeEventListener('pointermove', this.drawer);
    }

    getCanvas(): any {
        return this.canvas;
    }

    clearCanvas(): void {
        this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paths = [];
    }

    private start(event: PointerEvent) {
        this.setMouseCoord(event);
        this._ctx.beginPath();
        this._ctx.lineWidth = this.options.lineWidth ? this.options.lineWidth : defaultOptions.lineWidth;
        this._ctx.lineCap = this.options.linecap ? this.options.linecap : defaultOptions.linecap;
        this._ctx.strokeStyle = this.options.strokeStyle ? this.options.strokeStyle : defaultOptions.strokeStyle;
        this._ctx.moveTo(this._mouseCoord.x, this._mouseCoord.y);
        this.setMouseCoord(event);
        this._ctx.lineTo(this._mouseCoord.x, this._mouseCoord.y);
        this.paths.push(
            {
                pointPaths: 'M' + this._mouseCoord.x + ',' + this._mouseCoord.y + 'L' + this._mouseCoord.x + ',' + this._mouseCoord.y + ' ' + (Number(this._mouseCoord.x) + Number(0.1)) + ',' + (Number(this._mouseCoord.y) + Number(0.1)),
                start: new Date(),
                end: new Date(),
            });
        this._ctx.stroke();
        this.initEvent();
    }

    private setMouseCoord(event: PointerEvent) {
        this._mouseCoord.x = event.clientX - this.canvas.offsetLeft;
        this._mouseCoord.y = event.clientY - this.canvas.offsetTop;
    }

    private stop() {
        this.paths[this.paths.length - 1].end = new Date();
        this.removeEvent();
    }

    private draw(event: PointerEvent) {
        this._ctx.beginPath();
        this._ctx.lineWidth = this.options.lineWidth ? this.options.lineWidth : defaultOptions.lineWidth;
        this._ctx.lineCap = this.options.linecap ? this.options.linecap : defaultOptions.linecap;
        this._ctx.strokeStyle = this.options.strokeStyle ? this.options.strokeStyle : defaultOptions.strokeStyle;
        this._ctx.moveTo(this._mouseCoord.x, this._mouseCoord.y);
        this.setMouseCoord(event);
        this._ctx.lineTo(this._mouseCoord.x, this._mouseCoord.y);
        this.paths[this.paths.length - 1].pointPaths += ' ' + this._mouseCoord.x + ',' + this._mouseCoord.y;
        this._ctx.stroke();
    }

    getSvg(animation: boolean = true): SVGSVGElement {
        return this.generateSvg(this.canvas, this.options, this.paths, animation);
    }

    exportData(): { options: IOptions, paths: IPaths[] } {
        return {
            options: this.options,
            paths: this.paths
        }
    }

    importData(data: { options: IOptions, paths: IPaths[] }): void {
        this.options = data.options;
        this.paths = data.paths;
        this.paths.forEach((cPath, index) => {
            if (typeof cPath.start === 'string') {
                this.paths[index].start = new Date(cPath.start);
            }
            if (typeof cPath.end === 'string') {
                this.paths[index].end = new Date(cPath.end);
            }
        });
    }

    private generateSvg(canvas: HTMLCanvasElement, options: IOptions, paths: IPaths[], animation: boolean = false): SVGSVGElement {
        // create the svg element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        // set width and height
        svg.setAttribute("width", canvas.width.toString());
        svg.setAttribute("height", canvas.height.toString());

        let oldDifDate = 0;
        let newDifDate = 0;

        paths.forEach((cPath, index) => {
            // create path element
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", `p${index}`);
            path.setAttribute("d", cPath.pointPaths.toString());
            path.setAttribute("stroke", options.strokeStyle ? options.strokeStyle.toString() : defaultOptions.strokeStyle.toString());
            path.setAttribute("stroke-width", options.lineWidth ? options.lineWidth.toString() : defaultOptions.lineWidth.toString());
            path.setAttribute("stroke-linecap", options.linecap ? options.linecap.toString() : defaultOptions.linecap.toString());
            path.setAttribute("fill", "none");
            if (animation) {
                const pathLength = (path.getTotalLength() + 1).toString();
                path.setAttribute("stroke-dasharray", pathLength);
                path.setAttribute("stroke-dashoffset", pathLength);
                newDifDate = cPath.end.getTime() - cPath.start.getTime();

                // create animation element
                const animation = document.createElementNS(svg.namespaceURI, 'animate');
                animation.setAttribute('attributeName', 'stroke-dashoffset');
                animation.setAttribute('begin', oldDifDate + (options.timeBetweenLineDraw ? options.timeBetweenLineDraw : defaultOptions.timeBetweenLineDraw) * index + 1 + 'ms');
                animation.setAttribute('from', pathLength);
                animation.setAttribute('to', '0');
                animation.setAttribute('dur', newDifDate + 'ms');
                animation.setAttribute('calcMode', 'linear');
                animation.setAttribute('fill', 'freeze');
                path.appendChild(animation);

                oldDifDate += newDifDate;
            }
            // add paths to the svg
            svg.appendChild(path);
        });

        return svg;
    }

    downloadSvg(fileName: string = "download.svg", animation: boolean = true): void {
        const svg = this.generateSvg(this.canvas, this.options, this.paths, animation);
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    }

}