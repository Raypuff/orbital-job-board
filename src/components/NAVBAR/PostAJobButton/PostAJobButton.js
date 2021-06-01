import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostAJobButton = () => {
  return (
    <Nav>
      <Nav.Link as={Link} to="/post_a_job">
        Post A Job
      </Nav.Link>
    </Nav>
  );
};

export default PostAJobButton;
