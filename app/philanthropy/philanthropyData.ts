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
  category: "health" | "education" | "community";
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
        value: "2,500",
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
  charities: [
    {
      id: "stjude",
      name: "St. Jude Children's Research Hospital",
      category: "health",
      description:
        "Leading the way the world understands, treats and defeats childhood cancer and other life-threatening diseases.",
      imagePlaceholder: "St. Jude Children's Hospital",
      imageUrl: "images/pongTrophy.JPG", // Add actual image URL here
      stats: {
        primaryValue: "$12,500",
        primaryLabel: "Raised in 2024",
        secondaryValue: "500+",
        secondaryLabel: "Hours Volunteered",
      },
      donationUrl: "example.com", // Add actual donation URL here
    },
    {
      id: "makeawish",
      name: "Make-A-Wish Foundation",
      category: "health",
      description:
        "Creating life-changing wishes for children with critical illnesses, bringing hope and joy to families.",
      imagePlaceholder: "Make-A-Wish Foundation",
      imageUrl: "images/pongTrophy.JPG",
      stats: {
        primaryValue: "$8,000",
        primaryLabel: "Raised in 2024",
        secondaryValue: "3",
        secondaryLabel: "Wishes Granted",
      },
      donationUrl: undefined,
    },
    {
      id: "foodbank",
      name: "Community Food Bank",
      category: "community",
      description:
        "Fighting hunger in our community by providing nutritious food to families in need through our monthly drives.",
      imagePlaceholder: "Community Food Bank",
      imageUrl: "images/pongTrophy.JPG",
      stats: {
        primaryValue: "10,000 lbs",
        primaryLabel: "Food Collected",
        secondaryValue: "800+",
        secondaryLabel: "Families Helped",
      },
      donationUrl: undefined,
    },
    {
      id: "boysgirlsclub",
      name: "Boys & Girls Club",
      category: "education",
      description:
        "Mentoring youth through after-school programs, tutoring, and athletic activities to build tomorrow's leaders.",
      imagePlaceholder: "Boys & Girls Club",
      imageUrl: "images/pongTrophy.JPG",
      stats: {
        primaryValue: "750",
        primaryLabel: "Mentoring Hours",
        secondaryValue: "50",
        secondaryLabel: "Kids Mentored",
      },
      donationUrl: undefined,
    },
    {
      id: "habitat",
      name: "Habitat for Humanity",
      category: "community",
      description:
        "Building homes, communities and hope. Our brothers volunteer monthly on construction projects.",
      imagePlaceholder: "Habitat for Humanity",
      imageUrl: undefined,
      stats: {
        primaryValue: "2",
        primaryLabel: "Homes Built",
        secondaryValue: "600+",
        secondaryLabel: "Build Hours",
      },
      donationUrl: undefined,
    },
    {
      id: "scholars",
      name: "First Generation Scholars",
      category: "education",
      description:
        "Supporting first-generation college students with scholarships and mentorship programs.",
      imagePlaceholder: "First Generation Scholars",
      imageUrl: undefined,
      stats: {
        primaryValue: "$15,000",
        primaryLabel: "Scholarships Given",
        secondaryValue: "10",
        secondaryLabel: "Students Supported",
      },
      donationUrl: undefined,
    },
  ],
};
