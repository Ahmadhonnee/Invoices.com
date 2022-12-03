import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Button } from "../button";
import { Container } from "../container";
import { FormikInput } from "../formik-input";
import { InvoiceId } from "../invoice-id";
import { SectionTitle } from "../section-title";
import "./invoices-form.scss";

export const InvoicesForm = ({
  className = "",
  formFor,
  func,
  currentInvoice,
  loading,
  errMsg,
}) => {
  const { id } = useParams();

  if (formFor === "edit" && !currentInvoice) {
    return null;
  }
  if (formFor === "edit") {
    var {
      userId: invoiceUserId,
      paid: invoicePaid,
      email: invoiceEmail,
      to: invoiceTo,
      dueDate: invoiceDueDate,
      term: invoiceTerm,
      createdDate: invoiceCreatedDate,
      description: invoiceDescription,
      price: invoicePrice,
      id: invoiceId,
    } = currentInvoice;
  }

  return (
    <Container>
      <div className="invoices-form__container">
        <div className="invoices-form__goback">
          <Button
            to={formFor === "edit" ? `/invoice/${id}` : "/"}
            className=" goback-btn"
          >
            Go back
          </Button>
        </div>
        <Formik
          initialValues={{
            to: invoiceTo || "",
            email: invoiceEmail || "",
            dueDate: invoiceDueDate || "",
            term: invoiceTerm || "1",
            description: invoiceDescription || "",
            price: invoicePrice || "",
          }}
          validationSchema={yup.object().shape({
            to: yup
              .string()
              .required("can't be empty!")
              .min(3, "minimum 3 characters!")
              .max(20, "maximum 20 characters!"),
            email: yup
              .string()
              .required("can't be empty!")
              .email("please enter email!"),
            dueDate: yup.date("enter date").required("can't be empty!"),
            term: yup
              .string()
              .required("can't be empty!")
              .oneOf(["1", "7", "14", "30"]),
            price: yup
              .number("enter number!")
              .required("can't be empty!")
              .min(100, "minimum 100")
              .max(1000, "maximum 1000"),
          })}
          onSubmit={(val) => func(val)}
        >
          <Form className={"invoices-form " + className}>
            {formFor === "edit" ? (
              <SectionTitle>
                Edit <InvoiceId bigFontSize={true}>{invoiceUserId}</InvoiceId>
              </SectionTitle>
            ) : (
              <SectionTitle>New Invoice</SectionTitle>
            )}
            <FormikInput name="to" label={"Client’s Name"} />
            <FormikInput name="email" label={"Client’s Email"} />
            <div className="invoices-form__duo">
              <FormikInput
                className=" select"
                name="dueDate"
                type="date"
                label={"Due Date"}
              />
              <FormikInput
                className=" select"
                name="term"
                label={"Payment Terms"}
                select={true}
              />
            </div>
            <FormikInput name="description" label="Project Description" />
            <FormikInput name="price" label="Price" />
            <div className="invoices-form__btns">
              {formFor === "edit" ? (
                <>
                  <Button to={`/invoice/${id}`} className="light">
                    Cancel
                  </Button>
                  <Button
                    errMsg={errMsg}
                    loading={loading}
                    type="submit"
                    className="violet"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button to="/" className="light">
                    Discard
                  </Button>
                  <Button
                    errMsg={errMsg}
                    loading={loading}
                    type="submit"
                    className="violet"
                  >
                    Save & Send
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};
