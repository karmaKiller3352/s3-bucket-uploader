import "./style.scss";
import { Container } from "react-bootstrap";

const PageWrapper = ({ children, pageTitle }) => (
  <Container className="page-wrapper">
    <h1 className="title">{pageTitle}</h1>
    {children}
  </Container>
);

export default PageWrapper;
