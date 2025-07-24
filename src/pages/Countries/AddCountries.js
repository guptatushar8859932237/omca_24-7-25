import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AddCountry } from "../../reducer/Countries";
import { useNavigate } from "react-router-dom";
export default function AddCountries() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicSchema = Yup.object().shape({
    countryName: Yup.string().required("Country Name is Required"),

    countryCapital: Yup.string().required("Country Capital is Required"),
    phoneCode : Yup.string().required("Phone Code is Required"),
    countryCode: Yup.string()
      // .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Country Code is  Required"),
    countryCurrency: Yup.string().required("Country Currency is Required"),
  });


  // const getallCountry = ()=>{
  //   try {
  //     const response = axios.get(`http://192.168.1.51:5201/api/getCountries`,{
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
                  <i class="fi fi-sr-angle-double-small-left"></i>
                </span>
                New Countries
              </h4>
            </div>
          </div>
          <div className="main_content">
            <Formik
              initialValues={{
                countryName: "",
                countryCapital: "",
                countryCode: "",
                countryCurrency: "",
                phoneCode :""
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const result = await dispatch(AddCountry(values)).unwrap();
                  Swal.fire("Country Data added successfully!", "", "success");
                  navigate("/Admin/countries");
                } catch (err) {
                  console.log(err);
                  Swal.fire(
                    "Error!",
                    err?.message || "An error occurred",
                    "error"
                  );
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Country Name<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="countryName"
                        />
                        <ErrorMessage
                          name="countryName"
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Code<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="countryCode"
                        />
                        <ErrorMessage
                          name="countryCode"
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Capital <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="countryCapital"
                        />
                        <ErrorMessage
                          name="countryCapital"
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Currency <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="countryCurrency"
                        />
                        <ErrorMessage
                          name="countryCurrency"
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Country Code <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="phoneCode"
                        />
                        <ErrorMessage
                          name="phoneCode"
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
