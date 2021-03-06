import Dispatcher from "../Dispatcher/Dispatcher";
import {Event, Listener} from "typescript.events";
import IStore from './Interfaces/IStore';
import CurrencyType from '../Types/Currency';
import CurrencyAction from '../Types/CurrencyAction';

interface CurrencyKeyValueStorage {
  [index:string]: number;
};

class CurrencyStoreImpl extends Event implements IStore {

    private store : CurrencyKeyValueStorage =  {USD: 0, CHF: 0, EUR: 0};

    addChangeListener (callback: Listener) : void {
        this.on("change", callback);
    }
    removeChangeListener (callback: Listener) : void {
        this.removeListener("change", callback);
    }
    emitChange () : void {
        this.emit("change");
    }
    getLastState (key: CurrencyType) : number {
        let result : number;
        if (key !== null)
        {
            result = this.store[key.toString()];
        } else {
            result = 0;
        }
        return result;

    }
    setValue(key: CurrencyType, value: number) : void {
        this.store[key.toString()] = value;
        this.emitChange();
    }
}

let CurrencyStore = new CurrencyStoreImpl();

interface CurrencyParam {
    type: CurrencyType;
    value: number;
    action: CurrencyAction;
}


Dispatcher.register((param: CurrencyParam) =>  {
  switch (param.action) {
    case "DEPOSIT":
    case "WITHDRAWAL":
      CurrencyStore.setValue(param.type, param.value);
      break;
    default:
      break;
  }
});

export default CurrencyStore;