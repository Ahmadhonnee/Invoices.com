import "./section.scss";

export const Section = ({ children, className = "" }) => {
  return <section className={"section" + " " + className}>{children}</section>;
};
