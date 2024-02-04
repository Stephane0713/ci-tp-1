import React, { useState } from "react";
import { isValidName } from "../helpers/validation";

function useField(validationFn, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, hasError] = useState(false);

  const validate = () => {
    hasError(!validationFn(value));
  };

  return { value, setValue, error, validate };
}

export default function Form() {
  const lastNameRegister = useField(isValidName);

  return (
    <div
      style={{
        background: "#EEE",
        padding: "1rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        Créer un compte
      </h2>
      <form
        action="."
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          {...lastNameRegister}
          label="Nom"
          message={lastNameRegister.error ? "Nom invalide" : ""}
        />
      </form>
    </div>
  );
}

function TextField({
  label,
  value,
  setValue,
  validate,
  message = null,
  ...props
}) {
  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label
        style={{
          marginBottom: "1rem",
          display: "inline-block",
          fontWeight: "700",
        }}
        htmlFor="label"
      >
        {label}
      </label>
      <input
        id={label}
        {...props}
        type="text"
        style={{
          padding: ".75rem 1rem",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={validate}
      />
      <p style={{ color: "red", fontSize: "0.75rem" }}>{message}</p>
    </div>
  );
}
