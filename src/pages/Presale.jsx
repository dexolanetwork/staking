import { useState } from 'react';
import LoginForm from '@/components/forms/Textbox';
import PresaleStepsTimeline from '@/components/PresaleTimeline';

const Presale = () => {
  const [amountInEther, setAmountInEther] = useState('');
  const [amountInRBO,   setAmountInRBO]   = useState('');

  return (
    <div>
      <section className="lg:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden">
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="text-5xl font-bold text-white">RBO — Be an Early Bird</h2>
            <p className="text-xl text-gray-200">
              Rabbito is a blockchain platform designed for changemakers, innovators, and visionaries,
              offering the tools and technologies needed to unlock opportunities for the many, not just
              the few, and drive positive global transformation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                ['100M+', 'Total Supply'],
                ['0.50',  'Listing Price'],
                ['$0.001','Presale Price'],
              ].map(([val, label]) => (
                <div key={label} className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                  <h3 className="text-2xl font-semibold text-yellow-400">{val}</h3>
                  <p className="text-gray-200">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                ['30M+', 'Presale Target'],
                ['40M+', 'Total Sold'],
                ['$5',   'Minimum Buy'],
              ].map(([val, label]) => (
                <div key={label} className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                  <h3 className="text-2xl font-semibold text-yellow-400">{val}</h3>
                  <p className="text-gray-200">{label}</p>
                </div>
              ))}
            </div>

            <PresaleStepsTimeline />
          </div>
        </div>

        <div className="lg:w-2/5 mr-8">
          <LoginForm
            amountInEther={amountInEther}
            setAmountInEther={setAmountInEther}
            amountInRBO={amountInRBO}
            setAmountInRBO={setAmountInRBO}
          />
        </div>
      </section>
    </div>
  );
};

export default Presale;
