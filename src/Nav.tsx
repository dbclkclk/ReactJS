import * as React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import DefaultCurrency from "./Components/DefaultCurrency";
const {
  NavLink: RRLink 
} = ReactRouterDom;
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavLink } from 'reactstrap';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Hi John Doe <DefaultCurrency /></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={RRLink} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRLink} to="/transfer">Transfers</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRLink} to="/deposit">Deposit</NavLink>
                        </NavItem>
                    </Nav>
            </Navbar>
            
      </div>
    );
  }
}