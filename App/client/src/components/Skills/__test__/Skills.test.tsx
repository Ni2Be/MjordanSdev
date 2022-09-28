
import React from "react";
import { render, screen } from "@testing-library/react"
import Skills from "../Skills";

it('should render Logo with text', async () => {
  const text = 'logo text';
  render(<Skills/>);
  const logoText = screen.getByText(text);
  await expect(logoText).toBeVisible();
});