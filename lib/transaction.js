// lib/transactions.js
import { db } from './firebase';
import { collection, addDoc, Timestamp, getDocs, query, where } from 'firebase/firestore';

export async function writeTransaction(userName, account, ethTransferTx, tokenTransferTx, txType) {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      userName,
      account,
      ...(tokenTransferTx && {tokenTransferTx}),
      ...(ethTransferTx && {ethTransferTx}),
      txType,
      date: Timestamp.now(),
    });
    alert('Transaction successful!');
  } catch (error) {
    console.log(error)
    alert('Error adding transaction to history!');
  }
}

export async function fetchTransactions(userName) {
  try {
    const q = query(collection(db, 'transactions'), where('userName', '==', userName));
    const querySnapshot = await getDocs(q);
    const transactions = [];
   
      querySnapshot.forEach((doc) => {
        transactions.push(doc.data());
      });
      return transactions;
  } catch (error) {
    console.error('Error fetching transactions: ', error);
    return [];
  }
}

// Swap transaction handler
export const storePendingTransaction = async (amount, walletAddress, transactionType, userId, email) => {
  try {

    // Save pending transaction to Firestore with a unique ID
    await addDoc(collection(db, 'pendingTransactions'), {
      userId, 
      email,
      walletAddress,
      amount,
      transactionType,
      status: 'pending',
      timestamp: new Date(),
    });

  } catch (error) {
    console.error(error)
    alert('Adding Transaction to history failed. Please try again.');
  }
};

export const fetchPendingTransactions = async () => {
    const querySnapshot = await getDocs(collection(db, 'pendingTransactions'));
    const transactions = querySnapshot.docs.map(doc => ({
      id: doc.id, // Automatically include the unique document ID
      ...doc.data(),
    }));
    return transactions;
  };
