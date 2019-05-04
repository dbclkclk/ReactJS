import CurrencyType from '../../Types/Currency';

export default interface IStore {
        addChangeListener (callback: Function) : void;
        removeChangeListener(callback: Function): void;
        emitChange () : void;
        getLastState (key: CurrencyType) : number;

}