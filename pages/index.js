import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet as useSolWallet } from '@solana/wallet-adapter-react';

export default function Home() {
  // Ethereum wallet state
  const [ethProvider, setEthProvider] = useState(null);
  const [ethAccount, setEthAccount] = useState(null);

  // Solana wallet state
  const solWallet = useSolWallet();
  const { connection } = useConnection();

  // Connect to Ethereum wallets (MetaMask, TrustWallet)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setEthProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  const connectEthWallet = async () => {
    if (!ethProvider) {
      alert('No Ethereum wallet found. Please install MetaMask or TrustWallet.');
      return;
    }
    try {
      const accounts = await ethProvider.send('eth_requestAccounts', []);
      setEthAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Simple Wallet Connect</h1>

      {/* Ethereum Wallet Connect */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Ethereum Wallets</h2>
        {ethAccount ? (
          <p className="text-green-600">Connected: {ethAccount}</p>
        ) : (
          <button
            onClick={connectEthWallet}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Connect MetaMask / TrustWallet
          </button>
        )}
      </div>

      {/* Solana Wallet Connect */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Solana Wallet</h2>
        <WalletMultiButton />
        {solWallet.connected && (
          <p className="mt-2 text-green-600">Connected: {solWallet.publicKey.toBase58()}</p>
        )}
      </div>
    </div>
  );
}
