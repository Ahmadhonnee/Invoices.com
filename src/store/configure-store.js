import { configureStore } from "@reduxjs/toolkit";
import { invoiceReducer } from "./invoices";
import { userReducer } from "./user";

export const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    user: userReducer,
  },
});
