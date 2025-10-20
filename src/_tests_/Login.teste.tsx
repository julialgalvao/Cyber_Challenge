import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import DOMPurify from "dompurify";

jest.mock("dompurify", () => ({
  sanitize: jest.fn((input) => input.replace(/<[^>]*>?/gm, "")),
}));

test("sanitiza entrada antes de envio", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("E-mail");
  fireEvent.change(emailInput, { target: { value: "<script>hack</script>" } });
  fireEvent.submit(screen.getByText("Entrar"));
  expect(DOMPurify.sanitize).toHaveBeenCalled();
});
