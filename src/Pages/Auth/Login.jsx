import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../api/auth/user-auth";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [errorvlu, setErrorvlu] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorvlu(null);
      setSuccessMsg(null);

      try {
        const response = await loginUser(values);
        console.log(response.data.user);
        setSuccessMsg(response.data.message);
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));

        toast.success("Login Successfully");

        setTimeout(() => {
          navigate("/");
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        setErrorvlu(error.response?.data?.message || "An error occurred");
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center dark:bg-[#111827] bg-gray-100 p-4">
      <div className="bg-white dark:bg-[#374151] shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Error Message */}
        {errorvlu && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            {errorvlu}
          </div>
        )}

        {/* Success Message */}
        {successMsg && (
          <div className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
            {successMsg}
          </div>
        )}

        <h2 className="text-green-600 text-2xl mb-6">Login</h2>

        <form onSubmit={loginFormik.handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...loginFormik.getFieldProps("email")}
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              User Email:
            </label>
          </div>
          {loginFormik.errors.email && loginFormik.touched.email && (
            <div className="p-2 text-sm text-red-700 bg-red-100 rounded">
              {loginFormik.errors.email}
            </div>
          )}

          {/* Password Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...loginFormik.getFieldProps("password")}
              type="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              User Password:
            </label>
          </div>
          {loginFormik.errors.password && loginFormik.touched.password && (
            <div className="p-2 text-sm text-red-700 bg-red-100 rounded">
              {loginFormik.errors.password}
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 disabled:bg-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 h-10 flex justify-center items-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin inline-block text-white text-xl mr-2" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Links */}
        <p className="text-green-600 font-semibold text-center mt-4">
          <Link to="/email-verification" className="hover:underline">
            Forget Password?
          </Link>
        </p>
        <p className="text-green-600 font-semibold text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline dark:text-white">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
