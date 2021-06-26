import EditProfileStu from "../EditProfileStu";
import { Card, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./YourProfileStu.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { store } from "../../../firebase";

const YourProfileStu = () => {
	const [edit, setEdit] = useState(false);
	const { currentUser } = useAuth();
	const [userData, setUserData] = useState(null);

	function onEdit() {
		setEdit(true);
	}

	const getUser = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/student-accounts/" +
				currentUser.email
		);
		const jsonData = await response.json();
		setUserData(jsonData);
	};

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [edit]);

	if (edit === true) {
		return <EditProfileStu setEdit={setEdit} />;
	} else {
		return (
			<div className={styles.formBG}>
				<div className={styles.formContainer}>
					<Card bg="light" text="dark">
						<Card.Header as="h6">Your profile</Card.Header>
						<Card.Body>
							<Form onSubmit={onEdit}>
								<Form.Group controlId="formName">
									<Form.Label>Name as in NRIC</Form.Label>{" "}
									<Form.Control
										placeholder={userData !== null ? userData.name : ""}
										readOnly
										onClick={onEdit}
									/>
								</Form.Group>
								<Form.Group controlId="formDob">
									<Form.Label>Date of birth</Form.Label>
									<Form.Control
										placeholder={userData !== null ? userData.dob : ""}
										readOnly
										onClick={onEdit}
									/>
								</Form.Group>
								<Form.Group controlId="formEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										placeholder={userData !== null ? userData.id : ""}
										readOnly
										onClick={onEdit}
									/>
								</Form.Group>
								<Form.Group controlId="formContactNo">
									<Form.Label>Mobile number</Form.Label>
									<Form.Control
										placeholder={userData !== null ? userData.contactNo : ""}
										readOnly
										onClick={onEdit}
									/>
								</Form.Group>
								<Form.Group controlId="formCourse">
									<Form.Label>Course of study</Form.Label>
									<Form.Control
										placeholder={userData !== null ? userData.course : ""}
										readOnly
										onClick={onEdit}
									/>
								</Form.Group>
								<Form.Group controlId="formYear">
									<Form.Label>Year of study</Form.Label>
									<Form.Control
										placeholder={userData !== null ? userData.year : ""}
										readOnly
										onClick={onEdit}
									/>
								</Form.Group>
								<Button variant="primary" type="submit">
									Edit profile
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
	}
};

export default YourProfileStu;
