import "./App.css";
import React from "react";
import Form from "./components/Form";
import { ToastProvider } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <Form />
      </div>
    </ToastProvider>
  );
}

export default App;
