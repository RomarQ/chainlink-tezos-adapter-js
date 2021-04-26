import axios from 'axios';
import PriceAPIError from './exceptions/PriceAPIError';

export const getPrice = (from: string, to: string) => {
    switch (process.env.PRICE_SOURCE) {
        case 'KRAKEN':
            return getKrakenPrice(from, to);
        case 'COINBASE': // COINBASE is the default
        default:
            return getCoinbasePrice(from, to);
    }
};

export const getCoinbasePrice = async (from: string, to: string): Promise<number> => {
    const data = await axios.get(`https://api.coinbase.com/v2/prices/${from}-${to}/spot`);

    const amount = data?.data?.data?.amount;
    if (amount) {
        return amount;
    }

    throw new PriceAPIError("Failed to fetch price from coinbase API.")
};

export const getKrakenPrice = async (from: string, to: string): Promise<number>  => {
    const data = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${from}${to}`);

    const amount = data?.data?.result?.[`${from}${to}`]?.a?.[0];
    if (amount) {
        return amount;
    }

    throw new PriceAPIError("Failed to fetch price from Kraken API.")
};
