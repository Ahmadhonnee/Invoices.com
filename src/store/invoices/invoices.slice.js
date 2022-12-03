import { createSlice } from "@reduxjs/toolkit";

export const { actions: invoiceActions, reducer: invoiceReducer } = createSlice(
  {
    name: "invoices",
    initialState: {
      invoicesList: null,
    },
    reducers: {
      setInvoices: (state, { payload }) => {
        state.invoicesList = payload;
      },
    },
  }
);
