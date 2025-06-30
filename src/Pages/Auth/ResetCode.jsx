import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { resendCode } from "../../api/auth/user-auth";
import toast from "react-hot-toast";

export default function ResetCode() {
  const navigate = useNavigate();

  const [errorvlu, setErrorvlu] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorvlu(null);
      setSuccessMsg(null);
      // console.log(values);

      try {
        const res = await resendCode(values);
        console.log(res);
        setIsLoading(false);
        toast.success("Code sent successfully!");
        navigate("/forget");
      } catch (error) {
        // Handle API or unexpected errors here
        setErrorvlu(error.message || "Something went wrong");
        toast.error("Something Went Wrong");
        setTimeout(() => setErrorvlu(null), 3000);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Clear messages on input change
  const handleInputChange = (e) => {
    formik.handleChange(e);
    if (errorvlu) setErrorvlu(null);
    if (successMsg) setSuccessMsg(null);
  };

  return (
    <div className="h-screen flex items-center justify-center dark:bg-[#111827] bg-gray-100 p-4">
      <div className="bg-white dark:bg-[#374151] shadow-lg rounded-lg p-8 max-w-md w-full">
        {errorvlu && (
          <div
            className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorvlu}
          </div>
        )}
        {successMsg && (
          <div
            className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {successMsg}
          </div>
        )}

        <h2 className="text-green-600 text-2xl mb-6">Enter Your Email</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
            <input
              {...formik.getFieldProps("email")}
              onChange={handleInputChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              autoComplete="email"
              autoFocus
              aria-invalid={
                formik.touched.email && formik.errors.email ? "true" : "false"
              }
              aria-describedby="email-error"
            />
          </div>

          {formik.touched.email && formik.errors.email && (
            <div
              id="email-error"
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}

          <button
            disabled={isLoading}
            type="submit"
            aria-busy={isLoading}
            aria-disabled={isLoading}
            className="text-white bg-green-700 disabled:bg-green-100 disabled:text-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center items-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin inline-block dark:text-white text-lg" />
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
