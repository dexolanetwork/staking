import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqData = [
  {
    question: 'What is RBO (Rabbito)?',
    answer:
      'RBO is a utility token built on the Ethereum blockchain, designed to revolutionize the digital economy and power a blockchain-integrated e-commerce ecosystem with real-world purchasing utility.',
  },
  {
    question: 'How can I participate in the presale?',
    answer:
      'Connect your wallet on the Presale page, enter the amount of ETH you wish to spend, and confirm the transaction. Early backers receive exclusive bonuses!',
  },
  {
    question: 'What is the total supply of RBO?',
    answer:
      'The total supply of RBO is 100,000,000 tokens. A portion is allocated for presale, staking rewards, airdrop, partnerships, and community incentives.',
  },
  {
    question: 'How is RBO secured?',
    answer:
      'RBO is built on Ethereum — one of the most secure and decentralized networks. Smart contracts have been audited by leading security firms.',
  },
  {
    question: 'Can I stake RBO?',
    answer:
      'Yes! Stake RBO to earn rewards across three plans: 30 days (10%), 90 days (20%), or 180 days (35%). The longer you commit, the greater your yield.',
  },
  {
    question: 'What real-world utility does RBO have?',
    answer:
      'RBO tokens can be used directly in our integrated e-commerce platform for purchases, discounts, loyalty rewards, and exclusive product drops — creating genuine demand for the token beyond speculation.',
  },
];

const FAQSection = () => (
  <section
    id="faq"
    className="py-24 sm:py-32 mx-auto px-4 md:px-8 bg-purple-100 relative bg-no-repeat bg-cover z-0 bg-center"
    style={{ backgroundImage: 'url(/images/bg.jpg)' }}
  >
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Find answers to common questions about RBO, the presale, staking, and the project roadmap.
      </p>
    </div>

    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqData.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors duration-200">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm mt-2">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQSection;
