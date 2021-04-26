import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { TransactionOperation } from '@taquito/taquito/dist/types/operations/transaction-operation';

import Wallet from './Wallet';
import Logger, { accessLog } from './Logger';
import Validator, { RequestParameters } from './Validator';
import GenericError from './exceptions/GenericError';

const TezosWallet = new Wallet();

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined', { stream: accessLog }));

const requestSpec: RequestParameters = {
    id: 'string',
    data: {
        id: 'string',
        oracleAddress: 'string',
        parameters: {
            price: 'number',
        },
    },
};

// API Routes
app.post('/', async (req, res) => {
    const requestParams = req.body;
    Logger.debug(`Received request: (body: ${JSON.stringify(requestParams)}`);
    try {
        // Validate the request before proceeding
        Validator.validateRequest(requestSpec, requestParams);

        const requestId = requestParams.data.id;
        const address = requestParams.data.oracleAddress;
        const parameters = requestParams.data.parameters;

        // Call Wallet
        const operation = await TezosWallet.callContract(address, requestId, parameters);

        onSuccess(res, operation, requestParams.id);
    } catch (e) {
        Logger.error(e);
        onError(res, e, requestParams.id);
    }
});

const onSuccess = (res: express.Response, data: TransactionOperation, jobRunID: string) => {
    res.status(200).json({
        jobRunID,
        data: {
            result: data.hash,
        },
        result: data.hash,
        statusCode: 200,
    });
};

const onError = (res: express.Response, error: GenericError, jobRunID: string) => {
    res.status(500).json({
        jobRunID,
        status: 'errored',
        error: {
            name: error.name,
            message: error.message,
            errors: error.errors || [],
        },
        statusCode: 500,
    });
};

export default app;
