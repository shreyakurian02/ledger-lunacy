import {
  formatString,
  formatDate,
  formatDescription,
  formatAmount,
} from "./utils";

const Transactions = ({ transactions = [] }) => (
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(
          ({ amount, balance, type, date, source, destination }) => (
            <tr>
              <td>{formatDate(date)}</td>
              <td>{formatString(type)}</td>
              <td>
                {formatDescription({ amount, source, destination, type })}
              </td>
              <td>{formatAmount(amount)}</td>
              <td>{formatAmount(balance)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

export default Transactions;
