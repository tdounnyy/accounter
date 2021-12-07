const INPUT_FILE = './sample/wc.csv'

HEADER = [
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
exports.parse = function () {
    console.log('csv parse')

    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(INPUT_FILE)
    });

    let reachHeader = false
    lineReader.on('line', function (line) {
        if (reachHeader) {
            s = line.split(",")
            console.log(s)
        } else if (line.startsWith(HEADER[0])) {
            reachHeader = true
        }
    });
}
