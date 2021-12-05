const fs = require("fs");
exports.pdfParser = function () {
    console.log('start')
    const fs = require('fs'),
        PDFParser = require("pdf2json");

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        var result = JSON.stringify(pdfData, null, 2);
        result = decodeURIComponent(result)
        fs.writeFile('tmp.json', result.toString(), callback => {
            result = JSON.parse(result)
            result = extract(result)
            console.log(result);
            fs.writeFile('result.json', result.toString(), callback => {
            })
        })
    });
    pdfParser.loadPDF("./bank_test.pdf");

    console.log('done')
}

function extract(raw) {
    let pages = raw['pages']
    var texts = []
    for (page in pages) {
        for (text in page) {
            let t = text['R']['T']
            texts.add(t)
        }
    }
    return texts
}