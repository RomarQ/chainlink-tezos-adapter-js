declare enum EnvironmentKeys {
    PORT = 'PORT',
    SECRET_KEY = 'SECRET_KEY',
    TEZOS_RPC = 'TEZOS_RPC',
}
declare namespace NodeJS {
    export interface Process {
        env: {
            [EnvironmentKeys.PORT]: string; // Port where the REST service will be listening.
            [EnvironmentKeys.SECRET_KEY]: string; // Tezos Secret Key (e.g. edsk...)
            [EnvironmentKeys.TEZOS_RPC]: string; // Tezos RPC URL (e.g. https://mainnet.smartpy.io)
        };
    }
}
