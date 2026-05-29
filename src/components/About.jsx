import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Blocks, DollarSign, Shield, Users } from 'lucide-react';

const tokenDetails = [
  {
    icon: <Blocks size={32} className="mb-6 text-purple-600" />,
    title: 'Blockchain Technology',
    description:
      'Our token is powered by Ethereum, one of the most secure and decentralized blockchains, ensuring trust and security for all transactions.',
  },
  {
    icon: <DollarSign size={32} className="mb-6 text-purple-600" />,
    title: 'Affordable Price',
    description:
      'At a competitive presale price of $0.10, RBO is designed to be accessible for everyone, whether you\'re a small investor or a large backer.',
  },
  {
    icon: <Shield size={32} className="mb-6 text-purple-600" />,
    title: 'Security',
    description:
      'Built with top-tier security protocols, RBO ensures safe transactions and storage for all users, with smart contract auditing and decentralised governance.',
  },
  {
    icon: <Users size={32} className="mb-6 text-purple-600" />,
    title: 'Community Driven',
    description:
      'We believe in community involvement. Token holders can vote on key decisions, making RBO a truly decentralised and community-driven project.',
  },
];

const AboutSection = () => (
  <div id="about" className="bg-purple-200">
    <div className="container py-24 sm:py-32 mx-auto px-2">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        {/* Header */}
        <div className="text-center lg:text-left w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
            Revolutionizing the Crypto Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            RBO (Rabbito) is a next-generation cryptocurrency designed to enhance the digital economy.
            From seamless payments to secure governance, it offers everything the crypto community needs —
            and bridges directly into real-world e-commerce utility.
          </p>
        </div>

        {/* Token Details Grid */}
        <div className="grid lg:grid-cols-2 gap-6 w-full">
          {tokenDetails.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number hover:shadow-lg relative overflow-hidden border border-transparent hover:border-purple-600/20 animate-border"
            >
              <div className="absolute inset-0 border-2 border-transparent group-hover/number:border-purple-600/50 rounded-lg animate-border-inner" />
              <CardHeader>
                <div className="flex justify-between items-center">
                  {icon}
                  <span className="text-5xl bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
