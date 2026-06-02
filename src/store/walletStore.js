'use client';
import { create } from 'zustand';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { handleError } from '@/lib/handleCustomErr';

// Provider options — only MetaMask injected provider (no CJS packages needed).
// WalletConnect v1 is deprecated; MetaMask covers the majority of users.
// Add additional providers here once WalletConnect v2 SDK is integrated.
const providerOptions = {};

const getPersistedWallet = () => {
  if (typeof window === 'undefined') return { walletAddress: null, contractAddress: null };
  return {
    walletAddress: localStorage.getItem('walletAddress') || null,
    contractAddress: localStorage.getItem('contractAddress') || null,
  };
};

export const useWalletStore = create((set, get) => {
  const { walletAddress, contractAddress } = getPersistedWallet();

  return {
    provider:      null,
    storeErr:      null,
    contract:      contractAddress || null,
    walletAddress: walletAddress   || null,
    CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || '',

    setContract:      (c)   => set({ contract: c }),
    setProvider:      (p)   => set({ provider: p }),
    setWalletAddress: (a)   => set({ walletAddress: a }),
    clearError:       ()    => set({ storeErr: null }),

    // ── Connect wallet ────────────────────────────────────────────────────────
    connectWallet: async (CONTRACT_ABI, CONTRACT_ADDRESS) => {
      set({ storeErr: null });
      const { walletAddress } = get();
      if (walletAddress) return;

      try {
        if (!CONTRACT_ADDRESS) throw new Error('Contract address is not defined.');

        const modal = new Web3Modal({ cacheProvider: true, providerOptions });
        const instance      = await modal.connect();
        const web3Provider  = new ethers.BrowserProvider(instance);
        const signer        = await web3Provider.getSigner();
        const address       = await signer.getAddress();

        const newContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        set({ provider: web3Provider, walletAddress: address, contract: newContract });

        localStorage.setItem('walletAddress',   address);
        localStorage.setItem('contractAddress', CONTRACT_ADDRESS);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        set({ storeErr: error.message || 'Failed to connect wallet.' });
      }
    },

    // ── State-changing tx ─────────────────────────────────────────────────────
    callTransactionFunction: async (CONTRACT_ADDRESS, CONTRACT_ABI, methodName, ...params) => {
      set({ storeErr: null });

      try {
        const modal        = new Web3Modal({ cacheProvider: true, providerOptions });
        const instance     = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer       = await web3Provider.getSigner();
        const address      = await signer.getAddress();

        set({ provider: web3Provider, walletAddress: address });
        localStorage.setItem('walletAddress',   address);
        localStorage.setItem('contractAddress', CONTRACT_ADDRESS);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const tx       = await contract[methodName](...params);
        console.log(`Transaction sent: ${tx.hash ?? tx}`);
        return { success: true, msg: tx };
      } catch (error) {
        const msg = handleError(error);
        console.error('callTransactionFunction error:', msg);
        set({ storeErr: msg });
        return { success: false, msg };
      }
    },

    // ── Send ETH to contract ──────────────────────────────────────────────────
    sendEtherToContract: async (CONTRACT_ADDRESS, CONTRACT_ABI, methodName, amountInEther, ...params) => {
      set({ storeErr: null });

      try {
        const modal        = new Web3Modal({ cacheProvider: true, providerOptions });
        const instance     = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer       = await web3Provider.getSigner();
        const address      = await signer.getAddress();

        set({ provider: web3Provider, walletAddress: address });
        localStorage.setItem('walletAddress',   address);
        localStorage.setItem('contractAddress', CONTRACT_ADDRESS);

        const contract    = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const amountInWei = BigInt(Math.floor(parseFloat(amountInEther) * 10 ** 18));
        const tx          = await contract[methodName](...params, { value: amountInWei });
        const receipt     = await tx.wait();
        console.log(`Transaction mined: ${receipt.transactionHash}`);
        return { success: true, msg: receipt, hash: tx.hash };
      } catch (error) {
        const msg = handleError(error);
        console.error('sendEtherToContract error:', msg);
        set({ storeErr: msg });
        return { success: false, msg };
      }
    },

    // ── Read-only (with signer for wallet-gated reads) ────────────────────────
    callReadOnlyFunction: async (CONTRACT_ABI, CONTRACT_ADDRESS, methodName, ...params) => {
      set({ storeErr: null });

      try {
        const modal        = new Web3Modal({ cacheProvider: true, providerOptions });
        const instance     = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer       = await web3Provider.getSigner();
        const address      = await signer.getAddress();

        set({ provider: web3Provider, walletAddress: address });

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        if (typeof contract[methodName] !== 'function') {
          throw new Error(`Method ${methodName} not found on contract.`);
        }

        const result = await contract[methodName](...params);
        return result;
      } catch (error) {
        console.error('callReadOnlyFunction error:', error);
        set({ storeErr: error.message });
      }
    },

    // ── Read-only with RPC provider (no wallet needed) ────────────────────────
    callReadOnlyFunctionWithRpc: async (CONTRACT_ABI, CONTRACT_ADDRESS, methodName, ...params) => {
      set({ storeErr: null });

      try {
        const rpcUrl   = import.meta.env.VITE_RPC_URL;
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const result   = await contract[methodName](...params);
        return result;
      } catch (error) {
        console.error('callReadOnlyFunctionWithRpc error:', error);
        set({ storeErr: error.message });
      }
    },

    // ── Disconnect ────────────────────────────────────────────────────────────
    disconnectWallet: () => {
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('contractAddress');
      set({ provider: null, contract: null, walletAddress: null, storeErr: null });
    },
  };
});
