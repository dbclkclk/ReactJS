import * as React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import CurrencyType from "../Types/Currency";
import CurrencyBalanceType from "../Types/Balance";
import CurrencyService from "../Services/CurrencyService";
import ICurrencyService from "../Services/Interfaces/ICurrencyService";
import {Listener} from "typescript.events";
import CurrencyStore from "../Stores/CurrencyStore";
import DefaultCurrencyType from "../Stores/DefaultCurrencyStore";

type BalanceStates = {
    balances: Array<CurrencyBalanceType>,
    defaultCurrency: CurrencyType,
    conversion: number
}

export default class Balance extends React.Component<any, BalanceStates>{

     private currencyService : ICurrencyService = null;
     constructor(props: any)
     {
        super(props);
        this.currencyService = new CurrencyService();
        this.getNewBalances = this.getNewBalances.bind(this);
        this.setDefaultCurrency = this.setDefaultCurrency.bind(this);
        this.state = {
            balances: [{key:"USD", value: 0},  {key:"EUR", value:0}, {key:"CHF", value:0}],
            defaultCurrency: null,
            conversion: 0
        }
     }
     async componentDidMount() {
          let result : Array<CurrencyBalanceType> = await this.currencyService.balances();
          this.setState({balances: result});
          let that = this;
          let func : Listener = () => {
             that.getNewBalances();
          }
          CurrencyStore.addChangeListener(func);
          let func2 : Listener = () => {
                that.setDefaultCurrency();
          }
          DefaultCurrencyType.addChangeListener(func2);
     }
     async setDefaultCurrency () : Promise<void>
     {
          //Default Currency
          let result : CurrencyType = await this.currencyService.getDefaultCurrencyType();
          this.setState({defaultCurrency: result});
     }
     async getNewBalances () 
     {
         let result : Array<CurrencyBalanceType> = await this.currencyService.balances();
         this.setState({balances: result});
     }
     render() {
         let total : number = 0;
         let templates : any = this.state.balances.map((data : CurrencyBalanceType, key: number) => {
             if (this.state.defaultCurrency !== data.key) {
                total = total + +(this.currencyService.UsdEurOperation(data.key, data.value, this.state.defaultCurrency));
                total = total + +(this.currencyService.UsdChfOperation(data.key, data.value, this.state.defaultCurrency));
                total = total + +(this.currencyService.EurChfOperation(data.key, data.value, this.state.defaultCurrency));
             } else {
                 total = total + +data.value; 
             }
             return <ListGroupItem key={data.key}>{data.key} | {data.value}</ListGroupItem>;
         })
        return (
            <div>
              <h4>Balances</h4>
              <ListGroup flush>
                    {templates}
              </ListGroup>
              <span>Total in {this.state.defaultCurrency}: {total}</span>
            </div>
        );
      }
};