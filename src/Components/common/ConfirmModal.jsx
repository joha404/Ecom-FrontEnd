import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { BiSolidError } from "react-icons/bi";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = "Are You Sure?",
  description = "Are you sure you want to clear all cart items? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden w-full max-w-md dark:bg-gray-800"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white transition-all"
              aria-label="Close modal"
            >
              <FiX size={18} />
            </button>

            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-xl border border-red-500">
                  <BiSolidError className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-400 text-black dark:text-white dark:border-gray-600 flex items-center gap-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                >
                  {cancelText}
                </motion.button>

                <motion.button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 flex items-center justify-center ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  whileHover={!isLoading ? { y: -1 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  type="button"
                >
                  {isLoading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-2 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    confirmText
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
