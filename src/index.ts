import Server from './services/Server';

[EnvironmentKeys.SECRET_KEY, EnvironmentKeys.TEZOS_RPC].forEach(env => {
    if (!process.env[env]) {
        console.error(`\n[ERROR] - Environment variable \x1b[33m${env}\x1b[0m is missing, add it to .env and try again.\n\n`);
        process.exit(1);
    }
});

const port = parseInt(process.env.PORT, 10) || 3000;
Server.listen(port, () => {
    console.log('Using RPC:', process.env.TEZOS_RPC);
    console.log(`Listening on port \x1b[33m${port}\x1b[0m!`);
});
