import "./status-btn.scss";

export const StatusBtn = ({ status }) => {
  return (
    <button
      className={"status-btn" + (status === true ? "--paid" : "--pending")}
    >
      <div className="status-btn__circle"></div>
      <span className="status-btn__text">
        {status === true ? "Paid" : "Pending"}
      </span>
    </button>
  );
};
