import { Link } from "react-router-dom";
import "./button.scss";

export const Button = ({
  children,
  className = "",
  type,
  btnFor,
  to,
  loading,
  errMsg,
  state,
  ...props
}) => {
  if (btnFor === "adding") {
    if (to) {
      return (
        <Link
          state={state}
          style={{ textDecoration: "none" }}
          to={to}
          type={type}
          className={"button " + (loading ? " loading" : "") + className}
          {...props}
        >
          <div className="button__add-icon">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.31311 10.0229V6.31311H10.0229V3.73278H6.31311V0.0229492H3.73278V3.73278H0.0229492V6.31311H3.73278V10.0229H6.31311Z"
                fill="#7C5DFA"
              />
            </svg>
          </div>
          {errMsg ? <div className="button__errorMessage">{errMsg}</div> : ""}
          {children}
        </Link>
      );
    }
    return (
      <button
        type={type}
        className={"button " + className}
        disabled={loading}
        {...props}
      >
        <div className="button__add-icon">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.31311 10.0229V6.31311H10.0229V3.73278H6.31311V0.0229492H3.73278V3.73278H0.0229492V6.31311H3.73278V10.0229H6.31311Z"
              fill="#7C5DFA"
            />
          </svg>
        </div>
        {errMsg ? <div className="button__errorMessage">{errMsg}</div> : ""}
        {children}
      </button>
    );
  }
  if (to) {
    return (
      <Link
        state={state}
        style={{ textDecoration: "none" }}
        to={to}
        className={"button " + (loading ? " loading" : "") + className}
      >
        {errMsg ? <div className="button__errorMessage">{errMsg}</div> : ""}
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={"button " + className}
      disabled={loading}
      {...props}
    >
      {errMsg ? <div className="button__errorMessage">{errMsg}</div> : ""}
      {children}
    </button>
  );
};
