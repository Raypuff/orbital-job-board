import React from "react";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import JobBoard from "../components/JOBS/JobBoard/JobBoard";

test("screen has loading spinner before Jobs load", () => {
	render(<JobBoard />);
	expect(screen.getByRole("status")).toBeInTheDocument();
});

// test("empty state page if no jobs are available", async () => {
// 	fetch.mockImplementationOnce(() => Promise.reject(new Error()));
// 	render(<JobBoard />);
// 	expect(screen.queryByText("There are no jobs...")).toBeNull();
// 	expect(await screen.findByText("There are no jobs...")).toBeInTheDocument();
// });
