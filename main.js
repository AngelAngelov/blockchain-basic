const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        //Random number to change the hash
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty+1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined: ', this.hash);
        
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    };
    createGenesisBlock() {
        return new Block(0, '01/01/2018', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    };

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        /* The block should be added 
         * after a negotiation with
         * other blockchains ion the network
         */
        this.chain.push(newBlock);
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

let myCoin = new Blockchain();

// console.log('Is blockchain valid? ', myCoin.isChainValid());

// myCoin.chain[1].data = {
//     amount: 100
// };

// console.log('Is blockchain valid? ', myCoin.isChainValid());


console.log('Mining block 1 ...');
myCoin.addBlock(new Block(1, '01/01/2017', {
    amount: 4
}));

console.log('Mining block 2 ...');
myCoin.addBlock(new Block(1, '01/04/2017', {
    amount: 10
}));