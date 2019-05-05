import * as React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Navigation from './Nav';
import DefaultPage from './Pages/DefaultPage';
import DepositPage from './Pages/DepositPage';
import TransferPage from './Pages/TransferPage';
import {HashRouter, Route} from  'react-router-dom';

function App() {
  debugger;
  return (
   <Container>
        <HashRouter>
          <Row>
            <Col><Navigation /></Col>
          </Row>
          <Row>
            <Col>
                <Route exact path="/" component={DefaultPage} />
                <Route path="/transfer" component={TransferPage} />
                <Route path="/deposit" component={DepositPage} />
            </Col>
          </Row>
        </HashRouter>
    </Container>
  );
}

export default App;
