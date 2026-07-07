# RBO — Rabbito DeFi Staking Platform

> **Real-world utility meets decentralised finance.**  
> Stake tokens. Earn rewards. Spend in the ecosystem.

---

## Overview

RBO (Rabbito) is a blockchain-integrated DeFi staking platform designed for changemakers, innovators, and visionaries. Beyond yield generation, RBO tokens carry genuine purchasing power within our integrated e-commerce ecosystem — creating real-world demand that goes far beyond speculation.

Users can:

- **Stake** RBO tokens across flexible lock-up plans to earn passive rewards
- **Buy tokens** in the presale at an early-bird price before exchange listing
- **Claim airdrops** by completing social engagement tasks
- **Spend** earned tokens on the integrated e-commerce site for purchases, discounts, loyalty rewards, and exclusive product drops

---

## Tech Stack

| Layer           | Technology                                                                |
| --------------- | ------------------------------------------------------------------------- |
| Frontend        | [React 19](https://react.dev) + [Vite 5](https://vitejs.dev)              |
| Routing         | [React Router v6](https://reactrouter.com)                                |
| Styling         | [Tailwind CSS v3](https://tailwindcss.com)                                |
| State           | [Zustand v5](https://zustand-demo.pmnd.rs)                                |
| Blockchain      | [ethers.js v6](https://docs.ethers.org/v6/)                               |
| Wallet          | [Web3Modal v1](https://github.com/WalletConnect/web3modal)                |
| UI Components   | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) |
| Charts          | [Chart.js v4](https://www.chartjs.org) + react-chartjs-2                  |
| Animation       | [Framer Motion](https://www.framer.com/motion/)                           |
| Smart Contracts | Solidity (ERC-20, Staking, Presale, Airdrop)                              |

---

## Project Structure

```
rbo-staking/
├── contracts/               # Solidity smart contracts
│   ├── Erc20.sol
│   ├── Staking.sol
│   ├── PreSale.sol
│   └── Airdrop.sol
├── public/
│   └── images/              # Static assets
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives (Card, Accordion, Bgline)
│   │   ├── forms/           # Textbox, Tabform, AppProgress
│   │   ├── About.jsx
│   │   ├── Faq.jsx
│   │   ├── Glowtext.jsx
│   │   ├── HeroPage.jsx
│   │   ├── NavBar.jsx
│   │   ├── PresaleTimeline.jsx
│   │   ├── Staking.jsx
│   │   ├── TimeLine.jsx
│   │   └── TokenNomics.jsx
│   ├── lib/
│   │   ├── abi/             # Contract ABIs (ERC20, Stake, Presale, Airdrop)
│   │   ├── db.js            # In-memory airdrop data
│   │   ├── handleCustomErr.js
│   │   └── utils.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Presale.jsx
│   │   ├── Stake.jsx
│   │   ├── Airdrop.jsx
│   │   └── Dashboard.jsx
│   ├── store/
│   │   └── walletStore.js   # Zustand wallet + contract state
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dexola-tech/staking.git
cd staking

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Pages

| Route        | Description                                           |
| ------------ | ----------------------------------------------------- |
| `/`          | Landing page — Hero, About, Tokenomics, Roadmap, FAQ  |
| `/presale`   | Token presale — buy RBO at early-bird price           |
| `/stake`     | Staking dashboard — choose a plan, stake, unstake     |
| `/airdrop`   | Airdrop tasks — complete social tasks to claim        |
| `/dashboard` | Admin dashboard — monitor balances and fund contracts |

---

## Smart Contracts

| Contract      | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `Erc20.sol`   | Standard ERC-20 token with minting                       |
| `Staking.sol` | Lock tokens for 30 / 90 / 180 days to earn 10 / 20 / 35% |
| `PreSale.sol` | Accept ETH and distribute RBO at presale rate            |
| `Airdrop.sol` | Distribute tokens to whitelisted wallets                 |

---

## Staking Plans

| Plan     | Lock Period | Reward |
| -------- | ----------- | ------ |
| Basic    | 30 days     | 10%    |
| Standard | 90 days     | 20%    |
| Premium  | 180 days    | 35%    |

Staking requires two transactions: **approve** (ERC-20 allowance) then **stake**. Both are handled automatically by the UI.

---

## Roadmap

### Phase 1 — Presale & Token Launch

- Token presale at $0.001 per RBO
- ERC-20 contract deployment and audit
- Listing on major exchanges at $0.50

### Phase 2 — DeFi Staking Platform v1

- Core staking functionality live
- Three lock-up tiers with fixed APY
- Ecosystem integration and community governance

### Phase 3 — E-Commerce Integration

- RBO becomes spendable on the integrated e-commerce site
- Token-gated discounts and loyalty rewards
- Exclusive product drops for stakers

### Phase 4 — Multi-Chain Expansion

- Rust-based components for high-throughput performance
- Multi-chain architecture (Polygon, Arbitrum, BNB Chain)
- Cross-chain interoperability and bridging

---

## Tokenomics

| Category  | Allocation |
| --------- | ---------- |
| Presale   | 40%        |
| Team      | 20%        |
| Marketing | 15%        |
| Liquidity | 15%        |
| Advisors  | 10%        |

| Metric        | Value           |
| ------------- | --------------- |
| Total Supply  | 100,000,000 RBO |
| Presale Price | $0.10           |
| Listing Price | $0.15           |
| Hard Cap      | $5,000,000      |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a pull request

Please follow conventional commits and ensure all components remain UI-consistent.

---

## License

This project is licensed under the terms found in [LICENSE.md](./LICENSE.md).

---

## Contact

For partnership enquiries, technical questions, or community support, reach out via the social channels listed on the Airdrop page or open an issue in this repository.

---
