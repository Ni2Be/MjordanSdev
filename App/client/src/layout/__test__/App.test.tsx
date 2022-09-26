
import React from "react";
import { render, screen } from "@testing-library/react"
import App from "../App";

it('should render App', async () => {
  render(<App/>);
  const application = screen.getByRole("application");
  await expect(application).toBeInTheDocument();
});