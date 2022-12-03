import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Section,
  LightText,
  StatusBtn,
  Button,
  BoldText,
  InvoicePrice,
  InvoiceId,
  Sidebar,
  Loading,
} from "../../components";
import { getDate } from "../../hooks/getDate";
import { axiosInstance } from "../../services";
import { invoiceActions } from "../../store/invoices";
import "./viewing-invoice.scss";

export const ViewingInvoice = () => {
  const { id } = useParams();
  const [currentInvoice, setCurrentInvoice] = useState();
  const dispatch = useDispatch();
  const invoicesList = useSelector((state) => state.invoices.invoicesList);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [fetchErr, setFetchErr] = useState();
  const [fetchErrPaid, setFetchErrPaid] = useState();

  useEffect(() => {
    axiosInstance.get(`/invoices/${id}`).then((data) => {
      setCurrentInvoice(data.data);
    });
  }, []);

  if (!currentInvoice) {
    return <Loading />;
  }
  const {
    id: invoiceId,
    userId: invoiceUserId,
    paid: invoicePaid,
    to: invoiceTo,
    email: invoiceEmail,
    dueDate: invoiceDueDate,
    createdDate: invoiceCreatedDate,
    description: invoiceDescription,
    price: invoicePrice,
  } = currentInvoice;

  const handleBtnClick = (evt) => {
    axiosInstance
      .patch(`/invoices/${id}`, { paid: true })
      .then((data) => {
        setCurrentInvoice(data.data);
        if (invoicesList) {
          const index = invoicesList?.findIndex(
            (invoice) => invoice.id === +id
          );
          dispatch(
            invoiceActions.setInvoices([
              ...invoicesList.slice(0, index),
              data,
              ...invoicesList.slice(index + 1),
            ])
          );
        }
      })
      .catch((err) => {
        setFetchErrPaid(err?.response.statusText);
      })
      .finally(() => {
        console.log("Done");
      });
  };

  const handleDeleteBtnClick = (evt) => {
    const index = invoicesList?.findIndex((invoice) => invoice.id === +id);
    axiosInstance
      .delete(`/invoices/${id}`)
      .then(() => {
        dispatch(
          invoiceActions.setInvoices([
            ...invoicesList.slice(0, index),
            ...invoicesList.slice(index + 1),
          ])
        );
        navigate("/");
      })
      .catch((err) => {
        setFetchErr(err?.response.statusText);
      });
  };

  return (
    <Container>
      <Section className="viewing-invoice">
        <div className="viewing-invoice__goback">
          <Button to={"/"} className={"goback-btn"}>
            Go back
          </Button>
        </div>
        <div className="viewing-invoice__manage">
          <div className="viewing-invoice__manage__status">
            <LightText>Status</LightText>
            <StatusBtn status={invoicePaid} />
          </div>
          <div className="viewing-invoice__manage__btns">
            <Button
              state={{
                redirect: !user && `/invoice/${id}/edit`,
              }}
              to={user ? `/invoice/${id}/edit` : "/login"}
              className="light"
            >
              Edit
            </Button>
            {user ? (
              <Button
                errMsg={fetchErr}
                onClick={handleDeleteBtnClick}
                className="red"
              >
                Delete
              </Button>
            ) : (
              <Button
                state={{
                  redirect: !user && `/invoice/${id}`,
                }}
                to={"/login"}
                className="red"
              >
                Delete
              </Button>
            )}
            {!user && !invoicePaid ? (
              <Button
                state={{
                  redirect: !user && `/invoice/${id}`,
                }}
                to={"/login"}
                errMsg={fetchErrPaid}
                onClick={handleBtnClick}
                className="violet"
              >
                Mark as Paid
              </Button>
            ) : !invoicePaid ? (
              <Button
                errMsg={fetchErrPaid}
                onClick={handleBtnClick}
                className="violet"
              >
                Mark as Paid
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="viewing-invoice__info">
          <div className="viewing-invoice__info__client">
            <InvoiceId>{invoiceUserId}</InvoiceId>
            <LightText>UserName</LightText>
          </div>
          <div className="viewing-invoice__info__details">
            <div className="viewing-invoice__info__detail">
              <LightText>Invoice Date</LightText>
              <BoldText>{getDate(invoiceCreatedDate)}</BoldText>
            </div>
            <div className="viewing-invoice__info__detail">
              <LightText>Bill To</LightText>
              <BoldText>{invoiceTo}</BoldText>
            </div>
            <div className="viewing-invoice__info__detail">
              <LightText>Sent to</LightText>
              <BoldText>{invoiceEmail}</BoldText>
            </div>
            <div className="viewing-invoice__info__detail">
              <LightText>Payment Due</LightText>
              <BoldText>{getDate(invoiceDueDate)}</BoldText>
            </div>
          </div>
          <div className="viewing-invoice__info__price">
            <LightText>Amount Due</LightText>
            <InvoicePrice>{invoicePrice}</InvoicePrice>
          </div>
        </div>
      </Section>
      <Sidebar />
    </Container>
  );
};
