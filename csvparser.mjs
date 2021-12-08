import {Transaction} from "./classes.mjs"
import readline from 'readline'
import fs from 'fs'

const INPUT_FILE = './sample/wc.csv'

let HEADER = [
    "交易时间",
    "交易类型",
    "交易对方",
    "商品",
    "收/支",
    "金额(元)",
    "支付方式",
    "当前状态",
    "交易单号",
    "商户单号",
    "备注"
]

export function parse() {
    console.log('csv parse')

    let lineReader = readline.createInterface({
        input: fs.createReadStream(INPUT_FILE)
    });

    let reachHeader = false
    lineReader.on('line', function (line) {
        if (reachHeader) {
            let s = line.split(",")
            let t = new Transaction(
                s[0],
                "人民币",
                s[5],
                s[1],
                'wechat',
                s[2]
            )
            console.log(t)
        } else if (line.startsWith(HEADER[0])) {
            reachHeader = true
        }
    });
}
