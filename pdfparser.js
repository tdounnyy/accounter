const fs = require("fs");
const OUTPUT_TMP = false
const HEADER_ENDING = 'Counter Party'
// const TARGET_FILE = "./sample/bank_test.pdf"
const TARGET_FILE = "./sample/cmb.pdf"

exports.pdfParser = function () {
    console.log('start')
    const fs = require('fs'),
        PDFParser = require("pdf2json");

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        var result = JSON.stringify(pdfData, null, 2);
        result = decodeURIComponent(result)
        if (OUTPUT_TMP) {
            fs.writeFile('./sample/tmp.json', result.toString(), callback => {
            })
        }
        result = extract(pdfData)
        console.log(result);
        fs.writeFile('./sample/result.json', result.join('\n'), callback => {
        })
    });
    pdfParser.loadPDF(TARGET_FILE)
}

function extract(raw) {
    let afterCounterParty = false;
    let pages = raw['Pages']
    const texts = []
    pages.forEach(e => {
        // console.log(e['Texts'])
        e['Texts'].forEach(i => {
            let target = i['R'][0]['T']
            let result = decodeURIComponent(target)
            if (afterCounterParty) {
                texts.push(result)
                console.log(result)
            } else if (result == HEADER_ENDING) {
                afterCounterParty = true // 表示 Header 部分结束, 明细部分开始
            }
        })
    })
    return texts
}