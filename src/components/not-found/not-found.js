import { BoldText } from "../bold-text";
import { LightText } from "../light-text/light-text";
import "./not-found.scss";

export const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__center">
        <BoldText>There is nothing here</BoldText>
        <LightText>
          {" "}
          Create an invoice by clicking the New Invoice button and get started
        </LightText>
      </div>
    </section>
  );
};
