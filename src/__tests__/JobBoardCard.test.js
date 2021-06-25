import React from "react";
import { StaticRouter } from "react-router-dom";
import { getByText, render, screen } from "@testing-library/react";
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

describe("ensure card renders props correctly", () => {
	test("thumbnail", async () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard imageUrl="/test.png" />
			</StaticRouter>
		);
		const jobThumbnail = await job.findByTestId("thumbnail");
		expect(jobThumbnail.src).toContain("test.png");
	});
	test("beneficiaries and skills and overflow", () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard
					beneficiaries={["test1", "test2", "test3"]}
					skills={["test4", "test5", "test6"]}
				/>
			</StaticRouter>
		);
		const beneficiaries = job.getByTestId("beneficiaries");
		const skills = job.getByTestId("skills");
		expect(beneficiaries).toHaveTextContent("test1, test2");
		expect(skills).toHaveTextContent("test4, test5");
	});
	test("virtual location", () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard platform="Virtual" />
			</StaticRouter>
		);
		const location = job.getByTestId("location");
		expect(location).toHaveTextContent("Virtual");
	});
	test("multiple locations", () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard platform="Physical" multiLocation={true} />
			</StaticRouter>
		);
		const location = job.getByTestId("location");
		expect(location).toHaveTextContent("Multiple locations");
	});
	test("location and distance", () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard platform="Physical" location="test" postalCode="123456" />
			</StaticRouter>
		);
		const location = job.getByTestId("location");
		const distance = job.getByTestId("distance");
		expect(location).toHaveTextContent("test");
		expect(distance).toHaveTextContent("123456m away");
	});
	test("commitment long term", () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard
					type="Long term"
					longStartDate="1999-09-10"
					longEndDate="2020-09-10"
				/>
			</StaticRouter>
		);
		expect(job.getByTestId("type")).toHaveTextContent("Long term");
		expect(job.getByTestId("shifts")).toHaveTextContent("Sep 10 1999 - ");
		expect(job.getByTestId("shifts")).toHaveTextContent("Sep 10 2020");
	});
	test("commitment ad hoc", () => {
		const job = render(
			<StaticRouter>
				<JobBoardCard
					type="Ad hoc"
					adShift={[
						{ date: "1999-09-10", startTime: "08:00", endTime: "21:00" },
						{
							date: "2020-09-10",
							startTime: "08:00",
							endTime: "21:00",
						},
					]}
				/>
			</StaticRouter>
		);
		expect(job.getByTestId("type")).toHaveTextContent("Ad hoc");
		expect(job.getByTestId("shifts")).toHaveTextContent(
			"Sep 10 1999, 8:00AM - 9:00PM"
		);
	});
});

test("clicking learn more leads to job details page", async () => {
	render(
		<StaticRouter>
			<JobBoardCard id="testURL" />
		</StaticRouter>
	);
	expect(screen.getByText("Learn more")).toBeInTheDocument();
	expect(screen.getByText("Learn more").closest("a")).toHaveAttribute(
		"href",
		"/jobs/testURL"
	);
});
