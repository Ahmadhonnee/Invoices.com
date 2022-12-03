import { useState } from "react";
import { getDate } from "../../hooks/getDate";
import { InvoiceId } from "../invoice-id";
import { InvoicePrice } from "../invoice-price";
import { LightText } from "../light-text/light-text";
import { StatusBtn } from "../status-btn";
import "./invoice.scss";

export const Invoice = ({ invoice }) => {
  if (!invoice) {
    return null;
  }
  const {
    id,
    paid,
    price,
    createdDate,
    description,
    dueDate,
    email,
    to,
    userId,
  } = invoice;
  return (
    <li className="invoice">
      <InvoiceId>{userId}</InvoiceId>
      <LightText>Due {getDate(dueDate)}</LightText>
      <LightText>{to}</LightText>
      <InvoicePrice>{price}</InvoicePrice>
      <StatusBtn status={paid}></StatusBtn>
      <div>
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L1 9" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
      </div>
    </li>
  );
};
