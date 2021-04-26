import { getPrice } from '../../services/Prices';

describe('Prices', () => {
    it('Get Price from Coinbase', async () => {
        process.env.PRICE_SOURCE="COINBASE"
        expect(await getPrice("XTZ", "EUR")).toEqual(20);
    });

    it('Get Price from Kraken', async () => {
        process.env.PRICE_SOURCE="KRAKEN"
        expect(await getPrice("XTZ", "EUR")).toEqual(20);
    });
});
