import ICurrencyService from './Interfaces/ICurrencyService';
import Dispatcher from "../Dispatcher/Dispatcher";

export default class CurrencyService implements ICurrencyService  {

    async DepositCurrency(pair: string, amount: number )
    {
        return new Promise<void>(resolve => {


        });
    }
}