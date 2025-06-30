import React, { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../../api/auth/user-auth";

export default function ForgetPasswordResetCode() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [email, setEmail] = useState(localStorage.getItem("userMail") || "");
  const [newPassword, setNewPassword] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verifying, setVerifying] = useState(false);

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

    const listeners = [];

    const setupListeners = () => {
      inputs.forEach((input, index) => {
        if (!input) return;

        const handleKeyDown = (e) => {
          const allowed = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
          ];
          if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
            e.preventDefault();
            return;
          }
          if (
            (e.key === "Backspace" || e.key === "Delete") &&
            input.value === ""
          ) {
            if (index > 0) inputs[index - 1].focus();
          }
          if (e.key === "ArrowLeft" && index > 0) inputs[index - 1].focus();
          if (e.key === "ArrowRight" && index < inputs.length - 1)
            inputs[index + 1].focus();
        };

        const handleInput = (e) => {
          if (/^\d$/.test(e.target.value) && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        };

        const handleFocus = () => input.select();

        input.addEventListener("keydown", handleKeyDown);
        input.addEventListener("input", handleInput);
        input.addEventListener("focus", handleFocus);
        input.addEventListener("paste", handlePaste);

        listeners.push(() => {
          input.removeEventListener("keydown", handleKeyDown);
          input.removeEventListener("input", handleInput);
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("paste", handlePaste);
        });
      });
    };

    setupListeners();
    return () => listeners.forEach((remove) => remove());
  }, []);

  const handleResendClick = async (e) => {
    e.preventDefault();
    if (resendDisabled) return;

    setResendDisabled(true);
    setTimer(60);

    try {
      // Make actual API call here to resend reset code
      // await resendResetPasswordCode({ email });

      toast.success("Reset code resent!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend code");
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerifying(true);

    const code = inputRefs.current.map((input) => input.value).join("");

    if (!email || !code || code.length < 6 || !newPassword) {
      toast.error("Please fill out all fields.");
      setVerifying(false);
      return;
    }

    const payload = {
      email,
      resetCode: code,
      newPassword,
    };

    try {
      await changeUserPassword(payload);
      toast.success("Password changed successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reset password.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Change Password</h1>
              <p className="text-[15px] text-slate-500">
                Enter the code sent to your email and your new password.
              </p>
            </header>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="\d*"
                    ref={(el) => (inputRefs.current[i] = el)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold text-slate-900 bg-slate-100 border border-transparent rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                ))}
              </div>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mb-6 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                type="submit"
                disabled={verifying}
                className="w-full flex justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-600 transition disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>

            <div className="text-sm text-slate-500 mt-6 flex flex-col items-center">
              <button
                onClick={handleResendClick}
                disabled={resendDisabled}
                className={`font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-2 ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {resendDisabled && (
                  <FaSpinner className="animate-spin text-indigo-500" />
                )}
                {resendDisabled ? `Resend in ${timer}s` : "Resend Code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
