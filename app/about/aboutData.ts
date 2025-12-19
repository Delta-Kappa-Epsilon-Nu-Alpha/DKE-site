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
      "Founded on June 22, 1844, at Yale University by fifteen sophomores who sought to create something extraordinary. These visionary young men established Delta Kappa Epsilon with the revolutionary idea that the ideal fraternity member should combine 'in the most equal proportions the Gentleman, the Scholar, and the Jolly Good Fellow.'",
      "From our humble beginnings in room twelve of Old South Hall at Yale, DKE has grown into one of America's most distinguished fraternities. Our motto, 'Κηροθεν Φιλοι ἀει' (Friends from the Heart, Forever), embodies the lifelong bonds that define our brotherhood and the enduring commitment we make to one another.",
      "For over 180 years, Delta Kappa Epsilon has remained true to its founding principles while adapting to serve each new generation. We continue to attract and develop the finest young men, preparing them to become leaders in their communities, professions, and the world at large.",
    ],
    iconName: "Star",
  },
  stats: {
    title: "Our Legacy in Numbers",
    subtitle:
      "Over 180 years of excellence, leadership, and brotherhood across North America",
    items: [
      {
        number: "1844",
        label: "Founded at Yale",
        iconName: "Calendar",
      },
      {
        number: "5",
        label: "U.S. Presidents",
        iconName: "Users",
      },
      {
        number: "56",
        label: "Active Chapters",
        iconName: "Target",
      },
      {
        number: "180+",
        label: "Years of Excellence",
        iconName: "DollarSign",
      },
    ],
  },
  quote: {
    text: "There could be no definition of a successful life that does not include service to others. Find something to do. Get off the bench. Don't sit there whining, sucking your thumb, get in the game.",
    author: "— Brother George H.W. Bush, Phi Yale",
  },
  values: {
    title: "Our Core Values",
    subtitle:
      "The three pillars that define every DKE brother and guide our fraternity's mission",
    items: [
      {
        title: "Gentlemen",
        content: [
          "We cultivate character, integrity, and honor in all our actions. A DKE gentleman conducts himself with dignity, treats others with respect, and upholds the highest moral standards both within and beyond the fraternity.",
          "Our commitment to being gentlemen extends to every aspect of life - from how we treat our brothers and guests, to our conduct in academic and professional settings, to our service in the community.",
        ],
        iconName: "Star",
      },
      {
        title: "Scholars",
        content: [
          "Academic excellence is fundamental to our brotherhood. We believe that intellectual growth and scholarly achievement are essential to personal development and future success.",
          "DKE brothers support each other's educational pursuits, maintain high academic standards, and understand that learning extends far beyond the classroom into lifelong intellectual curiosity and growth.",
        ],
        iconName: "BookOpen",
      },
      {
        title: "Jolly Good Fellows",
        content: [
          "Brotherhood and fellowship are at the heart of the DKE experience. We foster deep, lasting friendships built on mutual respect, shared values, and genuine care for one another.",
          "The bonds we form as jolly good fellows create a network of support that extends throughout our lives, connecting us to brothers across generations and providing a foundation for personal and professional success.",
        ],
        iconName: "Heart",
      },
    ],
  },
  gallery: {
    title: "Life in Our Chapter",
    subtitle:
      "Experience the brotherhood, excellence, and traditions that define DKE",
    items: [
      {
        src: "images/springFormal.jpg",
        alt: "Spring Formal",
        title: "Spring Formal 2024",
        description: "Celebrating brotherhood in style and tradition",
      },
      {
        src: "images/movember5k2.JPG",
        alt: "Community Service",
        title: "Community Service",
        description: "Serving others and making a difference",
      },
      {
        src: "images/pongTrophy.JPG",
        alt: "Intramural Champions",
        title: "Intramural Champions",
        description: "Excellence in competition and sportsmanship",
      },
      {
        src: "images/semiLambda.JPG",
        alt: "Academic Excellence",
        title: "Academic Excellence",
        description: "Scholars committed to intellectual growth",
      },
      {
        src: "images/mexico3.JPG",
        alt: "Annual Retreat",
        title: "Brotherhood Retreat",
        description: "Building lifelong bonds and memories",
      },
      {
        src: "images/oldheads.JPG",
        alt: "Alumni Weekend",
        title: "Alumni Weekend",
        description: "Friends from the heart, forever",
      },
    ],
  },
  brotherhood: {
    title: "Friends From the Heart, Forever",
    content: [
      "Our motto, 'Κηροθεν Φιλοι ἀει' (Friends from the Heart, Forever), captures the essence of what makes DKE special. We don't just create friendships; we forge lifelong bonds that transcend time, distance, and circumstance.",
      "Delta Kappa Epsilon strives to develop undergraduate chapters who perform in the top tier of fraternities at their institutions, and a vibrant network of alumni who remain motivated to stay involved with the fraternity after graduation.",
      "We provide our undergraduates with the leadership skills and operational resources they need to excel in today's environment, while developing alumni networking programs that are relevant, engaging, and beneficial to both alumni and undergraduates.",
    ],
    iconName: "Award",
  },
  excellence: {
    image: "images/groupGator.JPG",
    badge: "180 Years of Excellence",
    missionBadge: "Our Mission",
    title: "Excellence in Everything We Do",
    description:
      "Delta Kappa Epsilon has produced five U.S. Presidents, countless business leaders, and distinguished alumni across every field. We maintain our commitment to excellence by attracting and developing the finest young men who will become tomorrow's leaders.",
    stats: {
      championships: "5",
      gpa: "Presidents",
    },
  },
  journey: {
    title: "Our Historic Journey",
    paragraphs: [
      "Delta Kappa Epsilon was founded at Yale University in 1844 by fifteen sophomores who were dissatisfied with the existing fraternity system. They envisioned a new kind of brotherhood that would combine academic excellence, gentlemanly conduct, and genuine fellowship.",
      "From our founding at Yale, DKE quickly expanded across the nation's most prestigious universities. We became known for attracting the finest young men and developing them into leaders who would shape American society for generations to come.",
      "Throughout our history, DKE has remained committed to exclusivity and excellence. We continue to cater only to the best, maintaining the same high standards that have made us one of America's most distinguished fraternities for over 180 years.",
      "Today, with 56 active chapters across North America, Delta Kappa Epsilon continues its mission of developing gentlemen, scholars, and jolly good fellows who will lead in their communities and professions while maintaining the lifelong bonds of brotherhood.",
    ],
    images: [
      "images/halloweenDj.JPG",
      "images/sunglasses.JPG",
      "images/dance1.jpg",
      "images/briggsRoof.JPG",
    ],
  },
  darkQuote: {
    text: "In a free and compassionate society, the public good depends on private character. DKE has enriched the lives of students by teaching the importance of learning, leadership, and community service.",
    author: "— Brother George W. Bush, Class of 1968",
  },
  whyJoin: {
    title: "Why Choose Our Brotherhood?",
    content: [
      "Delta Kappa Epsilon offers an unparalleled network of accomplished alumni spanning every industry and profession. From U.S. Presidents to Fortune 500 CEOs, DKE brothers have achieved the highest levels of success and remain committed to helping fellow brothers throughout their careers.",
      "Our commitment to developing gentlemen, scholars, and jolly good fellows means you'll be part of a brotherhood that values character, academic excellence, and genuine friendship. We provide leadership opportunities, mentorship, and the resources you need to excel in college and beyond.",
      "As a DKE brother, you join a legacy of excellence that spans over 180 years. Our exclusive membership and high standards ensure that you'll be surrounded by the finest young men who share your commitment to achievement, integrity, and lifelong brotherhood.",
    ],
  },
  cta: {
    badge: "Join the Legacy",
    title: "Ready to Join Our Brotherhood?",
    subtitle:
      "Become part of 180 years of excellence, leadership, and lifelong friendship",
    buttons: {
      rush: "Learn About Rush",
      contact: "Contact Us",
    },
  },
};
