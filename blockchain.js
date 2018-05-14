let Block = require('./block');
let Transaction = require('./transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.minigReward = 100;
    };

    createGenesisBlock() {
        return new Block('01/01/2018', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    };

    minePendingTransactions(minigRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, minigRewardAddress, this.minigReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let index = 1; index < this.chain.length; index++) {
            const current = this.chain[index];
            const prev = this.chain[index - 1];

            if (current.hash !== current.calculateHash()) {
                return false;
            }

            if (current.previousHash !== prev.hash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;