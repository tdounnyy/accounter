import {Transaction} from "./classes.mjs"
import {promises as fs} from 'fs'

let HEADER = [
    "交易时间",
    "交易类型", // 可能退款
    "交易对方", // 对手信息
    "商品", // tag
    "收/支", // 正负
    "金额(元)", // RMB
    "支付方式", // 渠道. 收入则无效,为 '/'
    "当前状态", // 可能退款
    "交易单号", // 流水号
    "商户单号", // 流水号, 退款为空, 收入为 '/'
    "备注" // 基本为空
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
