import { Tezos } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { TransactionOperation } from '@taquito/taquito/dist/types/operations/transaction-operation';

import Logger from './Logger';

export default class Wallet {
    constructor() {
        // Set the network RPC
        Tezos.setRpcProvider(process.env.TEZOS_RPC);
        // Set the secret key
        InMemorySigner.fromSecretKey(process.env.SECRET_KEY)
            .then((signer) => Tezos.setSignerProvider(signer))
            .catch((error) => Logger.error(`${error} ${JSON.stringify(error, null, 2)}`));
    }

    public callOracle = async (
        destination: string,
        request_id: string,
        type: string,
        result: number | string,
    ): Promise<TransactionOperation> => {
        const contract = await Tezos.contract.at(destination);

        const operation = await contract.methods['fulfill_request'](request_id, type, result).send();

        Logger.info(`Operation "${operation.hash}" was injected...`);
        Logger.debug('Operation Result: ', operation);

        return operation;
    };
}
