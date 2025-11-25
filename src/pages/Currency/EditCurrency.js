import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
export default function EditCurrency() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currencyList } = useSelector((state) => state.Currency);
  const [data, setData] = useState({});
  const schema = Yup.object().shape({
    currencyName: Yup.string().required("Currency Name is required"),
    details: Yup.string().required("Details are required"),
  });
  useEffect(() => {
    const currencyId = location.state?.serviceId;
    if (currencyId && currencyList.length > 0) {
      const selected = currencyList.find((item) => item._id === currencyId);
      setData(selected || {});
    }
  }, [currencyList, location.state]);
  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="page-title">
          <i
            className="fi fi-sr-angle-double-small-left"
            style={{ cursor: "pointer" }}
            onClick={() => window.history.back()}
          ></i>{" "}
          Edit Currency
        </h4>
        <div className="main_content">
          <Formik
            enableReinitialize
            initialValues={{
              currencyName: data?.name || "",
              details: data?.details || "",
            }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const payload = {
                  name: values.currencyName,
                  details: values.details,
                };
                await axios.put(`${baseurl}updateCurrencyById/${location.state.serviceId}`, payload, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                });
                Swal.fire("Updated Successfully!", "", "success");
                navigate("/Admin/Currency");
              } catch (err) {
                Swal.fire("Error!", err?.response?.data?.message || "Something went wrong", "error");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row">
                  <div className="col-sm-6">
                    <label>Currency Name*</label>
                    <Field className="form-control" type="text" name="currencyName" />
                    <ErrorMessage name="currencyName" component="p" className="text-danger" />
                  </div>
                  <div className="col-sm-6">
                    <label>Details*</label>
                    <Field className="form-control" type="text" name="details" />
                    <ErrorMessage name="details" component="p" className="text-danger" />
                  </div>
                </div>
                <button className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Currency"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}