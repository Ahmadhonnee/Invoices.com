import "./invoice-price.scss";

export const InvoicePrice = ({ children }) => {
  return <span className="invoice-price">£ {children}</span>;
};
