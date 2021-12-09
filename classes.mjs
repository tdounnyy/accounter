export class Account {
    id
    name
    balance
    alias
}

export class Transaction {
    ts
    currency
    amount
    balance
    fromAccountId
    toAccountId

    constructor(ts, currency, amount, balance, fromAccountId, toAccountId) {
        this.ts = ts
        this.currency = currency
        this.amount = amount
        this.balance = balance
        this.fromAccountId = fromAccountId
        this.toAccountId = toAccountId
    }
}