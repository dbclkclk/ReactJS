import * as React from 'react';
import {Container, Row, Col } from "reactstrap";
import Balance from "../Components/Balance";
import Deposit from "../Components/Deposit";
import Withdrawal from "../Components/Withdrawal";

export default class DefaultPage extends React.Component{

      render() {
        return (
          <Container>
            <Row>
              <Col>
                  <br />
                  <Row><Col><Balance /></Col></Row>
              </Col>
              <Col>
                <br />
                <Row><Col><Deposit /></Col></Row>
                <br />
                <Row><Col><Withdrawal /></Col></Row>
              </Col>
            </Row>
          </Container>
        );
      }
};