import {parseCsv} from "./csvparser.mjs";
import {parsePdf} from "./pdfparser.mjs"
import fs from "fs";

const WECHAT_FILE = './sample/wc.csv'

// const CMB_FILE = "./sample/bank_test.pdf"
const CMB_FILE = "./sample/cmb.pdf"

let wechat = await parseCsv(WECHAT_FILE);
console.log(wechat)
wechat = JSON.stringify(wechat, null, 2);
fs.writeFile('./sample/result_wc.json', wechat.toString(), () => {
})

let cmb = await parsePdf(CMB_FILE)
console.log(cmb)

cmb = JSON.stringify(cmb, null, 2);
fs.writeFile('./sample/result_cmb.json', cmb.toString(), () => {
})
