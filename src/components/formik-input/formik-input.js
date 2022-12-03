import { useField } from "formik";
import { useEffect, useState } from "react";
import { Input } from "../input";

export const FormikInput = (props) => {
  const [field, meta] = useField(props);
  const [msg, setMsg] = useState();
  useEffect(() => {
    meta && setMsg(meta?.error);
  }, [meta]);
  return <Input {...field} {...props} message={msg} error={meta?.error} />;
};
