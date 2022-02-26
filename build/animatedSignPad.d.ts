export interface IMouseCoord {
    x: Number;
    y: Number;
}
export declare type linecap = "butt" | "round" | "square";
export interface IOptions {
    lineWidth?: number;
    strokeStyle?: String;
    linecap?: linecap;
}
export interface IPaths {
    pointPaths: String;
    start: Date;
    end: Date;
}
export declare class ASP {
    canvas: HTMLCanvasElement;
    options: IOptions;
    paths: IPaths[];
    private _ctx;
    private _mouseCoord;
    private drawer;
    private stoper;
    constructor(canvas: HTMLCanvasElement, options?: IOptions, paths?: IPaths[]);
    private setDefaults;
    private initEvent;
    private removeEvent;
    getCanvas(): any;
    clearCanvas(): void;
    start(event: MouseEvent): void;
    setMouseCoord(event: MouseEvent): void;
    stop(): void;
    draw(event: MouseEvent): void;
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
