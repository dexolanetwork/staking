import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const tokenDistribution = {
  labels: ['Presale', 'Team', 'Advisors', 'Marketing', 'Liquidity'],
  datasets: [
    {
      label: 'Token Distribution',
      data: [40, 20, 10, 15, 15],
      backgroundColor: ['#D8B4FE', '#3B82F6', '#FFB6C1', '#6366F1', '#8B5CF6'],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const total = tooltipItem.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const pct   = ((tooltipItem.raw / total) * 100).toFixed(2);
          return `${tooltipItem.label}: ${pct}%`;
        },
      },
    },
  },
};

const Tokenomics = () => (
  <section className="py-16 bg-gray-50" id="tokenomics">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-indigo-900 mb-8">Tokenomics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Chart */}
        <div className="w-full max-w-md mx-auto">
          <Doughnut data={tokenDistribution} options={options} />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="hover:bg-white p-6 rounded-lg shadow-lg bg-purple-50">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-4">Token Distribution</h3>
            <ul className="space-y-3">
              {[
                ['Presale',   '40%'],
                ['Team',      '20%'],
                ['Advisors',  '10%'],
                ['Marketing', '15%'],
                ['Liquidity', '15%'],
              ].map(([label, pct]) => (
                <li key={label} className="flex items-center justify-between">
                  <span className="text-gray-700">{label}</span>
                  <span className="font-bold text-indigo-900">{pct}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hover:bg-white p-6 rounded-lg shadow-lg bg-purple-50">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-4">Token Metrics</h3>
            <ul className="space-y-3">
              {[
                ['Total Supply',   '100,000,000'],
                ['Presale Price',  '$0.10'],
                ['Listing Price',  '$0.15'],
                ['Hard Cap',       '$5,000,000'],
              ].map(([label, val]) => (
                <li key={label} className="flex items-center justify-between">
                  <span className="text-gray-700">{label}</span>
                  <span className="font-bold text-indigo-900">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Tokenomics;
