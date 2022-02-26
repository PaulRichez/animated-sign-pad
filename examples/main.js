import { ASP } from '../build/animatedSignpad.min.js';

const canvas = document.getElementById('canvas');
const btnClear = document.getElementById('button-clear');
const btnAnimate = document.getElementById('button-animate');
const btnNormal = document.getElementById('button-normal');
const btnExport = document.getElementById('button-export');
const btnImport = document.getElementById('button-import');
const btnDonwload = document.getElementById('button-download');
const svgPreview = document.getElementById('svgPreview');
const textArea = document.getElementById('data');

const myAsp = new ASP(canvas, { lineWidth: 6 });

btnClear.onclick = function () {
    console.log('btn clear');
    myAsp.clearCanvas();
}

btnAnimate.onclick = function () {
    console.log('btn animate');
    svgPreview.innerHTML = myAsp.getSvg().outerHTML;
}

btnNormal.onclick = function () {
    console.log('btn normal');
    svgPreview.innerHTML = myAsp.getSvg(false).outerHTML;
}

btnExport.onclick = function () {
    console.log('btn export');
    const data = myAsp.exportData()
    textArea.value = JSON.stringify(data);
}

btnImport.onclick = function () {
    console.log('btn import');
    myAsp.importData(JSON.parse(textArea.value));
    btnAnimate.click();
}

btnDonwload.onclick = function () {
    console.log('btn donwload');
    myAsp.downloadSvg("test.svg", true);
}
