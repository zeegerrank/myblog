import { Container } from "react-bootstrap";import { Outlet } from "react-router-dom";

import AppNavbar from "../components/AppNavbar";

const Layout = () => {
  return (
    <div>
      <section className="mb-3">
        <AppNavbar />
      </section>
      <section>
        <Container>
          <Outlet />
        </Container>
      </section>
    </div>
  );
};
export default Layout;
