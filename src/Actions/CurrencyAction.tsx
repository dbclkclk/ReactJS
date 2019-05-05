import Dispatcher from "../Dispatcher/Dispatcher";
import CurrencyType from "../Types/Currency";

export default class CurrencyAction {
    static deposit(type: CurrencyType, value: number): void {
        Dispatcher.dispatch({type:type, value:value, action:"DEPOSIT"});
    }

    static withdraw(type: CurrencyType, value: number): void {
        Dispatcher.dispatch({type:type, value:value, action:"WITHDRAWAL"});
    }
    static defaultCurrency(type: CurrencyType) {
        Dispatcher.dispatch({type: type, action: "CHANGE"});
    }
}