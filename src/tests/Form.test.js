import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Form tests suite", () => {
  describe("name type field", () => {
    test("should show toast and lastName field with error message", () => {
      render(<App />);

      const btn = screen.getByRole("button");
      fireEvent(btn, new MouseEvent("click", { bubbles: true }));

      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("bg-red-600");
      expect(toast).toHaveTextContent(/Une erreur s'est produite/);

      const message = screen.getByText(/Le nom est invalide/);
      expect(message).toBeInTheDocument();
    });

    test("should show toast with success message", () => {
      render(<App />);

      const lastName = screen.getByTestId("nom");
      lastName.value = "Dupré";

      const firstName = screen.getByTestId("prenom");
      firstName.value = "Stéphane";

      const btn = screen.getByRole("button");
      fireEvent(btn, new MouseEvent("click", { bubbles: true }));

      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("bg-blue-600");
      expect(toast).toHaveTextContent(/Le compte a bien été enregistré/);
    });
  });
});
