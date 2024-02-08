import React, { useContext, useState } from "react";
import {
  isMajor,
  isValidDate,
  isValidEmail,
  isValidName,
  isValidZipCode,
} from "../helpers/validation";
import { toSnakeCase } from "../helpers/toSnakeCase";
import { ToastContext } from "./Toast";
import { calculateAge } from "../helpers/calculateAge";

function useField(validationFn, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [hasError, setError] = useState(false);

  const validate = () => {
    setError(!validationFn(value));
  };

  return { value, setValue, hasError, validate };
}

/**
 * Form Component - A simple form component using the TextField and useField hook.
 *
 * @component
 * @returns {JSX.Element} - The rendered Form component.
 */
export default function Form() {
  const fields = [
    { label: "Nom", field: useField(isValidName) },
    { label: "Prénom", field: useField(isValidName) },
    { label: "Email", field: useField(isValidEmail) },
    {
      label: "Date de naissance",
      field: useField(
        (v) => isValidDate(v) && isMajor(calculateAge({ birth: new Date(v) }))
      ),
    },
    { label: "Ville", field: useField(isValidName) },
    { label: "Code postal", field: useField(isValidZipCode) },
  ];

  const canSubmit = () => {
    return (
      !fields.filter(({ field }) => {
        return field.value === "";
      }).length > 0
    );
  };

  const hasErrors = () => {
    return (
      fields.filter(({ field }) => {
        return field.hasError;
      }).length > 0
    );
  };

  const toast = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasErrors()) {
      localStorage.setItem(
        "user",
        JSON.stringify(
          fields.reduce((acc, val, idx) => {
            const key = toSnakeCase(val.label);
            const fieldValue = val.field.value;
            return { ...acc, [key]: fieldValue };
          }, {})
        )
      );
      toast("Le compte a bien été enregistré");
      return;
    }
    toast("Une erreur s'est produite", "error");
  };

  return (
    <div className="max-w-5xl p-2 w-full">
      <h2 className="mb-8 text-2xl text-gray-900 text-center">
        Créer un compte
      </h2>
      <form
        action="."
        method="POST"
        onSubmit={handleSubmit}
        className="border-b border-gray-900/10 p-12 pb-24 shadow-sm rounded-sm  gap-4 flex flex-col"
      >
        {fields.map(({ label, field }) => (
          <TextField
            key={label}
            label={label}
            value={field.value}
            {...{
              message: field.hasError ? "Champ invalide" : "",
            }}
            onChange={(e) => {
              field.setValue(e.target.value);
            }}
            onBlur={() => field.validate()}
          />
        ))}

        <button
          disabled={!canSubmit()}
          type="submit"
          className=" disabled:bg-gray-400 enabled:bg-blue-600 enabled:hover:bg-blue-500 mt-6  text-white ease-in duration-100 text-sm font-semibold px-4 py-2 rounded-sm"
        >
          Confirmer
        </button>
      </form>
    </div>
  );
}

const TextField = ({ label, message = "", ...inputProps }) => {
  const formattedLabel = toSnakeCase(label);

  return (
    <div>
      <label
        htmlFor={formattedLabel}
        className="block font-semibold leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>
      <input
        {...inputProps}
        data-testid={formattedLabel}
        type="text"
        id={formattedLabel}
        className="block w-full rounded-sm border-0 py-1.5 px-4 text-sm ring-1 ring-inset ring-gray-400"
      />
      {message !== "" && <div className="text-xs text-red-600">{message}</div>}
    </div>
  );
};
