import teacher from "../img/prayer1.jpg";
import group1 from "../img/group-1.jpg";
import group2 from "../img/group.jpg";
import teaching from "../img/teaching.jpg";
import community from "../img/community.jpg";
import {
  extensionPuzzleSharp,
  funnelSharp,
  giftSharp,
  peopleSharp,
  walletSharp,
} from "ionicons/icons";

interface HomeSlideData {
  headline: string;
  buttons: boolean;
  smallText?: string;
  backgroundUrl?: string;
}
export const sliderData: HomeSlideData[] = [
  {
    headline:
      "We were made for something more, something that lasts forever, and so our hearts are bent towards eternity",
    buttons: true,
    backgroundUrl: group2,
  },
  {
    headline: "The mercy of God's grace alone brings deliverance",
    buttons: true,
    backgroundUrl: teacher,
  },
  {
    headline: "True Faith Means holding nothing back",
    buttons: true,
    backgroundUrl: teaching,
  },
  {
    headline: "God is most glorified in us when we are most satisfied in Him",
    buttons: true,
    backgroundUrl: group1,
  },
  {
    headline: "Evangelism, Discipleship, Holy Living",
    buttons: true,
    backgroundUrl: community,
  },
];

interface CardData {
  icon: string;
  headline: string;
  smallText: string;
  button: {
    text: string;
    url: string;
  };
}

export const cardData: CardData[] = [
  {
    icon: peopleSharp,
    headline: "Become A Volunteer",
    smallText:
      "Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.",
    button: {
      text: "Join us now",
      url: "/about",
    },
  },
  {
    icon: giftSharp,
    headline: "Donate To Support",
    smallText:
      "Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.",
    button: {
      text: "Join us now",
      url: "/give",
    },
  },
  {
    icon: extensionPuzzleSharp,
    headline: "Become A Partner",
    smallText:
      " I can do all things through him who strengthens me.Worry does not empty tomorrow of its sorrows; it empties today of its strength.",
    button: {
      text: "Join us now",
      url: "/contact",
    },
  },
];
