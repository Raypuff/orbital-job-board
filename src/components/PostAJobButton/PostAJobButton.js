import { Nav } from "react-bootstrap";

const PostAJobButton = () => {
  return (
    <Nav>
      <Nav.Link eventKey={2} href="post_a_job">
        Post A Job
      </Nav.Link>
    </Nav>
  );
};

export default PostAJobButton;
