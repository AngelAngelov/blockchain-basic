let Blockchain = require('./blockchain');
let Block = require('./block');
let Transaction = require('./transaction');

let myCoin = new Blockchain();

myCoin.createTransaction(new Transaction('address1', 'address2', 100))
myCoin.createTransaction(new Transaction('address2', 'address1', 50))

console.log('\n Starting the miner...');
myCoin.minePendingTransactions('my-address');

console.log('\nBalance of address1 is ', myCoin.getBalanceOfAddress('address1'));
console.log('\nBalance of address2 is ', myCoin.getBalanceOfAddress('address2'));
console.log('\nBalance of mine is ', myCoin.getBalanceOfAddress('my-address'));


myCoin.createTransaction(new Transaction('address1', 'address2', 50))
console.log('\n Starting the miner again...');
myCoin.minePendingTransactions('my-address');

console.log('\nBalance of address1 is ', myCoin.getBalanceOfAddress('address1'));
console.log('\nBalance of address2 is ', myCoin.getBalanceOfAddress('address2'));
console.log('\nBalance of mine is ', myCoin.getBalanceOfAddress('my-address'));