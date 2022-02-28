# Animated Sign Pad
## Animate your signatures easily

Animated Sign Pad is an all in one module to draw and generate animated signatures easily 

## Demo
[Here](https://animated-sign-pad.vercel.app/)

![Preview](https://raw.githubusercontent.com/PaulRichez/animated-sign-pad/master/assets/images/demo.gif)

## bugs
 - No bugs - Full stable version

## Features

- Generate SVG for DOM whith or whithout animation
- choose multiple options like lineWidth for draw the same from the canvas to the SVG
- Download SVG whith or whithout animation
- Export or import a JSON for save it easily


## Installation

The better way is :
Download the min file from CDN folder and import { ASP } from './animatedSignpad.min.js/animatedSignpad.min.js';
look on examples for more details

## CDN

Dont use under 1.0.2 (previous version is bugged)

[https://cdn.jsdelivr.net/gh/PaulRichez/animated-sign-pad@master/CDN/1.0.3/build/animatedSignpad.min.js](https://cdn.jsdelivr.net/gh/PaulRichez/animated-sign-pad@master/CDN/1.0.3/build/animatedSignpad.min.js)

## Usage

see the [example folder](https://github.com/PaulRichez/animated-sign-pad/tree/master/examples) for a complete case.

```js
const myAsp = new ASP(canvas, { lineWidth: 6 }); // create a new ASP with lineWidth value 6
const myAsp2 = new ASP(canvas, { }); // create a new ASP with default options
myAsp.clearCanvas(); // clear Canvas
myAsp.getSvg().outerHTML; //get animated svg
svgPreview.innerHTML = myAsp.getSvg(false).outerHTML; // get no animated svg
const data = myAsp.exportData() // get Data for save if needed
myAsp.importData(JSON.parse(data)); // set Data to ASP
myAsp.downloadSvg("test.svg", true); // download svg animated with name test.svg
```

## Options

| name        | type                          | default | desc                                       |
| ------- | ------- | ------- | ------- |
| lineWidth   | Number                        | 3       | writing line width                         |
| strokeStyle | String                        | #000    | line color                                 |
| linecap     | "butt" or "round" or "square" | "round" | shape used to draw the end points of lines |
| timeBetweenLineDraw     | Number | 200 | Time between 2 lines draw in ms |

## Methods
| name | desc |
| ------- | ------- |
| getCanvas() | return canvas object |
| getSvg(animation: boolean = true) | return svg object with animation or no |
| exportData(): { options: IOptions, paths: IPaths[] } | return data for save it |
| importData(data: { options: IOptions, paths: IPaths[] }) | import data for load |
| downloadSvg(fileName: string = "download.svg", animation: boolean = true) | download animated or no animated SVG |


## License

[ISC](https://gist.github.com/indexzero/10602128#file-isc-md) 
