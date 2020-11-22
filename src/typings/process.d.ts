declare namespace NodeJS {
    export interface Process {
        env: {
            PORT: string; // Port where the REST service will be listening.
            SECRET_KEY: string; // Tezos Secret Key (e.g. edsk...)
            TEZOS_RPC: string; // Tezos RPC URL (e.g. https://mainnet.smartpy.io)
        };
    }
}
