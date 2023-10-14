import { Nav, Navbar, Container } from "react-bootstrap";import Home from "../pages/Home";

const AppNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>MyBlog</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default AppNavbar;
