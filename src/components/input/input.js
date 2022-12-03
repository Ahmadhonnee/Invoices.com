import "./input.scss";

export const Input = ({
  type,
  className = "",
  label,
  message,
  name,
  select,
  error,
  ...props
}) => {
  if (select) {
    return (
      <label className={"input__label " + (error ? "input__label--error" : "")}>
        <div className="input__texts">
          <span>{label}</span>
          <span>{message}</span>
        </div>
        <select name={name} className={"input " + className} {...props}>
          <option className="input__item" value="1">
            Net 1 Day
          </option>
          <option className="input__item" value="7">
            Net 7 Days
          </option>
          <option className="input__item" value="14">
            Net 14 Days
          </option>
          <option className="input__item" value="30">
            Net 30 Days
          </option>
        </select>
      </label>
    );
  }

  return (
    <label className={"input__label " + (error ? "input__label--error" : "")}>
      <div className="input__texts">
        <span>{label}</span>
        <span>{message}</span>
      </div>
      <input
        className={"input " + className}
        type={!type ? "text" : type}
        name={name}
        {...props}
      />
    </label>
  );
};
