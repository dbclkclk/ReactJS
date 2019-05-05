import ICurrencyService from './Interfaces/ICurrencyService';
import CurrencyAction from "../Actions/CurrencyAction";
import CurrencyStore from "../Stores/CurrencyStore";
import DefaultCurrencyStore from "../Stores/DefaultCurrencyStore";
import CurrencyType from "../Types/Currency";
import CurrencyBalanceType from "../Types/Balance";
import CurrencyRates from "../Constants/CurrencyRates";

export default class CurrencyService implements ICurrencyService  {

    public async deposit(key: CurrencyType, amount: number ) : Promise<number>
    {
        return new Promise((resolve, reject) => {
            let value : number = CurrencyStore.getLastState(key);
            value = +value + +amount;
            CurrencyAction.deposit(key, value);
            resolve(value);
        });
    }

    public async exchange(srcKey: CurrencyType, srcAmount: number, destKey: CurrencyType) : Promise<number>
    {
        return new Promise((resolve, reject) => {
            let srcBalance : number = CurrencyStore.getLastState(srcKey);
            let destBalance : number = CurrencyStore.getLastState(destKey);
            let conversionBalance : number = 0;
            if ((+srcBalance - +srcAmount ) < 0) {
                return reject("You're not allowed to withdraw more than your available balance");
            }
            if (srcKey == destKey) {
                return reject ("You can't transfer to the same currency, try doing a deposit instead");
            }
            srcBalance = +srcBalance - +srcAmount;

            if ((srcKey === "USD" || destKey == "USD") && (srcKey === "EUR" || destKey == "EUR")){
                conversionBalance = this.UsdEurOperation(srcKey, srcAmount, destKey);
            }
            if ((srcKey === "USD" || destKey == "USD") && (srcKey === "CHF" || destKey == "CHF")){
                conversionBalance = this.UsdChfOperation(srcKey, srcAmount, destKey);
            }
            if ((srcKey === "EUR" || destKey == "EUR") && (srcKey === "CHF" || destKey == "CHF")){
                conversionBalance = this.EurChfOperation(srcKey, srcAmount, destKey);
            }
            CurrencyAction.deposit(srcKey, srcBalance);
            conversionBalance = +conversionBalance + +destBalance;
            CurrencyAction.deposit(destKey, conversionBalance);
            resolve(conversionBalance);
        });
    }
    public async balances() : Promise<Array<CurrencyBalanceType>>
    {
        return new Promise((resolve, reject) => {
            let usdBalance : number = CurrencyStore.getLastState("USD");
            let usd : CurrencyBalanceType = {key: "USD", value: +usdBalance};

            let eurBalance : number = CurrencyStore.getLastState("EUR");
            let eur : CurrencyBalanceType = {key: "EUR", value: +eurBalance};

            let chfBalance : number = CurrencyStore.getLastState("CHF");
            let chf : CurrencyBalanceType = {key:"CHF", value: +chfBalance};

            let result : Array<CurrencyBalanceType> = [usd, eur, chf];
            resolve(result);
        });
    }
    public async balance(srcKey: CurrencyType) : Promise<CurrencyBalanceType>
    {
        return new Promise((resolve, reject) => {
            let balance : number = CurrencyStore.getLastState(srcKey);
            let currencyBalance : CurrencyBalanceType = {key: srcKey, value: +balance};
            resolve(currencyBalance);
        });
    }
    public async changeDefaultCurrency(srcKey: CurrencyType) : Promise<void>
    {
        return new Promise((resolve, reject) => {
            CurrencyAction.defaultCurrency(srcKey);
            resolve();
        });
    }
    public async getDefaultCurrencyType() : Promise<CurrencyType>
    {
        return new Promise((resolve, reject) => {
            let val : CurrencyType = DefaultCurrencyStore.getLastState();
            resolve(val);
        });
    }
    public UsdEurOperation (srcKey: CurrencyType, srcTransferAmount : number, destKey: CurrencyType): number {
        let converesion : number = 0;
        if (srcKey === destKey) {
            return srcTransferAmount
        }
        if (srcKey === "USD" && destKey ==  "EUR") {
            converesion = +srcTransferAmount / CurrencyRates.EURUSD;
        } else {
            if (srcKey === "EUR" && destKey ==  "USD")
                converesion = +srcTransferAmount * CurrencyRates.EURUSD;
        }
        return converesion;
    }
    public UsdChfOperation (srcKey: CurrencyType, srcTransferAmount : number, destKey: CurrencyType): number {
        let converesion : number = 0;
        if (srcKey === destKey) {
            return srcTransferAmount
        }
        if (srcKey === "USD" && destKey ==  "CHF") {
            converesion = CurrencyRates.USDCHF * +srcTransferAmount;
        } else {
            if (destKey === "USD" && srcKey === "CHF")
                converesion = +srcTransferAmount / CurrencyRates.USDCHF;
        }
        return converesion;
    }
    public EurChfOperation (srcKey: CurrencyType, srcTransferAmount : number, destKey: CurrencyType): number {
        let converesion : number = 0;
        if (srcKey === destKey) {
            return srcTransferAmount
        }
        if (srcKey === "EUR" && destKey ==  "CHF") {
            converesion = CurrencyRates.EURCHF * +srcTransferAmount;
        } else {
            if (srcKey === "CHF" && destKey ==  "EUR")
                converesion = +srcTransferAmount / CurrencyRates.EURCHF;
        }
        return converesion;
    }
}