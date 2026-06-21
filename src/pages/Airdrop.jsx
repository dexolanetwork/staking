import { useEffect, useState } from 'react';
import { useWalletStore } from '@/store/walletStore';
import ERC20abi from '@/lib/abi/Ecr20ABI';

const SOCIAL_TASKS = [
  { key: 'twitter',   image: '/images/t.png',  label: 'Twitter',   url: 'https://twitter.com/YourHandle' },
  { key: 'facebook',  image: '/images/f.png',  label: 'Facebook',  url: 'https://facebook.com/YourFacebook' },
  { key: 'instagram', image: '/images/i.png',  label: 'Instagram', url: 'https://instagram.com/YourInstagram' },
  { key: 'telegram',  image: '/images/te.png', label: 'Telegram',  url: 'https://t.me/YourTelegramGroup' },
  { key: 'youtube',   image: '/images/y.png',  label: 'YouTube',   url: 'https://youtube.com/YourYouTube' },
  { key: 'discord',   image: '/images/d.png',  label: 'Discord',   url: 'https://discord.com/YourDiscord' },
];

const AirDrop = () => {
  const { walletAddress, connectWallet } = useWalletStore();
  const [taskCompletion, setTaskCompletion] = useState({
    twitter: false, facebook: false, instagram: false,
    telegram: false, youtube: false, discord: false,
  });

  useEffect(() => {
    if (!walletAddress) return;
    fetch(`/api/airdrop?walletAddress=${walletAddress}`)
      .then((r) => r.json())
      .then((data) => { if (data.tasks) setTaskCompletion(data.tasks); })
      .catch(console.error);
  }, [walletAddress]);

  const handleTaskClick = async (task, url) => {
    if (!walletAddress) { handleConnect(); return; }
    if (taskCompletion[task]) return;

    window.open(url, '_blank');
    const updatedTasks = { ...taskCompletion, [task]: true };
    setTaskCompletion(updatedTasks);

    await fetch('/api/airdrop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, tasks: updatedTasks }),
    });
  };

  const handleConnect = () => connectWallet(ERC20abi, import.meta.env.VITE_ERC20_CONTRACT_ADDRESS);

  return (
    <div>
      <section className="lg:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden">
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="text-5xl font-bold text-white">RBO — Be an Early Bird</h2>
            <p className="text-xl text-gray-200">
              Rabbito is a blockchain platform designed for changemakers, innovators, and visionaries,
              offering tools to unlock opportunities for the many, not just the few.
            </p>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {SOCIAL_TASKS.slice(0, 3).map(({ key, image, label, url }) => (
                <div
                  key={key}
                  onClick={() => handleTaskClick(key, url)}
                  className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${taskCompletion[key] ? 'bg-gray-600 pointer-events-none' : ''}`}
                >
                  <img src={image} alt={label} className="w-16 h-16 object-contain" />
                  {taskCompletion[key] && <span className="text-green-500 ml-4">Done</span>}
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {SOCIAL_TASKS.slice(3).map(({ key, image, label, url }) => (
                <div
                  key={key}
                  onClick={() => handleTaskClick(key, url)}
                  className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${taskCompletion[key] ? 'bg-gray-600 pointer-events-none' : ''}`}
                >
                  <img src={image} alt={label} className="w-16 h-16 object-contain" />
                  {taskCompletion[key] && <span className="text-green-500 ml-4">Done</span>}
                </div>
              ))}
            </div>

            {/* Claim Button */}
            <div className="mt-8">
              <button
                className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
                onClick={walletAddress ? () => alert('All tasks have been completed!') : handleConnect}
              >
                {walletAddress ? 'Claim Airdrop' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirDrop;
