import { motion } from "framer-motion";
import PropTypes from "prop-types";

const PrimaryButton = ({
  isSubmitting = false,
  type = "submit",
  onClick,
  children = "Sign in",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        type={type}
        disabled={isSubmitting}
        onClick={onClick}
        className={`w-full min-w-[100px]  h-auto py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary 
          text-white font-medium shadow-lg hover:shadow-black/30 flex items-center justify-center ${
            isSubmitting ? "opacity-80 cursor-not-allowed" : ""
          }${className}`}
      >
        {isSubmitting ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          children
        )}
      </button>
    </motion.div>
  );
};

PrimaryButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isSubmitting: PropTypes.bool,
  children: PropTypes.node,
};

export default PrimaryButton;
