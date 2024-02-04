import React, { createRef, useContext, useRef, useState } from "react";
import {
  isValidDate,
  isValidEmail,
  isValidName,
  isValidZipCode,
} from "../helpers/validation";
import { toSnakeCase } from "../helpers/toSnakeCase";
import { ToastContext } from "./Toast";

/**
 * Form Component - A simple form component using the TextField and useField hook.
 *
 * @component
 * @returns {JSX.Element} - The rendered Form component.
 */
export default function Form() {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const birthRef = useRef();
  const cityRef = useRef();
  const zipRef = useRef();

  const toast = useContext(ToastContext);

  // const [toast, setToast] = useState({
  //   type: null,
  //   message: null,
  //   isVisible: false,
  // });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      // !isValidZipCode(zipRef.current.value) ||
      // !isValidName(cityRef.current.value) ||
      // !isValidDate(birthRef.current.value) ||
      // !isValidEmail(emailRef.current.value) ||
      !isValidName(firstNameRef.current.value) ||
      !isValidName(lastNameRef.current.value)
    ) {
      toast("Une erreur s'est produite", "error");
      return;
    }
    toast("Le compte a bien été enregistré");
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
        className="border-b border-gray-900/10 p-12 pb-24 shadow-sm rounded-sm space-y-4 flex flex-col"
      >
        <TextField
          ref={lastNameRef}
          label="Nom"
          {...(lastNameRef.current && {
            message: !isValidName(lastNameRef.current.value)
              ? "Le nom est invalide"
              : "",
          })}
        />
        <TextField
          ref={firstNameRef}
          label="Prénom"
          {...(firstNameRef.current && {
            message: !isValidName(firstNameRef.current.value)
              ? "Le prénom est invalide"
              : "",
          })}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white ease-in duration-100 text-sm font-semibold px-4 py-2 rounded-sm"
        >
          Confirmer
        </button>
      </form>
    </div>
  );
}

const TextField = React.forwardRef(({ label, message = "" }, ref) => {
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
        data-testid={formattedLabel}
        type="text"
        id={formattedLabel}
        ref={ref}
        className="block w-full rounded-sm border-0 py-1.5 px-4 text-sm ring-1 ring-inset ring-gray-400"
      />
      {message !== "" && <div className="text-xs text-red-600">{message}</div>}
    </div>
  );
});
