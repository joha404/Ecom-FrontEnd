import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signInUser } from "../../api/auth/user-auth";
import toast from "react-hot-toast";

// Replace with your actual API base URL
const BASE_URL = "http://localhost:3000/api/v1";

export default function Register() {
  const navigate = useNavigate();

  const [errorvlu, setErrorvlu] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3).max(10),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    number: Yup.string().required("Phone number is required"),
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      number: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorvlu(null);
      setSuccessMsg(null);

      // Prepare the final payload
      const payload = {
        name: values.name,
        email: values.email,
        number: values.number,
        password: values.password,
      };
      await signInUser(payload);
      localStorage.setItem("userMail", payload.email);
      // console.log(res);
      toast.success("User Create Success");
      try {
        setSuccessMsg("Data logged to console successfully!");
        setTimeout(() => navigate("/otp-verification"), 1500);
      } catch (error) {
        setErrorvlu("Something went wrong!");
        toast.error("something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

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

        <h2 className="text-green-600 text-2xl mb-6">Register</h2>

        <form onSubmit={registerFormik.handleSubmit} className="space-y-4">
          {/* Name */}
          <InputField
            formik={registerFormik}
            name="name"
            label="User Name"
            type="text"
          />
          {ErrorText(registerFormik, "name")}

          {/* Email */}
          <InputField
            formik={registerFormik}
            name="email"
            label="User Email"
            type="email"
          />
          {ErrorText(registerFormik, "email")}

          {/* Password */}
          <InputField
            formik={registerFormik}
            name="password"
            label="User Password"
            type="password"
          />
          {ErrorText(registerFormik, "password")}

          {/* Confirm Password */}
          <InputField
            formik={registerFormik}
            name="rePassword"
            label="Confirm Password"
            type="password"
          />
          {ErrorText(registerFormik, "rePassword")}

          {/* Phone Number */}
          <InputField
            formik={registerFormik}
            name="number"
            label="Phone Number"
            type="text"
          />
          {ErrorText(registerFormik, "number")}

          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-green-700 disabled:bg-green-100 disabled:text-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin inline-block text-xl text-white" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-green-600 font-semibold text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline dark:text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// 🧩 InputField Component
function InputField({ formik, name, label, type }) {
  return (
    <div className="relative z-0 w-full group">
      <input
        {...formik.getFieldProps(name)}
        type={type}
        id={name}
        name={name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
      >
        {label}
      </label>
    </div>
  );
}

// 🧩 ErrorText Utility
function ErrorText(formik, field) {
  return (
    formik.errors[field] &&
    formik.touched[field] && (
      <div className="p-2 text-sm text-red-700 bg-red-100 rounded" role="alert">
        {formik.errors[field]}
      </div>
    )
  );
}
