// TODO: 2021/12/7 (duanyufei) 模板化

import fs from 'fs'
import moment from 'moment'
import PDFParser from 'pdf2json'
import {Transaction} from "./classes.mjs"

const OUTPUT_TMP = false
const HEADER_ENDING = 'Counter Party'

export async function parsePdf(pdfFile) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", errData => {
            console.error(errData.parserError)
            reject(errData)
        });
        pdfParser.on("pdfParser_dataReady", pdfData => {
            if (OUTPUT_TMP) {
                var result = JSON.stringify(pdfData, null, 2);
                result = decodeURIComponent(result)
                fs.writeFile('./sample/tmp_cmb.json', result.toString(), callback => {
                })
            }
            let extracted = extract(pdfData)

            resolve(groupByTransaction(extracted))
        });
        pdfParser.loadPDF(pdfFile)
    })
}

function extract(json) {
    let afterCounterParty = false;
    let pages = json['Pages']
    const texts = []
    pages.forEach(e => {
        e['Texts'].forEach(i => {
            let target = i['R'][0]['T']
            let result = decodeURIComponent(target)
            if (afterCounterParty) {
                texts.push(result)
            } else if (result == HEADER_ENDING) {
                afterCounterParty = true // 表示 Header 部分结束, 明细部分开始
            }
        })
    })
    let blacklist = [
        '记账日期',
        '货币', //RMB, USD
        '交易金额', //可能正负
        '联机余额',
        '交易摘要',
        '对手信息',
        'Date',
        'Currency',
        'Transaction',
        'Amount',
        'Balance',
        'Transaction Type',
        'Counter Party',
    ]
    return texts
        .filter(value => !blacklist.includes(value)) // 过滤掉每页的 Header
        .filter(value => value.match(/\d*\/\d*/) == null) // 过滤掉页码: 8/12
}

function groupByTransaction(list) {
    return list.reduce((acc, current) => {
            if (moment(current, "YYYY-MM-DD", true).isValid()) {
                acc.push([current])
            } else {
                acc[acc.length - 1].push(current)
            }
            return acc
        }, []
    ).map(it => {
            if (it[6] !== undefined) {
                it[5] = it[5] + "#" + it[6]
                return it
            } else {
                return it
            }
        }
    ).map(it => new Transaction(it[0], it[1], it[2], it[3], it[4], it[5]))
}