import * as React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import CurrencyType from "../Types/Currency";
import CurrencyBalanceType from "../Types/Balance";
import CurrencyService from "../Services/CurrencyService";
import ICurrencyService from "../Services/Interfaces/ICurrencyService";
import {Listener} from "typescript.events";
import CurrencyStore from "../Stores/CurrencyStore";

interface WithdrawalForm {
    fromCurrency: CurrencyType;
    toCurrency: CurrencyType;
    amount: number;
    balance: number;
}

interface CurrencyListStates {
    currencies: Array<CurrencyType>;
    form: WithdrawalForm,
    error?: string,
    success: boolean
}
export default class Withdrawal extends React.Component<any, CurrencyListStates>{
      private currencyService : ICurrencyService = null;
      public state : CurrencyListStates = {
          currencies: ["USD", "CHF", "EUR"],
          form: {fromCurrency: null, toCurrency: null, amount: 0, balance:0},
          error: "",
          success: false
      }
      constructor(props: any)
      {
          super(props);
          this.currencyService = new CurrencyService();
          this.handleState = this.handleState.bind(this);
          this.submit = this.submit.bind(this);
          this.getNewBalance = this.getNewBalance.bind(this);
      }
      componentDidMount() {
          let that = this;
          let func : Listener = () => {
              that.getNewBalance();
          }
          CurrencyStore.addChangeListener(func);

      }
      async getNewBalance () {
        let val : CurrencyBalanceType = await this.currencyService.balance(this.state.form.fromCurrency);
        let form : WithdrawalForm = {...this.state.form};
        form.balance = val.value;
        this.setState({form: form});
      }
      handleState (event) {
        let target : any = event.target;
        let name : any = target.name;
        let form : WithdrawalForm = {...this.state.form};
        form[name] = target.value;
        this.setState({form: form});
      }
      async submit (e) {
          e.preventDefault();
          try {
            await this.currencyService.exchange(this.state.form.fromCurrency, this.state.form.amount, this.state.form.toCurrency);
            this.setState({error: null, success: true});
        } catch (err) {
             this.setState({error: err, success: false});
         }
      }
      render() {
          let records : any = this.state.currencies.map((data: string, key: number)=> {
                            return <option key={data} value={data}>{data}</option>;
                        });

          let message : any  = null;
          if (this.state.error !== null && this.state.error !== "") {
              message = (<Alert color="danger">
                            {this.state.error}
                        </Alert>);
          } else {
              if (this.state.success == true) {
                  message =  (<Alert color="success">
                                Information Saved
                            </Alert>);
              }
          }
        return (
            
        <Form>
            <h4>Transfer your money</h4>
            {message}
            <FormGroup>
                <Label for="fromCurrency">From Currency: </Label>
                <Input type="select" name="fromCurrency" id="fromCurrency" onChange={this.handleState}>
                    <option>Select a currency</option>
                    {records}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="toCurrency">To Currency: </Label>
                <Input type="select" name="toCurrency" id="toCurrency" onChange={this.handleState}>
                    <option>Select a currency</option>
                    {records}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="amount">Amount: (available: {this.state.form.balance})</Label>
                <Input type="number" name="amount" id="amount" placeholder="Enter deposit amount" onChange={this.handleState} />
            </FormGroup>
            <Button onClick={this.submit}>Submit</Button>
      </Form>
        );
      }
};