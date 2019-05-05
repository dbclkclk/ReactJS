import CurrencyType from "../../Types/Currency";
import CurrencyBalanceType from "../../Types/Balance";

export default interface ICurrencyService {
    deposit(key: CurrencyType, amount: number ): Promise<number>;
    exchange(srcKey: CurrencyType, srcAmount: number, destKey: CurrencyType) : Promise<number>;
    balances() : Promise<Array<CurrencyBalanceType>>;
    balance(srcKey: CurrencyType) : Promise<CurrencyBalanceType>;
    changeDefaultCurrency(srcKey: CurrencyType) : void;
    getDefaultCurrencyType() : Promise<CurrencyType>;
    UsdEurOperation (srcKey: CurrencyType, srcTransferAmount : number, destKey: CurrencyType): number;
    UsdChfOperation (srcKey: CurrencyType, srcTransferAmount : number, destKey: CurrencyType): number;
    EurChfOperation (srcKey: CurrencyType, srcTransferAmount : number, destKey: CurrencyType): number;
}