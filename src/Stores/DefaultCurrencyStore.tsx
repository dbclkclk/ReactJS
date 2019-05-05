import Dispatcher from "../Dispatcher/Dispatcher";
import {Event, Listener} from "typescript.events";
import IStore from './Interfaces/IStore';
import CurrencyType from '../Types/Currency';
import CurrencyAction from '../Types/CurrencyAction';

interface CurrencyKeyValueStorage {
  currency: CurrencyType;
};

class DefaultCurrencyStore extends Event implements IStore {

    private store : CurrencyKeyValueStorage = {currency: null};

    addChangeListener (callback: Listener) : void {
        this.on("change", callback);
    }
    removeChangeListener (callback: Listener) : void {
        this.removeListener("change", callback);
    }
    emitChange () : void {
        this.emit("change");
    }
    getLastState () : CurrencyType {
        return this.store.currency;
    }
    setValue(key: CurrencyType) : void {
        this.store.currency = key;
        this.emitChange();
    }
}

let defaultCurrencyStore = new DefaultCurrencyStore();

interface CurrencyParam {
    type: CurrencyType;
    action: CurrencyAction;
}


Dispatcher.register((param: CurrencyParam) =>  {
  switch (param.action) {
    case "CHANGE":
      defaultCurrencyStore.setValue(param.type);
      break;
    default:
      break;
  }
});

export default defaultCurrencyStore;