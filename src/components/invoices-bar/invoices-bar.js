import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../button/button";
import { LightText } from "../light-text/light-text";
import { SectionTitle } from "../section-title";
import { Select } from "../select";
import "./invoices-bar.scss";

export const InvoicesBar = () => {
  const { user } = useSelector((state) => state.user);
  const invoicesList = useSelector((state) => state.invoices.invoicesList);

  return (
    <div className="invoices-bar">
      <div className="invoices-bar__left">
        <SectionTitle>Invoices</SectionTitle>
        <LightText>
          There are {invoicesList?.length || 0} total invoices
        </LightText>
      </div>
      <div className="invoices-bar__right">
        <Select changeValues={false}>
          Filter by status
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5.2279 5.2279L9.4558 1"
              stroke="#7C5DFA"
              strokeWidth="2"
            />
          </svg>
        </Select>
        <Button
          state={{
            redirect: "/add",
          }}
          to={user ? "/add" : "/login"}
          className="violet"
          btnFor={"adding"}
        >
          New Invoice
        </Button>
      </div>
    </div>
  );
};
