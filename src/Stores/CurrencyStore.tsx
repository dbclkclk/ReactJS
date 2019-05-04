import Dispatcher from "../Dispatcher/Dispatcher";
import {Event} from "typescript.events";
import IStore from './Interfaces/IStore';
import CurrencyType from '../Types/Currency';

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
}

let CurrencyStore = new CurrencyStoreImpl();

/*Dispatcher.register((param: CurrencyType) =>  {
  switch (param.actionType) {
    case ActionTypes.ID_BASE:
      _baseIdStore.push(param.data);
      store.emitChange();
      break;
    default:
      break;
  }
});*/

export CurrencyStore;