import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

function Layout() {
    const {operator} = useSelector((state) => state.operator);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const adminMenu = [
        {
            name: 'admin_menu1',
            path: '/',
        },
        {
            name: 'admin_menu2',
            path: '/'
        }
    ];

    const seniorMenu = [
      {
          name: 'senior_menu1',
          path: '/',
      },
      {
          name: 'senior_menu2',
          path: '/'
      }
  ];

  const storeMenu = [
    {
        name: 'store_menu1',
        path: '/',
    },
    {
        name: 'store_menu2',
        path: '/'
    }
];
    const salesmanMenu = [
        {
            name: 'OP Bill',
            path: '/op-pharmacy-billing',
        },
        {
            name: 'Stock',
            path: '/'
        },
        {
            name: 'Store',
            path: '/store'
        }
    ];

    const menuToBeRendered = operator && operator.role === "admin" ? adminMenu : operator && operator.role === "senior" ? seniorMenu : operator && operator.role === "store" ? storeMenu : salesmanMenu;

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">SIMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menuToBeRendered.map((menu) => {
                return (
                    <Nav.Link href={menu.path}>{menu.name}</Nav.Link>
                )
            })}
          </Nav>
          <Nav>
            <NavDropdown title={operator && operator.name} id="collasible-nav-dropdown">
              {operator && operator.role === "admin" && <NavDropdown.Item href="/operators">Operators</NavDropdown.Item>}
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Layout;