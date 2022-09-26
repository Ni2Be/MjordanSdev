
import React from "react";
import { render, screen } from "@testing-library/react"
import ProjectList from "../ProjectList";

const projectsGetAllMock = [ { id: 'someId', name: 'Some Name', description: 'some description'} ];

jest.mock('../../../api/agent', () => ({
  __esModule: true,
  default: {
    Projects: { getAll: async () => projectsGetAllMock }
  }
}))

it('should render ProjectList', async () => {
  render(<ProjectList />);
  const description = await screen.findByText('some description');
  expect(description).toBeVisible();
});