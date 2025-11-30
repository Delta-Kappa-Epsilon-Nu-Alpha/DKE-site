export interface StatItemData {
  number: string;
  label: string;
  iconName: "Calendar" | "Users" | "Target" | "DollarSign";
}

export interface MasonryItemData {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface TextBlockData {
  title: string;
  content: string[];
  iconName?: "Star" | "BookOpen" | "Heart" | "Award";
}

export interface AboutData {
  hero: {
    est: string;
    title: string;
    subtitle: string;
    buttons: {
      rush: string;
      history: string;
    };
    image: string;
  };
  history: TextBlockData;
  stats: {
    title: string;
    subtitle: string;
    items: StatItemData[];
  };
  quote: {
    text: string;
    author: string;
  };
  values: {
    title: string;
    subtitle: string;
    items: TextBlockData[];
  };
  gallery: {
    title: string;
    subtitle: string;
    items: MasonryItemData[];
  };
  brotherhood: TextBlockData;
  excellence: {
    image: string;
    badge: string;
    missionBadge: string;
    title: string;
    description: string;
    stats: {
      championships: string;
      gpa: string;
    };
  };
  journey: {
    title: string;
    paragraphs: string[];
    images: string[];
  };
  darkQuote: {
    text: string;
    author: string;
  };
  whyJoin: TextBlockData;
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    buttons: {
      rush: string;
      contact: string;
    };
  };
}

export const aboutData: AboutData = {
  hero: {
    est: "Est. 1844",
    title: "DELTA KAPPA EPSILON",
    subtitle: "Friends from the heart, forever",
    buttons: {
      rush: "Learn About Rush",
      history: "Our History",
    },
    image: "images/pongTrophy.JPG",
  },
  history: {
    title: "Delta Kappa Epsilon Legacy",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    ],
    iconName: "Star",
  },
  stats: {
    title: "Our Legacy in Numbers",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    items: [
      {
        number: "1844",
        label: "Founded",
        iconName: "Calendar",
      },
      {
        number: "85,000+",
        label: "Active Brothers",
        iconName: "Users",
      },
      {
        number: "56+",
        label: "Chapters Nationwide",
        iconName: "Target",
      },
      {
        number: "$1.2M",
        label: "Raised for Charity",
        iconName: "DollarSign",
      },
    ],
  },
  quote: {
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
    author: "— Chapter President, Class of 2024",
  },
  values: {
    title: "Our Core Values",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed",
    items: [
      {
        title: "Gentlemen",
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ],
        iconName: "Star",
      },
      {
        title: "Scholars",
        content: [
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ],
        iconName: "BookOpen",
      },
      {
        title: "Jolly Good Fellows",
        content: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
        ],
        iconName: "Heart",
      },
    ],
  },
  gallery: {
    title: "Life in Our Chapter",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do",
    items: [
      {
        src: "images/springFormal.jpg",
        alt: "Spring Formal",
        title: "Spring Formal 2024",
        description: "Lorem ipsum dolor sit amet consectetur",
      },
      {
        src: "images/movember5k2.JPG",
        alt: "Community Service",
        title: "Community Service",
        description: "Adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "images/pongTrophy.JPG",
        alt: "Intramural Champions",
        title: "Intramural Champions",
        description: "Incididunt ut labore et dolore magna",
      },
      {
        src: "images/semiLambda.JPG",
        alt: "Academic Excellence",
        title: "Academic Excellence",
        description: "Ut enim ad minim veniam quis nostrud",
      },
      {
        src: "images/mexico3.JPG",
        alt: "Annual Retreat",
        title: "Brotherhood Retreat",
        description: "Exercitation ullamco laboris nisi ut",
      },
      {
        src: "images/oldheads.JPG",
        alt: "Alumni Weekend",
        title: "Alumni Weekend",
        description: "Aliquip ex ea commodo consequat duis",
      },
    ],
  },
  brotherhood: {
    title: "Friends From the Heart, Forever",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    ],
    iconName: "Award",
  },
  excellence: {
    image: "images/groupGator.JPG",
    badge: "180 Years of Excellence",
    missionBadge: "Our Mission",
    title: "Excellence in Everything We Do",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.",
    stats: {
      championships: "12",
      gpa: "3.6",
    },
  },
  journey: {
    title: "Our Historic Journey",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.",
    ],
    images: [
      "images/pongTrophy.JPG",
      "images/pongTrophy.JPG",
      "images/pongTrophy.JPG",
      "images/pongTrophy.JPG",
    ],
  },
  darkQuote: {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa.",
    author: "— Alumni Board Chairman, Class of 2010",
  },
  whyJoin: {
    title: "Why Choose Our Brotherhood?",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    ],
  },
  cta: {
    badge: "Join the Legacy",
    title: "Ready to Join Our Brotherhood?",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod",
    buttons: {
      rush: "Learn About Rush",
      contact: "Contact Us",
    },
  },
};
