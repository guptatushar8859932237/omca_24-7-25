import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AddMulCurrency } from "../../reducer/CurrencySlice";

export default function Addcurrency() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.Currency);

  const basicSchema = Yup.object().shape({
    name: Yup.string().required("Currency Name is required"),
    details: Yup.string().required("Currency Details is required"),
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="page-title">
          <i
            className="fi fi-sr-angle-double-small-left"
            style={{ cursor: "pointer" }}
            onClick={() => window.history.back()}
          ></i>
          New Currency
        </h4>

        <div className="main_content">
          <Formik
            initialValues={{ name: "", details: "" }}
            validationSchema={basicSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(AddMulCurrency(values)).unwrap();

                Swal.fire("Currency added successfully!", "", "success");

                navigate("/Admin/Currency");
              } catch (err) {
                Swal.fire("Error!", err?.message || "Something went wrong", "error");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row">

                  <div className="col-sm-6">
                    <label>Currency Name*</label>
                    <Field className="form-control" type="text" name="name" />
                    <ErrorMessage name="name" component="p" className="text-danger" />
                  </div>

                  <div className="col-sm-6">
                    <label>Details*</label>
                    <Field className="form-control" type="text" name="details" />
                    <ErrorMessage name="details" component="p" className="text-danger" />
                  </div>

                </div>

                <button className="submit-btn my-2" disabled={isSubmitting || loading}>
                  {loading ? "Submitting..." : "Add Currency"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </div>
  );
}
