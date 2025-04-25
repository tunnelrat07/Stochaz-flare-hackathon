const bettingEvents = {
  live: [
    {
      id: 1,
      title: "Price of ENS Token moves by $1 tommorow",
      description:
        "Will the difference between the maximum and the minimum price of the ENS token tommorow cross $1 ?",
      chain: "Flare Testnet Coston2",
      endsIn: "3d 8h",
      oracle: "Flare FTSO Price Feed",
      poolSize: "4,328 FLR",
      odds: { for: 1.5, against: 1.5 },
      activity: "High",
      imageUrl:
        "https://thegivingblock.com/wp-content/uploads/2021/12/Ethereum-Name-Service-ENS.png",
    },
  ],
};
export default bettingEvents;
