import { useEffect, useState } from 'react';
import { useWalletStore } from '@/store/walletStore';
import StakeAbi from '@/lib/abi/StakeAbi';
import Staking from '@/components/Staking';

const StakePage = () => {
  const { callReadOnlyFunction, walletAddress } = useWalletStore();
  const [currentReward, setCurrentReward] = useState(null);
  const [stakedAmount,  setStakedAmount]  = useState(null);

  useEffect(() => {
    if (!walletAddress) return;
    const fetch = async () => {
      try {
        const reward = await callReadOnlyFunction(StakeAbi, import.meta.env.VITE_STAKE_CONTRACT_ADDRESS, 'getCurrentReward', walletAddress);
        const amount = await callReadOnlyFunction(StakeAbi, import.meta.env.VITE_STAKE_CONTRACT_ADDRESS, 'stakedAmount', walletAddress);
        setCurrentReward(reward);
        setStakedAmount(amount);
      } catch (e) {
        console.error('Failed to fetch stake data:', e);
      }
    };
    fetch();
  }, [walletAddress]);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
      <section className="lg:flex max-w-[90rem] mx-auto items-center justify-center py-24 min-h-screen relative overflow-hidden">
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="text-5xl font-bold text-white">RBO — Stake Your Tokens</h2>
            <p className="text-xl text-gray-200">
              Secure your future by staking your tokens in our platform. Choose your staking plan
              and earn rewards based on your commitment!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                ['100M+', 'Total Stake'],
                ['20%',   'Reward %'],
                [stakedAmount ?? '0', 'Your Stake Amount'],
              ].map(([val, label]) => (
                <div key={label} className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                  <h3 className="text-2xl font-semibold text-yellow-400">{String(val)}</h3>
                  <p className="text-gray-200">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                [currentReward ?? '0', 'Stake Reward'],
                ['30 Days',            'Min. Period'],
                ['1000',               'Minimum'],
              ].map(([val, label]) => (
                <div key={label} className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                  <h3 className="text-2xl font-semibold text-yellow-400">{String(val)}</h3>
                  <p className="text-gray-200">{label}</p>
                </div>
              ))}
            </div>

            <p className="text-xl text-gray-200 mt-8">
              By staking, you lock your tokens into our platform and earn rewards based on your
              selected plan duration. Check your rewards after the staking period ends.
            </p>
          </div>
        </div>

        <div className="lg:w-2/4">
          <Staking />
        </div>
      </section>
    </div>
  );
};

export default StakePage;
