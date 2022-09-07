import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useNavigate } from 'react-router-dom'; 

function Layout() {
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

    const userMenu = [
        {
            name: 'user_menu1',
            path: '/',
        },
        {
            name: 'user_menu2',
            path: '/'
        }
    ];

    const menuToBeRendered = userMenu;

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">SIMS</Navbar.Brand>
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
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Layout;