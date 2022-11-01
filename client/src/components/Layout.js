import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import jwt from "jwt-decode";
import logo from "../sims-Logo-new.png";

function Layout() {
  const token = localStorage.getItem("token");
  var operator;

  if (token) {
    operator = jwt(token).operator;
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const adminMenu = [
    {
      name: "Store",
      path: "/store",
    },
    {
      name: "Stock",
      path: "/stock",
    },
  ];

  const seniorMenu = [
    {
      name: "Store",
      path: "/store",
    },
    {
      name: "Stock",
      path: "/stock",
    },
    {
      name: "Check Request",
      path: "/check-request",
    },
  ];

  const storeMenu = [
    {
      name: "Stock",
      path: "/stock",
    },
    {
      name: "Store",
      path: "/store",
    },
    {
      name: "Add Item",
      path: "/add-item",
    },
  ];
  const salesmanMenu = [
    {
      name: "OP Bill",
      path: "/op-pharmacy-billing",
    },
    {
      name: "Stock",
      path: "/stock",
    },
    {
      name: "Store",
      path: "/store",
    },
  ];

  const menuToBeRendered =
    operator && operator.role === "admin"
      ? adminMenu
      : operator && operator.role === "senior"
      ? seniorMenu
      : operator && operator.role === "store"
      ? storeMenu
      : salesmanMenu;
  const navbarColor =
    operator && operator.role === "admin"
      ? "danger"
      : operator && operator.role === "senior"
      ? "secondary"
      : operator && operator.role === "store"
      ? "success"
      : "primary";
  return (
    <Navbar collapseOnSelect expand="lg" bg={navbarColor} variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="SIMS" className="img-thumbnail" width="75" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menuToBeRendered.map((menu) => {
              return (
                <Nav.Link key={menu.name} href={menu.path}>
                  {menu.name}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav>
            <NavDropdown
              title={operator && operator.name}
              id="collasible-nav-dropdown"
            >
              {operator && operator.role === "admin" && (
                <NavDropdown.Item href="/operators">Operators</NavDropdown.Item>
              )}
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Layout;