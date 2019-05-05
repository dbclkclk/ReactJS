import * as React from 'react';
import {Input} from "reactstrap";
import CurrencyType from "../Types/Currency";
import CurrencyBalanceType from "../Types/Balance";
import CurrencyService from "../Services/CurrencyService";
import ICurrencyService from "../Services/Interfaces/ICurrencyService";
import {Listener} from "typescript.events";
import CurrencyStore from "../Stores/CurrencyStore";
import DefaultCurrencyStore from "../Stores/DefaultCurrencyStore";

type CurrenciesState = {
    currencies: Array<CurrencyType>,
    defaultCurrency: CurrencyType,
    balance: number
}

export default class DefaultCurrency extends React.Component<any, CurrenciesState>{
     private currencyService : ICurrencyService = null;
     constructor(props: any)
     {
        super(props);
        this.currencyService = new CurrencyService();
        this.setBalance = this.setBalance.bind(this);
        this.handleState = this.handleState.bind(this);
        this.setDefaultCurrency = this.setDefaultCurrency.bind(this);
        this.state =  {
            currencies: ["USD", "CHF", "EUR"],
            defaultCurrency: null,
            balance: 0
        };
     }
     async componentDidMount() {
          await this.setDefaultCurrency();
          //Set handler
          let that = this;
          let func : Listener = () => {
             that.setBalance();
          }
          CurrencyStore.addChangeListener(func);
          let func2 : Listener = () => {
              that.setDefaultCurrency();
          }
          DefaultCurrencyStore.addChangeListener(func2);
     }
     async setBalance () : Promise<void>
     {
         let result : CurrencyBalanceType = await this.currencyService.balance(this.state.defaultCurrency);
         this.setState({balance: result.value});
     }
     async setDefaultCurrency () : Promise<void>
     {
          //Default Currency
          let result : CurrencyType = DefaultCurrencyStore.getLastState();
          //Get Balance
          let amount: CurrencyBalanceType = await this.currencyService.balance(result);
          this.setState({defaultCurrency: result, balance: amount.value});
     }
     async handleState (event): Promise<void> {
         let val :  CurrencyType = event.target.value;
         await this.currencyService.changeDefaultCurrency(val);
     }

     render() {
          let records : any = this.state.currencies.map((data: CurrencyType, key: number)=> {
                            return <option key={data} value={data}>{data}</option>;
                        });

        return (
              <span>
                    <span>Set your Default Currency: 
                            <Input type="select" name="defaultCurrency" id="defaultCurrency" onChange={this.handleState}>
                                <option>Select Currency</option>
                                {records}
                            </Input>
                    </span>
                    <span>Your Balance is: {this.state.balance} {this.state.defaultCurrency}</span>
              </span>
        );
      }
};