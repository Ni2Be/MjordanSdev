
import React from 'react';
import { render, screen } from "@testing-library/react"
import App from '../App';

it('renders without crashing: finds menu item "About"', () => {
  render(<App/>);
  const menuElem = screen.getByText("About");
  expect(menuElem).toBeInTheDocument();
});