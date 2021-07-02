import { useState, useEffect } from "react";

const EditJobs = ({ id }) => {
	const [job, setJob] = useState();

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/jobs/" + id
			);
			const jsonData = await response.json();
			const response2 = await fetch(
				process.env.REACT_APP_BACKEND_URL +
					"/organization-accounts/" +
					jsonData.orgID
			);
			const jsonData2 = await response2.json();
			setJob(jsonData);
		};
	}, []);

	return <div>yeet this is my {id}</div>;
};

export default EditJobs;
