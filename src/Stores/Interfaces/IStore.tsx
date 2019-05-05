import CurrencyType from '../../Types/Currency';
import {Listener} from "typescript.events";

export default interface IStore {
        addChangeListener (callback: Listener) : void;
        removeChangeListener(callback: Listener): void;
        emitChange () : void;

}