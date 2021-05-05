import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { TransactionOperation } from '@taquito/taquito/dist/types/operations/transaction-operation';

import Logger from './Logger';

const Tezos = new TezosToolkit(process.env.TEZOS_RPC);

export default class Wallet {
    constructor() {
        // Set the secret key
        InMemorySigner.fromSecretKey(process.env.SECRET_KEY)
            .then((signer) => Tezos.setSignerProvider(signer))
            .catch((error) => Logger.error(`${error} ${JSON.stringify(error, null, 2)}`));
    }

    /**
     * @summary The method serves as a template and should be adapted to the needed use case.
     *
     * @param destination contract address
     * @param request_id request identifier
     * @param price current price
     *
     * @returns {Promise<TransactionOperation>}
     */
    public callContract = async (
        destination: string,
        request_id: string,
        price: number,
        force: boolean
    ): Promise<TransactionOperation> => {
        const contract = await Tezos.contract.at(destination);

        const response = MichelsonMap.fromLiteral({
            price: { int: price },
        });

        Logger.info("Response:", request_id, response, force, price);

        const operation = await contract.methods['fulfill_request'](force, request_id, response).send();

        Logger.info(`Operation "${operation.hash}" was injected...`);
        Logger.debug('Operation Result: ', operation);

        return operation;
    };
}
