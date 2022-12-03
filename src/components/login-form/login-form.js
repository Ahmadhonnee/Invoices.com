import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { axiosInstance } from "../../services";
import { userActions } from "../../store/user/user.slice";
import { Button } from "../button";
import { FormikInput } from "../formik-input";
import { SectionTitle } from "../section-title";
import "./login-form.scss";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState();

  const handleFormSubmit = (values) => {
    setLoading(true);
    fetch("http://167.235.158.238:3001/login", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        dispatch(userActions.setUser(data));
        axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        console.log(location.state?.redirect);

        navigate(location.state.redirect ? location.state?.redirect : "/");
      })
      .catch((err) => {
        setErrorMsg("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .required("can't be empty!")
          .email("please enter email!")
          .min(3, "minimum 3 characters")
          .max(25, "maximum 25 characters!"),
        password: yup
          .string()
          .required("can't be empty!")
          .min(3, "enter as minimum 3 characters!")
          .max(15, "maximum 15 character!"),
      })}
      validateOnBlur
      onSubmit={handleFormSubmit}
    >
      <Form className="login-form">
        <SectionTitle>Login</SectionTitle>
        <FormikInput name="email" label="Email" />
        <FormikInput name="password" label="Password" />
        <Button
          style={{ width: "fit-content" }}
          className="violet"
          type="submit"
        >
          Login
        </Button>
        <span className="login-form__error">{errorMsg}</span>
      </Form>
    </Formik>
  );
};
