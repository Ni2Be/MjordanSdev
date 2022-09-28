
import React from "react";
import { render, screen } from "@testing-library/react"
import About from "../About";

it('should render About', async () => {
  render(<About />);
  const description = await screen.findByText('Hi, I’m Jordan,');
  await expect(description).toBeVisible();
});