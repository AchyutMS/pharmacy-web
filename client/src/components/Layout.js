import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt from 'jwt-decode'

import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import logo from '../sims-Logo-new.png';

function Layout() {
    // const {operator} = useSelector((state) => state.operator);
    const token = localStorage.getItem('token')
    var operator

    if(token) {
      operator = jwt(token).operator
      console.log(operator,'')
    }

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        console.log('logged out')
        window.location.reload()

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
      name: 'Stock',
      path: '/stock'
    },
    {
      name: 'Store',
      path: '/store'
    },
    {
      name: 'Add Item',
      path: '/add-item'
    }
];
    const salesmanMenu = [
        {
            name: 'OP Bill',
            path: '/op-pharmacy-billing',
        },
        {
            name: 'Stock',
            path: '/stock'
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
        <Navbar.Brand href="/">
          <img src={logo} alt="SIMS" className='img-thumbnail'  width="75"/>
        </Navbar.Brand>
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
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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