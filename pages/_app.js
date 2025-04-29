import '../styles/globals.css';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }) {
    // You can set the network here (mainnet, devnet, testnet)
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', [network]);

    // Configure wallets to use
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <Component {...pageProps} />
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default MyApp;
