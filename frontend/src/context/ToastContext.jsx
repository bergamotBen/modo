import { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "dark",
  });

  const showToast = (message, variant = "dark") => {
    console.log("TRIGGERED TOAST:", message, variant);
    setToast({ show: true, message, variant });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer
        position="top-end"
        className="p-3 position-fixed top-0 end-0"
        style={{ zIndex: 9999 }}
      >
        <Toast
          show={toast.show}
          onClose={hideToast}
          delay={3000}
          autohide
          className="bg-white border border-secondary-subtle text-secondary shadow-sm"
        >
          <Toast.Body className="fw-medium">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
