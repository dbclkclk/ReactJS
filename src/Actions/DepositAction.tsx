import Dispatcher from "../Dispatcher/Dispatcher";
import CurrencyType from "../Types/Currency";

export default abstract class CurrencyAction {
    deposit(type: CurrencyType, value: number) {
        Dispatcher.dispatch(type, value, "DEPOSIT");
    }
}