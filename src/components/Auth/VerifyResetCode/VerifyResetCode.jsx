import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { baseUrl } from "../../../utils/baseUrl";

export default function VerifyResetCode() {
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);

  let navigate = useNavigate();

  const verifyResetCodeSchema = Yup.object({
    resetCode: Yup.string().required("resetCode is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: verifyResetCodeSchema,
    onSubmit: (values) => {
      verifyResetCode(values);
    },
  });

  // the message belongs to the values that were sent, drop it once they change
  useEffect(() => {
    setErrorMsg(false);
  }, [formik.values]);

  async function verifyResetCode(values) {
    setIsloading(true);
    setErrorMsg(false);
    axios
      .post(`${baseUrl}/auth/verifyResetCode`, values)
      .then((data) => {
        setIsloading(false);
        if (data.data.status === "Success") {
          navigate("/auth/reset-password");
        }
      })
      .catch((error) => {
        setIsloading(false);
        setErrorMsg(
          error.response?.data?.message ?? "Something went wrong, try again"
        );
      });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Verify Reset Code</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Verify-Reset-Code" />
      </Helmet>
      <div className="container-fluid my-5  py-5">
        <div className="container py-5  bg-main-light rounded-2">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-6">
              <h3 className="mb-3 title-main">Verify Reset Code</h3>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="resetCode">Reset-Code:</label>
                  <input
                    id="resetCode"
                    name="resetCode"
                    type="text"
                    className="form-control"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.resetCode && formik.touched.resetCode ? (
                    <div className="alert alert-danger my-2">
                      {formik.errors.resetCode}
                    </div>
                  ) : null}
                </div>

                {errorMsg ? (
                  <div className="alert alert-danger text-center">
                    {errorMsg}
                  </div>
                ) : null}

                {isLodaing ? (
                  <button
                    type="submit"
                    className="btn bg-main text-white"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn bg-main text-white"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Verify Reset Code
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
