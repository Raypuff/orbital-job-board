import React from "react";
import { StaticRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import JobBoardCard from "../components/JOBS/JobBoardCard";

test("thumbnail shows up properly", async () => {
	const job = render(
		<StaticRouter>
			<JobBoardCard imageUrl="/test.png" />
		</StaticRouter>
	);
	const jobThumbnail = await job.findByTestId("thumbnail");
	expect(jobThumbnail.src).toContain("test.png");
});

test("clicking learn more leads to job details page", async () => {
	const job = render(
		<StaticRouter>
			<JobBoardCard id="testURL" />
		</StaticRouter>
	);
	expect(screen.getByText("Learn more")).toBeInTheDocument();
	const leftClick = { button: 0 };
	expect(screen.getByText("Learn more").closest("a")).toHaveAttribute(
		"href",
		"/jobs/testURL"
	);
});
