export const mockRewardsData = {
  tipAmount: 0.05,
  tipCurrency: 'ETH',
  donationGoal: 1000,
  donationCurrency: 'USDC',
  rewardTiers: [
    { amount: 5, reward: '24-hour early access' },
    { amount: 20, reward: 'Exclusive digital badge' },
    { amount: 50, reward: 'Mention in credits' },
    { amount: 100, reward: '30-minute video call with author' },
  ],
  contentNFT: {
    enabled: false,
    basePrice: 0.1,
    currency: 'ETH',
    maxSupply: 100,
  },
}
