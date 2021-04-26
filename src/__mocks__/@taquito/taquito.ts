export * from '@taquito/taquito'

export class TezosToolkit {
    public setSignerProvider = (signer: string) => null;
    public setRpcProvider = (rpc: string) => null;

    public contract = {
        at: async (address: string) => {
            return {
                methods: {
                    fulfill_request: () => ({
                        send: async () => ({ hash: 'DUMMY' }),
                    }),
                },
            };
        },
    }
};
