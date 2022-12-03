import "./invoice-id.scss";

export const InvoiceId = ({ children, bigFontSize }) => {
  const first = String(children)?.slice(0, 1);
  const rest = String(children)?.slice(1);
  return (
    <span
      className="invoice-id"
      style={bigFontSize ? { fontSize: "inherit" } : {}}
    >
      <span className="invoice-id--first">{first}</span>
      {rest}
    </span>
  );
};
