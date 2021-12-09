import {Transaction} from "./classes.mjs"
import {promises as fs} from 'fs'

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

export async function parse() {
    console.log('csv parse')

    const data = await fs.readFile(INPUT_FILE, 'utf-8')
    const lines = data.split('\n')
    return processLines(lines)
}

function processLines(lines) {
    let result = []
    let reachHeader = false
    lines.forEach(line => {
        if (reachHeader) {
            if (line.length === 0) {
                return
            }
            let columns = line.split(",")
            let transaction = new Transaction(
                columns[0],
                "人民币",
                columns[5],
                columns[1],
                'wechat',
                columns[2]
            )
            result.push(transaction)
        } else if (line.startsWith(HEADER[0])) {
            reachHeader = true
        }
    })
    return result
}
