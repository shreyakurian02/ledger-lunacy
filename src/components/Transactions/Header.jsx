const Header = ({ currentBalance }) => (
  <div className="transaction-header">
    <h1>Investing account</h1>
    <h1>Balance: ${currentBalance ?? 0}</h1>
  </div>
);
export default Header;
