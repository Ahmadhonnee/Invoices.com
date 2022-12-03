import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { NotFound } from "../components";
import { Invoices, Login, ViewingInvoice } from "../pages";
import { InvoiceAdd } from "../pages/invoice-add";
import { InvoiceEdit } from "../pages/invoice-edit";

const elements = [
  {
    path: "/",
    element: <Invoices />,
  },
  {
    path: "/invoice/:id",
    element: <ViewingInvoice />,
  },
  {
    path: "/add",
    element: <InvoiceAdd />,
  },
  {
    path: "/invoice/:id/edit",
    element: <InvoiceEdit />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const ConfiguredRoutes = () => {
  const { user } = useSelector((state) => state.user);

  return useRoutes([
    ...(user ? [] : [{ path: "/login", element: <Login /> }]),
    ...elements,
  ]);
};
