export default {
    get: async (path: string) => {
        if (process.env.PRICE_SOURCE === "KRAKEN") {
            return {
                data: {
                    result: {
                        "XTZEUR": {
                            a: [20]
                        }
                    }
                }
            }
        }

        return {
            data: {
                data: {
                    amount: 20
                }
            }
        }
    }
}
