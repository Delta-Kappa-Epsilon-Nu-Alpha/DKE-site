export interface HomeData {
  hero: {
    letters: string[];
    title: string;
    subtitle: string;
    buttons: {
      text: string;
      href: string;
    }[];
    image: string;
  };
  quote: {
    text: string;
    author: string;
    image: string;
  };
  grid: {
    images: string[];
  };
  interactiveImages: {
    gentlemen: string;
    scholars: string;
    jollyGoodFellows: string;
  };
}

export const homeData: HomeData = {
  hero: {
    letters: ["Δ", "K", "E"],
    title: "Nu Alpha Chapter, Northeastern University",
    subtitle: "",
    buttons: [
      {
        text: "Rush",
        href: "/rush",
      },
      {
        text: "About",
        href: "/about",
      },
    ],
    image: "images/formalBeach.JPG",
  },
  quote: {
    text: `"To educate a person in the mind but not in morals is to educate a menace to society."`,
    author: "- Theodore Roosevelt, Phi Yale",
    image: "images/dkelion.svg",
  },
  grid: {
    images: [
      "images/allGrads.jpg",
      "images/fire2.JPG",
      "images/mexico3.JPG",
      "images/gioGator.JPG",
      "images/ianJayden.jpg",
      "images/hammocks.jpg",
      "images/roof.jpg",
      "images/woods.jpg",
      "images/band1.jpg",
      "images/band2.jpg",
      "images/band3.jpg",
      "images/band4.jpg",
      "images/bird.jpg",
      "images/kappa.jpg",
      "images/lambda.jpg",
      "images/dance1.jpg",
      "images/dance2.jpg",
      "images/dance3.jpg",
      "images/springFormal.jpg",
      "images/rodGrad.jpg",
      "images/halloweenDj.JPG",
      "images/podesta.JPG",
      "images/roof.jpg",
      "images/partyDark.JPG",
      "images/hammocks.jpg",
      "images/ianJayden.jpg",
      "images/sunglasses.JPG",
      "images/roof.jpg",
    ],
  },
  interactiveImages: {
    gentlemen: "images/neuAwards.png",
    scholars: "images/harrison.jpg",
    jollyGoodFellows: "images/mexico4.JPG",
  },
};
