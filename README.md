# Chainlink External Adapter For Tezos

![CI](https://github.com/RomarQ/chainlink-tezos-adapter-js/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/RomarQ/chainlink-tezos-adapter-js/badge.svg?t=a5lpIZ)](https://coveralls.io/github/RomarQ/chainlink-tezos-adapter-js)

This repository contains boilerplate code that can be used as a chainlink external adapter to interact with the Tezos blockchain.

## Requirements

| Requirement |  version  |
|:-----------:|:---------:|
| NodeJs      | >= v10.x  |

<br/>

## Run the adapter
```sh
# Clone the repository
git clone ...
# Install all dependencies
yarn
# Build the project
yarn build
# Configure environment variables
echo "
PORT=<...> // Optional: (3000 is the default)
SECRET_KEY=<...>
TEZOS_RPC=<...>
" > .env
# Start the adapter
yarn start
```

<br/>

## Expected Body Parameters
```ts
{
    "id": string,         // The job run identifier,
    "data": {
        "id"                : string, // Request identifier
        "oracleAddress"     : string, // (e.g. "KT1..."),
        "parameters"        : {
            price: int // (e.g. 300),
        },
    }
}
```
<br/>

## References
[Chainlink Docs](https://docs.chain.link/docs)

[smartcontractkit/tezos-adapter-py](https://github.com/smartcontractkit/tezos-adapter-py)

[smartcontractkit/external-initiator](https://github.com/smartcontractkit/external-initiator)

[SmartPy Oracle Template](https://smartpy.io/dev/index.html?template=oracle.py)

<img height="48" href="https://smartpy.io" src="https://smartpy.io/static/img/logo.png">
