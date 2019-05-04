export default interface ICurrencyService {
    DepositCurrency(pair: string, amount: number ): void
}