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
    note
    fromAccountId
    toAccountId
    constructor(ts, currency, amount,note,fromAccountId,toAccountId) {
        this.ts = ts
        this.currency = currency
        this.amount = amount
        this.note = note
        this.fromAccountId = fromAccountId
        this.toAccountId = toAccountId
    }
}