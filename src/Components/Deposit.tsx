import * as React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CurrencyType from "../Types/Currency";
import CurrencyBalanceType from "../Types/Balance";
import CurrencyService from "../Services/CurrencyService";
import ICurrencyService from "../Services/Interfaces/ICurrencyService";

interface DepositForm {
    currency: CurrencyType;
    amount: number
}

interface CurrencyListStates {
    currencies: Array<string>;
    form: DepositForm
}
export default class Deposit extends React.Component<any, CurrencyListStates>{
      private currencyService : ICurrencyService = null;
      public state : CurrencyListStates = {
          currencies: ["USD", "CHF", "EUR"],
          form: {currency: null, amount: 0}
      }
      constructor(props: any)
      {
          super(props);
          this.currencyService = new CurrencyService();
          this.handleState = this.handleState.bind(this);
          this.submit = this.submit.bind(this);
      }
      handleState (event) {
        let target : any = event.target;
        let name : any = target.name;
        let form : DepositForm = {...this.state.form};
        form[name] = target.value;
        this.setState({form: form});
      }
      async submit (e) {
          e.preventDefault();
          await this.currencyService.deposit(this.state.form.currency, this.state.form.amount);
      }
      render() {
          let records : any = this.state.currencies.map((data: string, key: number)=> {
                            return <option key={data} value={data}>{data}</option>;
                        });
        return (
        <Form>
            <h4>Make a Deposit</h4>
            <FormGroup>
                <Label for="currency">Currency</Label>
                <Input type="select" name="currency" id="currency" onChange={this.handleState} required>
                    <option>Select a currency</option>
                    {records}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="amount">Amount</Label>
                <Input type="number" required name="amount" id="amount" placeholder="Enter deposit amount" onChange={this.handleState} />
            </FormGroup>
            <Button onClick={this.submit}>Submit</Button>
      </Form>
        );
      }
};