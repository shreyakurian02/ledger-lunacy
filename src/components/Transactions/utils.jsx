import dayjs from "dayjs";

export const formatString = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

export const formatDate = (date) => dayjs(date).format("DD MMMM YYYY, H:mm:ss");

export const getTransferDescription = ({ amount, source, destination }) => {
  if (amount < 0) return `Transfer made for ${destination.description}`;
  return `Transfer made by ${source.description} `;
};

export const formatDescription = ({ amount, source, destination, type }) => {
  const description = {
    investment: `Investment made to ${destination.description}`,
    refund: `Refund made by ${source.description}`,
    withdrawal: `Withdrawl made to ${destination.description}`,
    transfer: getTransferDescription({ amount, source, destination }),
    deposit: `Deposit from ${
      source.description || `${source.type.toLowerCase()} account`
    } `,
  };

  return description[type.toLowerCase()];
};

export const formatAmount = (amount) => {
  const absoluteAmount = `$${Math.abs(amount)}`;
  return amount < 0 ? "-" + absoluteAmount : absoluteAmount;
};
