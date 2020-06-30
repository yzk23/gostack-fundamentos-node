import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income;
    let outcome;
    let total;

    if (this.transactions.length === 0) {
      income = 0;
      outcome = 0;
      total = 0;

      return { income, outcome, total };
    }

    const mapIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    income =
      mapIncome.length > 0
        ? mapIncome.reduce((valor, proximoValor) => valor + proximoValor)
        : 0;

    const mapOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    outcome =
      mapOutcome.length > 0
        ? mapOutcome.reduce((valor, proximoValor) => valor + proximoValor)
        : 0;

    total = Math.abs(income - outcome);

    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
