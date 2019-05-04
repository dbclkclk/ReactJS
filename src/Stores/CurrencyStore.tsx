import Dispatcher from "../Dispatcher/Dispatcher";
import {Event} from "typescript.events";
import IStore from './Interfaces/IStore';
import CurrencyType from '../Types/Currency';
import CurrencyAction from '../Types/CurrencyAction';

type CurrencyKeyValueStorage = {
  'USD': number;
  'CHF': number;
  'EUR': number;
};

class CurrencyStoreImpl extends Event implements IStore {

    private store : CurrencyKeyValueStorage =  {'USD': 0, 'CHF': 0, 'EUR': 0};

    addChangeListener (callback: Function) : void {
        this.on("change", callback);
    }
    removeChangeListener (callback: Function) : void {
        this.removeListener("change", callback);
    }
    emitChange () : void {
        this.emit("change");
    }
    getLastState (key: CurrencyType) : CurrencyType {
        return this.store[key];
    }
    setValue(key: CurrencyType, value: number) : void {
        this.store[key] = value;
        this.emmitChange();
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

export CurrencyStore;