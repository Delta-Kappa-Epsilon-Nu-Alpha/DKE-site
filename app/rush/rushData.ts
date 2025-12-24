export interface RushEvent {
  name: string;
  description: string;
  datetime: string;
  location: string;
  image: string;
  open: boolean;
}

export const rushData: RushEvent[] = [
  {
    name: "IFC Info Session",
    description:
      "An informative presentation on Northeastern Fraternity Rush and opportunity to meet our brothers and the IFC",
    datetime: "2026-01-09T18:30:00",
    location: "Dodge Hall",
    image: "images/ifc.jpeg",
    open: true,
  },
  {
    name: "Brothers & Brisket",
    description:
      "Slow cooked Brisket, variety of sides, and a chance to bond with our brothers over a delicious meal.",
    datetime: "2026-01-10T14:00:00",
    location: "814 Parker St",
    image: "images/rushBbq.jpeg",
    open: true,
  },
  // {
  //   name: "Canes & Games",
  //   description:
  //     "An afternoon of spikeball, cornhole, die, and lawn games at West Village Quad, paired with a catered Raising Cane's dinner. It?s the perfect chance to relax, enjoy some great food, and bond over friendly competition.",
  //   datetime: "2025-09-10T18:30:00",
  //   location: "West Village Quad",
  //   image: "images/canesAndGames.PNG",
  //   open: true,
  // },
  {
    name: "Poker Night",
    description: "Poker. Cigars. Drinks. A true gentlemen's night.",
    datetime: "2026-01-14T18:00:00",
    location: "Invite Only",
    image: "images/poker.JPG",
    open: true,
  },
  {
    name: "Wing Night",
    description: "A wide selection of wings, drinks, sports, and brothers.",
    datetime: "2026-01-15T18:00:00",
    location: "Centennial Quad",
    image: "images/fire3.JPG",
    open: true,
  },
  {
    name: "House Tours",
    description:
      "PNMs are guided through our nine houses in Mission Hill, showcasing our rooms, backyards, and event spaces. The night wraps up with dinner, s?mores, and a campfire hangout at one of the houses.",
    datetime: "2026-01-18T19:00:00",
    location: "Mission Hill",
    image: "images/house.jpg",
    open: false,
  },
  {
    name: "Pancakes & Pong",
    description:
      "PNMs team up with a brother of their choice for a bracket-style pong tournament, all competing for the legendary DKE Trophy. Alongside the tournament, we serve up fresh pancakes and sausages to keep everyone fueled during the games.",
    datetime: "2026-01-20T18:30:00",
    location: "Invite Only",
    image: "images/pongTrophy.JPG",
    open: false,
  },
  {
    name: "Banquet",
    description:
      "Our formal banquet, held on campus and catered by our favorite Italian restaurant, is a night of connection and celebration. Over dinner, speeches, and shared stories, brothers and PNMs get the chance to build meaningful bonds in a more formal setting.",
    datetime: "2026-01-23T00:18:30",
    location: "Invite Only",
    image: "images/banquetf24.JPG",
    open: false,
  },
];
