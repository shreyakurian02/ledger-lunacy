import { useState, useEffect } from "react";
import Transactions from "./components/Transactions";
import TransactionHeader from "./components/Transactions/Header";
import "./stylesheets/application.scss";
import AppHeader from "./components/AppHeader";
import BounceLoader from "react-spinners/BounceLoader";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeDuplicateTransactions = (data) =>
    data.reduce((uniqueTransactions, currentTransaction) => {
      const isDuplicate = uniqueTransactions.some(
        (transaction) =>
          transaction.activity_id === currentTransaction.activity_id
      );

      if (!isDuplicate) uniqueTransactions.push(currentTransaction);

      return uniqueTransactions;
    }, []);

  const orderTransactions = (data) =>
    data.sort((arr1, arr2) => {
      if (new Date(arr1.date) > new Date(arr2.date)) return -1;
      if (new Date(arr1.date) < new Date(arr2.date)) return 1;
      return 0;
    });

  const fetchTransactions = () => {
    fetch("./complicated_ledger.json")
      .then((response) => response.json())
      .then((data) => removeDuplicateTransactions(data))
      .then((data) => orderTransactions(data))
      .then((uniqueTransactions) => setTransactions(uniqueTransactions))
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <AppHeader />
      {isLoading ? (
        <div className="spinner-container">
          <BounceLoader color="#20207C" />
        </div>
      ) : (
        <div className="transaction-container">
          <TransactionHeader currentBalance={transactions[0]?.balance} />
          <Transactions transactions={transactions} />
        </div>
      )}
    </>
  );
};

export default App;
