import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Invoice,
  InvoicesBar,
  Section,
  Sidebar,
  Loading,
  NotFound,
} from "../../components/";
import { axiosInstance } from "../../services";
import { invoiceActions } from "../../store/invoices";
import "./invoices.scss";

export const Invoices = () => {
  const invoicesList = useSelector((state) => state.invoices.invoicesList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/invoices")
      .then((data) => {
        dispatch(invoiceActions.setInvoices(data.data));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Section className="invoices">
        <InvoicesBar />
        {loading ? (
          <Loading />
        ) : invoicesList ? (
          <ul className="invoices__list">
            {invoicesList?.map((invoice) => {
              return (
                <Link
                  key={invoice?.id}
                  style={{ color: "transparent", textDecoration: "none" }}
                  to={`/invoice/${invoice?.id}`}
                >
                  <Invoice invoice={invoice} />
                </Link>
              );
            })}
          </ul>
        ) : (
          <NotFound />
        )}
      </Section>
      <Sidebar />
    </Container>
  );
};
