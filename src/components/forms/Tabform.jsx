import ERC20abi from '@/lib/abi/Ecr20ABI';
import { useWalletStore } from '@/store/walletStore';
import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';

const TabContent = ({ title, amount, setAmount, address, setAddress, handleSubmit, isLoading }) => (
  <div className="flex bg-white/10 items-center justify-center w-full">
    <div className="w-full p-8 space-y-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-yellow-500">ETH</label>
          <input
            type="number" id="amount" value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-sm border bg-gray-200"
            placeholder="00.00 ETH" required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-yellow-500">RBO</label>
          <input
            id="address" value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-sm border bg-gray-200"
            placeholder="00.00 RBO" required
          />
        </div>
        <button type="submit" className="w-full font-bold py-2 mt-4 text-white bg-yellow-500">
          {isLoading
            ? <Loader className="text-white animate-spin mx-auto" size={34} />
            : 'Mint'}
        </button>
      </form>
    </div>
  </div>
);

const TabContainer = () => {
  const [activeTab, setActiveTab]   = useState('presale');
  const [amount, setAmount]         = useState('');
  const [address, setAddress]       = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const { callTransactionFunction } = useWalletStore();

  const presaleAddress = import.meta.env.VITE_PRESALE_CONTRACT_ADDRESS;
  const airdropAddress = import.meta.env.VITE_AIRDROP_CONTRACT_ADDRESS;
  const stakeAddress   = import.meta.env.VITE_STAKE_CONTRACT_ADDRESS;

  useEffect(() => {
    const map = { presale: presaleAddress, airdrop: airdropAddress, stake: stakeAddress };
    setAddress(map[activeTab] || '');
  }, [activeTab, presaleAddress, airdropAddress, stakeAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const tx = await callTransactionFunction(
        import.meta.env.VITE_ERC20_CONTRACT_ADDRESS,
        ERC20abi,
        'mint',
        address,
        amount,
      );
      console.log('tx:', tx);
    } catch (error) {
      console.error('Error in transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { key: 'presale', label: 'Fund Presale' },
    { key: 'airdrop', label: 'Fund Airdrop' },
    { key: 'stake',   label: 'Fund Stake'   },
  ];

  return (
    <div className="container mx-auto p-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`px-4 py-2 font-semibold ${activeTab === key ? 'text-yellow-500' : 'text-gray-200'}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <TabContent
        title={tabs.find((t) => t.key === activeTab)?.label}
        amount={amount}
        setAmount={setAmount}
        address={address}
        setAddress={setAddress}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TabContainer;
