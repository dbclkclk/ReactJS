import ICurrencyService from './Interfaces/ICurrencyService';
import Dispatcher from "../Dispatcher/Dispatcher";
import CurrencyStore from "../Stores/CurrencyStore";
import CurrencyType from "../Types/Currency";

export default class CurrencyService implements ICurrencyService  {

    async DepositCurrency(key: CurrencyType, amount: number )
    {
        return new Promise<void>(resolve => {
            let value = CurrencyStore.getLastState(key);
            value = value + amount;
            Dispatcher.dispatch(key, value, "DEPOSIT");
        });
    }
}