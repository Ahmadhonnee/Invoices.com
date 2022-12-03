import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { InvoicesForm, Loading } from "../../components";
import { axiosInstance } from "../../services";
import { invoiceActions } from "../../store/invoices";

export const InvoiceEdit = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const invoicesList = useSelector((state) => state.invoices.invoicesList);
  const [currentInvoice, setCurrentInvoice] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState();

  useEffect(() => {
    if (!currentInvoice) {
      setLoading(true);
      axiosInstance
        .get(`/invoices/${id}`)
        .then((data) => {
          setCurrentInvoice(data.data);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleFormSubmit = ({
    email,
    to,
    dueDate,
    term,
    description,
    price,
  }) => {
    const editedInvoice = {
      userId: +user.id,
      paid: currentInvoice?.paid,
      email,
      to,
      dueDate,
      term: +term,
      createdDate: new Date().toDateString(),
      description,
      price: +price,
    };

    axiosInstance
      .put(`/invoices/${id}`, editedInvoice)
      .then((data) => {
        if (invoicesList) {
          const index = invoicesList.findIndex((invoice) => invoice.id === +id);
          console.log(data);
          dispatch(
            invoiceActions.setInvoices([
              ...invoicesList.slice(0, index),
              data.data,
              ...invoicesList.slice(index + 1),
            ])
          );
        }
        navigate(`/invoice/${id}`);
      })
      .catch((err) => {
        setFetchErr(err?.response?.statusText);
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <InvoicesForm
          loading={loading}
          currentInvoice={currentInvoice}
          formFor="edit"
          func={handleFormSubmit}
          errMsg={fetchErr}
        />
      )}
    </>
  );
};
