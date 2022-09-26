
import React from "react";
import { render, screen } from "@testing-library/react"
import SideBar from "../SideBar";

it('should render SideBar with menu items', async () => {
  render(<SideBar />);
  const about = screen.getByText(/about/i);
  const projects = screen.getByText(/projects/i);
  const contact = screen.getByText(/contact/i);
  const articles = screen.getByText(/articles/i);
  expect(about).toBeVisible();
  expect(projects).toBeVisible();
  expect(contact).toBeVisible();
  expect(articles).toBeVisible();
});