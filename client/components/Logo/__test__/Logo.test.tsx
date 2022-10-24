
import React from "react";
import { render, screen } from "@testing-library/react"
import Logo from "../Logo";

it('should render Logo with text', async () => {
  const text = 'logo text';
  render(<Logo text={text} />);
  const logoText = screen.getByText(text);
  await expect(logoText).toBeVisible();
});