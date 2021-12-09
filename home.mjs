import {parseCsv} from "./csvparser.mjs";
import {parsePdf} from "./pdfparser.mjs"

const WECHAT_FILE = './sample/wc.csv'

// const CMB_FILE = "./sample/bank_test.pdf"
const CMB_FILE = "./sample/cmb.pdf"

let wechat = await parseCsv(WECHAT_FILE);
console.log(wechat)

let cmb = await parsePdf(CMB_FILE)
console.log(cmb)
