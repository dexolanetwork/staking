import { useEffect, useState } from 'react';
import TabContainer from '@/components/forms/Tabform';
import PresaleStepsTimeline from '@/components/PresaleTimeline';
import ERC20abi from '@/lib/abi/Ecr20ABI';
import { formatNumber } from '@/lib/utils';
import { useWalletStore } from '@/store/walletStore';
import { ethers } from 'ethers';

const Dashboard = () => {
  const { callReadOnlyFunction } = useWalletStore();
  const [presaleBalance, setPresaleBalance] = useState(0);
  const [airdropBalance, setAirdropBalance] = useState(0);
  const [stakeBalance,   setStakeBalance]   = useState(0);
  const [participant,    setParticipant]    = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api');
        const data     = await response.json();
        setParticipant(data.length);
      } catch (e) {
        console.error('Failed to fetch participants:', e);
      }

      try {
        const pre = await callReadOnlyFunction(ERC20abi, import.meta.env.VITE_ERC20_CONTRACT_ADDRESS, 'balanceOf', import.meta.env.VITE_PRESALE_CONTRACT_ADDRESS);
        setPresaleBalance(ethers.formatUnits(pre, 18));
      } catch (e) { console.error('presale balance:', e); }

      try {
        const air = await callReadOnlyFunction(ERC20abi, import.meta.env.VITE_ERC20_CONTRACT_ADDRESS, 'balanceOf', import.meta.env.VITE_AIRDROP_CONTRACT_ADDRESS);
        setAirdropBalance(ethers.formatUnits(air, 18));
      } catch (e) { console.error('airdrop balance:', e); }

      try {
        // Fixed: was VITE_ERC20__CONTRACT_ADDRESS (double underscore typo)
        const stake = await callReadOnlyFunction(ERC20abi, import.meta.env.VITE_ERC20_CONTRACT_ADDRESS, 'balanceOf', import.meta.env.VITE_STAKE_CONTRACT_ADDRESS);
        setStakeBalance(ethers.formatUnits(stake, 18));
      } catch (e) { console.error('stake balance:', e); }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <section className="lg:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden">
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-0">
            <h2 className="text-5xl font-bold text-white">RBO — Dashboard</h2>
            <p className="text-xl text-gray-200">
              Rabbito is a blockchain platform designed for changemakers, innovators, and visionaries,
              offering tools and technologies to drive positive global transformation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                [formatNumber(Math.round(presaleBalance)), 'Presale RBO'],
                [formatNumber(Math.round(airdropBalance)), 'Airdrop RBO'],
                [formatNumber(Math.round(parseInt(stakeBalance))), 'Total Stake'],
              ].map(([val, label]) => (
                <div key={label} className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                  <h3 className="text-2xl font-semibold text-yellow-400">{val}</h3>
                  <p className="text-gray-200">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                ['30M+',        ''],
                [participant,   'Airdrop Participants'],
                ['$0.001',      'Minimum Buy'],
              ].map(([val, label]) => (
                <div key={label || val} className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                  <h3 className="text-2xl font-semibold text-yellow-400">{val}</h3>
                  <p className="text-gray-200">{label}</p>
                </div>
              ))}
            </div>

            <PresaleStepsTimeline />
          </div>
        </div>

        <div className="lg:w-1/4">
          <TabContainer />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
