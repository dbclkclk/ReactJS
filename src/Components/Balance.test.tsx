import * as React from 'react';
import * as enzyme  from 'enzyme';
const shallow = enzyme.shallow;
const mount = enzyme.mount;
import Adapter from 'enzyme-adapter-react-16';
import CurrencyService from "../Services/CurrencyService";
import CurrencyStore from "../Stores/CurrencyStore";
import DefaultCurrencyType from "../Stores/DefaultCurrencyStore";
import Balance from './Balance';

enzyme.configure({ adapter: new Adapter() });

let mockBalanceFn = jest.fn().mockResolvedValue([{key: "USD", value:10}, {key: "EUR", value:10}, {key: "CHF", value:10}]);
let mockUsdEurOperationFn = jest.fn();
let mockUsdChfOperationFn = jest.fn();
let mockEurChfOperationFn = jest.fn();
let mockGetDefaultCurrencyType = jest.fn().mockResolvedValue("EUR");


let currencyStoreCallback : any = null;
let defaultCurrencyStoreCallback : any = null;

CurrencyStore.addChangeListener = (callBack: any) => currencyStoreCallback = callBack
    
  
DefaultCurrencyType.addChangeListener =  (callBack: any) => defaultCurrencyStoreCallback = callBack;


jest.mock('../Services/CurrencyService', () => {
    return jest.fn().mockImplementation(() => ({
        balances: mockBalanceFn,
        UsdEurOperation: mockUsdEurOperationFn,
        UsdChfOperation: mockUsdChfOperationFn,
        EurChfOperation: mockEurChfOperationFn,
        getDefaultCurrencyType: mockGetDefaultCurrencyType
    }));
  
});


test('Instantiate Balance component, should setup current balances', () => {
    const balanceComponent = shallow(<Balance />);
    expect(mockUsdEurOperationFn).toHaveBeenCalled();
    expect(mockUsdChfOperationFn).toHaveBeenCalled();
    expect(mockEurChfOperationFn).toHaveBeenCalled();
});

test('When default currency changes, should update default currency to EU in UI', async () => {
    const balanceComponent = mount(<Balance />);
    await defaultCurrencyStoreCallback();
    balanceComponent.update();
    expect(mockGetDefaultCurrencyType).toHaveBeenCalled();
});