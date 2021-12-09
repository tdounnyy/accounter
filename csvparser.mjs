import {Transaction} from "./classes.mjs"
import {promises as fs} from 'fs'

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

export async function parseCsv(csvFile) {
    console.log('csv parse')

    const data = await fs.readFile(csvFile, 'utf-8')
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
                '-0.00',
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
