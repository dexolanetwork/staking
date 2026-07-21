import { useState } from 'react';
import { useWalletStore } from '@/store/walletStore';
import StakeAbi from '@/lib/abi/StakeAbi';
import ERC20abi from '@/lib/abi/Ecr20ABI';

const PLANS = [
  { key: 'OneMonth',    label: '30 Days',  reward: '10% Rewards', period: 0 },
  { key: 'ThreeMonths', label: '90 Days',  reward: '20% Rewards', period: 1 },
  { key: 'SixMonths',   label: '180 Days', reward: '35% Rewards', period: 2 },
];

const Staking = () => {
  const [stakeAmount,   setStakeAmount]   = useState('');
  const [selectedPlan,  setSelectedPlan]  = useState('OneMonth');
  const [error,         setError]         = useState('');
  const [planError,     setPlanError]     = useState('');

  const { callTransactionFunction, connectWallet, disconnectWallet, walletAddress } = useWalletStore();

  const handleStakeAmount = (e) => {
    setStakeAmount(e.target.value);
    if (e.target.value > 0) setError('');
  };

  const handleApprove = async () => {
    await callTransactionFunction(
      import.meta.env.VITE_ERC20_CONTRACT_ADDRESS,
      ERC20abi,
      'approve',
      import.meta.env.VITE_STAKE_CONTRACT_ADDRESS,
      stakeAmount,
    );
  };

  const handleStake = async () => {
    if (!walletAddress) { setError('Please connect your wallet first.'); return; }
    if (!stakeAmount || stakeAmount <= 0) { setError('Please enter a valid stake amount.'); return; }

    const plan = PLANS.find((p) => p.key === selectedPlan);
    if (!plan) { setPlanError('Invalid staking period selected.'); return; }

    await handleApprove();
    const tx = await callTransactionFunction(
      import.meta.env.VITE_STAKE_CONTRACT_ADDRESS,
      StakeAbi,
      'stake',
      stakeAmount,
      plan.period,
    );
    console.log({ tx });
  };

  const handleEarly = async () => {
    const tx = await callTransactionFunction(
      import.meta.env.VITE_STAKE_CONTRACT_ADDRESS,
      StakeAbi,
      'earlyUnstake',
    );
    console.log({ tx });
  };

  const handleConnect    = () => connectWallet(StakeAbi, import.meta.env.VITE_STAKE_CONTRACT_ADDRESS);
  const handleDisconnect = () => disconnectWallet();

  return (
    <div>
      <div className="text-center text-white px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Amount Input */}
          <div className="mt-8">
            <input
              type="number"
              value={stakeAmount}
              onChange={handleStakeAmount}
              placeholder="Enter amount to stake"
              className="bg-white/10 p-4 rounded-lg backdrop-blur-md text-white border border-gray-500 w-full text-lg ring-amber-300"
            />
            <span className="text-sm text-yellow-300">{error}</span>
          </div>

          {/* Staking Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {PLANS.map(({ key, label, reward }) => (
              <div
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 ${selectedPlan === key ? 'border-2 border-yellow-400' : ''}`}
              >
                <h3 className="text-2xl font-semibold text-yellow-400">{label}</h3>
                <p className="text-gray-200">Earn {reward}</p>
              </div>
            ))}
          </div>
          <span className="text-sm text-yellow-300">{planError}</span>

          {/* Connect/Disconnect */}
          <div className="mt-8">
            <button
              onClick={walletAddress ? handleDisconnect : handleConnect}
              className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
            >
              {walletAddress || 'Connect Wallet'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-8">
            <button
              onClick={handleEarly}
              className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
            >
              Unstake Tokens
            </button>
            <button
              onClick={handleStake}
              className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
            >
              Stake Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
