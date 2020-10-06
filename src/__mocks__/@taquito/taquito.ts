export const Tezos = {
    setSignerProvider: (signer: string) => null,
    setRpcProvider: (rpc: string) => null,

    contract: {
        at: async (address: string) => {
            return {
                methods: {
                    fulfill_request: () => ({
                        send: async () => ({ hash: 'DUMMY' }),
                    }),
                },
            };
        },
    },
};
