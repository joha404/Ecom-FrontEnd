import React, { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { verifyUserMail } from "../../api/auth/user-auth";

export default function OTPVerification() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verifying, setVerifying] = useState(false);

  const email = localStorage.getItem("userMail");

  useEffect(() => {
    const inputs = inputRefs.current;

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      if (!/^\d{6}$/.test(text)) return;

      text.split("").forEach((digit, i) => {
        inputs[i].value = digit;
      });
      inputs[5].focus();
    };

    const handleKeyDowns = [];
    const handleInputs = [];
    const handleFocuses = [];

    const createKeyDownHandler = (index) => (e) => {
      const key = e.key;
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];

      if (!/^\d$/.test(key) && !allowedKeys.includes(key)) {
        e.preventDefault();
        return;
      }

      if (
        (key === "Backspace" || key === "Delete") &&
        inputs[index].value === ""
      ) {
        if (index > 0) inputs[index - 1].focus();
      }

      if (key === "ArrowLeft" && index > 0) inputs[index - 1].focus();
      if (key === "ArrowRight" && index < inputs.length - 1)
        inputs[index + 1].focus();
    };

    const createInputHandler = (index) => (e) => {
      if (/^\d$/.test(e.target.value) && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    };

    const createFocusHandler = (input) => () => {
      input.select();
    };

    inputs.forEach((input, index) => {
      if (!input) return;
      input.addEventListener("paste", handlePaste);

      const kdHandler = createKeyDownHandler(index);
      input.addEventListener("keydown", kdHandler);
      handleKeyDowns.push({ input, handler: kdHandler });

      const inHandler = createInputHandler(index);
      input.addEventListener("input", inHandler);
      handleInputs.push({ input, handler: inHandler });

      const fHandler = createFocusHandler(input);
      input.addEventListener("focus", fHandler);
      handleFocuses.push({ input, handler: fHandler });
    });

    return () => {
      inputs.forEach((input) => {
        if (!input) return;
        input.removeEventListener("paste", handlePaste);
      });
      handleKeyDowns.forEach(({ input, handler }) =>
        input.removeEventListener("keydown", handler)
      );
      handleInputs.forEach(({ input, handler }) =>
        input.removeEventListener("input", handler)
      );
      handleFocuses.forEach(({ input, handler }) =>
        input.removeEventListener("focus", handler)
      );
    };
  }, []);

  const handleResendClick = (e) => {
    e.preventDefault();
    if (resendDisabled) return;

    setResendDisabled(true);
    setTimer(60);

    // Simulate resend code
    toast.success("Verification code resent!");

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    setVerifying(true);

    const code = inputRefs.current.map((input) => input.value).join("");

    const payload = {
      email: email || "",
      verificationCode: code,
    };

    const data = await verifyUserMail(payload);
    console.log(data);
    setVerifying(false);
    toast.success("Verification Successful!");
    navigate("/");
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Verification Code</h1>
              <p className="text-[15px] text-slate-500">
                Enter the 6-digit code sent to your email.
              </p>
            </header>

            <form id="otp-form" onSubmit={verifyCode}>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="\d*"
                    ref={(el) => (inputRefs.current[i] = el)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-2 sm:p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                ))}
              </div>

              <div className="max-w-[260px] mx-auto mt-6">
                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifying ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Verifying...
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </button>
              </div>
            </form>

            <div className="text-sm text-slate-500 mt-6 flex flex-col items-center">
              <p
                onClick={() => navigate("/email-verification")}
                className="cursor-pointer underline mb-1"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") navigate("/email-verification");
                }}
                aria-label="Navigate to email verification"
              >
                Didn't receive code?
              </p>

              <button
                onClick={handleResendClick}
                disabled={resendDisabled}
                className={`font-medium text-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2 ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-disabled={resendDisabled}
              >
                {resendDisabled && (
                  <FaSpinner className="animate-spin text-indigo-500" />
                )}
                {resendDisabled ? `Resend in ${timer}s` : "Resend"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
