// philanthropyData.ts

// TypeScript interfaces
export interface Stat {
  value: string;
  label: string;
  iconName?: "dollar" | "clock" | "heart" | "users"; // Use string identifiers instead
}

export interface CharityStats {
  primaryValue: string;
  primaryLabel: string;
  secondaryValue: string;
  secondaryLabel: string;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  imagePlaceholder: string;
  stats: CharityStats;
  donationUrl?: string;
}

export interface PhilanthropyData {
  hero: {
    title: string;
    subtitle: string;
    stats: Stat[];
    videoUrl: string;
  };
  quote: {
    text: string;
    author: string;
  };
  charities: Charity[];
}

// Philanthropy page data - easily updateable
export const philanthropyData: PhilanthropyData = {
  hero: {
    title: "Making a Difference Together",
    subtitle:
      "Our commitment to philanthropy defines who we are. Through dedicated service and community partnerships, we strive to create lasting positive change in our community and beyond.",
    stats: [
      {
        value: "$50K+",
        label: "Raised This Year",
        iconName: "dollar",
      },
      {
        value: "1,500",
        label: "Service Hours",
        iconName: "clock",
      },
      {
        value: "15",
        label: "Partner Charities",
        iconName: "heart",
      },
      {
        value: "100%",
        label: "Brother Participation",
        iconName: "users",
      },
    ],
    videoUrl: "videos/greekSing.mp4",
  },
  quote: {
    text: "There could be no definition of a successful life that does not include service to others.",
    author: "- George H.W. Bush (Phi Chapter)",
  },
  charities: [
    {
      id: "movember",
      name: "The Movember Foundation",
      description:
        "The world’s leading men’s health charity focused on prostate cancer, testicular cancer, mental health, and suicide prevention.",
      imagePlaceholder: "Movember",
      imageUrl: "images/movember.png",
      stats: {
        primaryValue: "$30,000+",
        primaryLabel: "Raised this november",
        secondaryValue: "56",
        secondaryLabel: "Mustaches Grown",
      },
      // donationUrl: "https://us.movember.com/team/2434194",
    },
    {
      id: "tobincommunitycenter",
      name: "Tobin Community Center",
      description:
        "A local Boston community center providing youth programs, educational support, and recreational activities for families.",
      imagePlaceholder: "Tobin Community Center",
      imageUrl: "images/tobinCommunity.png",
      stats: {
        primaryValue: "$15,000+",
        primaryLabel: "2nd most of all greek organizations",
        secondaryValue: "20 DKE Divas",
        secondaryLabel: "Dancing in blackman",
      },
    },
    {
      id: "americancancer",
      name: "The American Cancer Society",
      description:
        "A nationwide organization dedicated to fighting cancer through research, patient support, prevention, and early detection programs.",
      imagePlaceholder: "The American Cancer Society",
      imageUrl: "images/americanCancerSociety.png",
      stats: {
        primaryValue: "$8,000+",
        primaryLabel: "Raised in 2025",
        secondaryValue: "20+",
        secondaryLabel: "Brothers Registered",
      }
    },
    {
      id: "foodbank",
      name: "The Greater Boston Food Bank",
      description:
        "New England’s largest hunger-relief organization, distributing meals and groceries to families in need across the region.",
      imagePlaceholder: "The Greater Boston Food Bank",
      imageUrl: "images/foodBank.png",
      stats: {
        primaryValue: "120+",
        primaryLabel: "Service Hours",
        secondaryValue: "30+",
        secondaryLabel: "Participating Brothers",
      }
    },
    {
      id: "bplusfoundation",
      name: "B+ Foundation",
      description:
        "The largest provider of financial assistance to families of children with cancer, while also funding critical pediatric cancer research.",
      imagePlaceholder: "B+ Foundation",
      imageUrl: "images/bPlus.png",
      stats: {
        primaryValue: "$400+",
        primaryLabel: "Funds Raised",
        secondaryValue: "35+",
        secondaryLabel: "Families Helped",
      }
    },
    {
      id: "missionhillhousing",
      name: "Mission Hill Housing Services",
      description:
        "Providing housing to the less fortunate around the Mission Hill area.",
      imagePlaceholder: "Mission Hill Housing",
      imageUrl: "images/missionhillhousing.jpeg",
      stats: {
        primaryValue: "$14,000+",
        primaryLabel: "Given to keep housing affordable",
        secondaryValue: "200+",
        secondaryLabel: "Communitee Members Supported",
      }
    },
  ],
};
