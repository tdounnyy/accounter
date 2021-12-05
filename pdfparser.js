const fs = require("fs");
const moment = require("moment");
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
        if (OUTPUT_TMP) {
            var result = JSON.stringify(pdfData, null, 2);
            result = decodeURIComponent(result)
            fs.writeFile('./sample/tmp.json', result.toString(), callback => {
            })
        }
        let extracted = extract(pdfData)
        console.log(extracted);
        fs.writeFile('./sample/result.json', extracted.join('\n'), callback => {
        })

        groupByTransaction(extracted)
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

function groupByTransaction(list) {
    let result = list.reduce((acc, current) => {
            if (moment(current, "YYYY-MM-DD", true).isValid()) {
                acc.push([current])
            } else {
                acc[acc.length - 1].push(current)
            }
            return acc
        }, []
    )
    console.log(result)
}