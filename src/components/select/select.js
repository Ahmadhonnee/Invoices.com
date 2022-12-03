import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../services";
import { invoiceActions } from "../../store/invoices";
import "./select.scss";

export const Select = ({ children }) => {
  const dispatch = useDispatch();

  const handleFilterClick = (evt) => {
    const target = evt.target;
    if (target.matches(".select__box__item")) {
      target.disabled = true;
      console.log(target);
      const filterBy = target.dataset.filterBy;
      target.className += " loading";
      if (filterBy === "") {
        axiosInstance
          .get("/invoices")
          .then((data) => {
            dispatch(invoiceActions.setInvoices(data.data));
          })
          .catch(() => {})
          .finally(() => {
            target.className = "select__box__item";
            target.disabled = false;
          });
      }

      axiosInstance
        .get(
          "/invoices?" +
            new URLSearchParams({
              paid_like: filterBy,
            })
        )
        .then((data) => {
          dispatch(invoiceActions.setInvoices(data.data));
        })
        .catch(() => {
          console.log("Error in Filtering");
        })
        .finally(() => {
          target.className = "select__box__item";
          target.disabled = false;
        });
    }
  };

  return (
    <div className="select">
      <div className="select__sortby">{children}</div>

      <div className="select__box">
        <ul className="select__box__items" onClick={handleFilterClick}>
          <li className="select__box__item" data-filter-by="">
            All
          </li>
          <li className="select__box__item" data-filter-by="false">
            Pending
          </li>
          <li className="select__box__item" data-filter-by="true">
            Paid
          </li>
        </ul>
      </div>
    </div>
  );
};
