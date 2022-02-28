export interface IMouseCoord {
    x: Number;
    y: Number;
}
export declare type linecap = "butt" | "round" | "square";
export interface IOptions {
    lineWidth?: number;
    strokeStyle?: String;
    linecap?: linecap;
    timeBetweenLineDraw?: number;
}
export interface IPaths {
    pointPaths: String;
    start: Date;
    end: Date;
}
export declare class ASP {
    canvas: HTMLCanvasElement;
    options: IOptions;
    private _ctx;
    private _mouseCoord;
    private drawer;
    private stoper;
    private paths;
    constructor(canvas: HTMLCanvasElement, options?: IOptions);
    private setDefaults;
    private initEvent;
    private removeEvent;
    getCanvas(): any;
    clearCanvas(): void;
    private start;
    private setMouseCoord;
    private stop;
    private draw;
    getSvg(animation?: boolean): SVGSVGElement;
    exportData(): {
        options: IOptions;
        paths: IPaths[];
    };
    importData(data: {
        options: IOptions;
        paths: IPaths[];
    }): void;
    private generateSvg;
    downloadSvg(fileName?: string, animation?: boolean): void;
}
