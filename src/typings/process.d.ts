declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;           // Port where the REST service will be listening.
        PRICE_SOURCE: string;   // Price source (KRAKEN, COINGECKO, COINBASE)
        SECRET_KEY: string;     // Tezos Secret Key (e.g. edsk...)
        TEZOS_RPC: string;      // Tezos RPC URL (e.g. https://mainnet.smartpy.io)
    }
}
