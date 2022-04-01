import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.scss";

const PageHeader = ({ children }) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Image uploader</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Upload
          </Nav.Link>
          <Nav.Link as={Link} to="/gallery">
            Gallery
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default PageHeader;
