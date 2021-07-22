import React from "react";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import JobBoard from "../components/JOBS/JobBoard/JobBoard";

test("screen has loading spinner before Jobs load", () => {
  render(<JobBoard />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});
