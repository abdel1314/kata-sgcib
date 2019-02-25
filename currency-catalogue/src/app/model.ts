export interface Currency {    
    code: string;
    decimal_digits: number;
    id: string;
    name: string;
    name_plural: string;
    rounding: number;
    symbol: string;
    symbol_native: string;
}

export interface CurrencyList {    
    currencies: Currency[];
}
