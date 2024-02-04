import React, { createContext, useState } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [isVisible, setVisible] = useState();

  const toast = (message, type = "info") => {
    setType(type);
    setMessage(message);
    setVisible(true);

    setTimeout(() => setVisible(false), 5000);
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        data-testid="toast"
        className={`fixed bottom-0 right-0 left-0 z-50 transition-opacity ease-linear duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${type === "error" ? "bg-red-600" : "bg-blue-600"} text-white p-2`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}
