import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, InvoicesForm } from "../../components";
import { axiosInstance } from "../../services";
import { invoiceActions } from "../../store/invoices";

export const InvoiceAdd = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch;
  const { invoicesList } = useSelector((state) => state.invoices);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState();

  const handleFormSubmit = (values) => {
    const newInvoice = {
      userId: +user.id,
      paid: false,
      email: values.email,
      to: values.to,
      dueDate: values.dueDate,
      term: +values.term,
      createdDate: new Date().toDateString(),
      description: values.description,
      price: +values.price,
    };
    setLoading(true);
    axiosInstance
      .post("/invoices", newInvoice)
      .then((data) => {
        navigate("/");
        // dispatch(invoiceActions.setInvoices([...invoicesList, data.data]));
      })
      .catch((err) => {
        setFetchErr(err?.response?.statusText);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <InvoicesForm
        errMsg={fetchErr}
        loading={loading}
        func={handleFormSubmit}
        formFor="add"
      />
    </Container>
  );
};
