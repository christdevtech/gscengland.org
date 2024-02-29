import teacher from "../img/prayer1.jpg";
import group1 from "../img/group-1.jpg";
import group2 from "../img/group.jpg";
import teaching from "../img/teaching.jpg";
import community from "../img/community.jpg";
import prayer from "../img/prayer.jpg";
import prayer1 from "../img/photo_2023-06-19_21-22-03.jpg";
import cardAbout from "../img/cardAbout.jpg";
import cardGive from "../img/cardGive.jpg";
import cardWatch from "../img/cardWatch.jpg";

import give from "../img/photo_2023-06-19_21-22-07 (2).jpg";
import newMems from "../img/photo_2023-06-19_21-21-55 (2).jpg";
import { extensionPuzzleSharp, giftSharp, peopleSharp } from "ionicons/icons";

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
  icon?: string;
  headline: string;
  bg?: string;
  url: string;
}

export const cardData: CardData[] = [
  {
    headline: "About",
    bg: prayer,
    url: "/about",
  },
  {
    headline: "Watch",
    bg: cardWatch,
    url: "https://www.youtube.com/@gatewaysalvationchurch",
  },
  {
    headline: "Give",
    bg: give,
    url: "/give",
  },
  {
    headline: "Contact",
    bg: cardAbout,
    url: "/contact",
  },
];
export const cardData1: CardData[] = [
  {
    headline: "New Members",
    bg: newMems,
    url: "/new-members",
  },
  {
    headline: "Prayer Requests",
    bg: prayer1,
    url: "/contact",
  },
  {
    headline: "Share Your Testimony",
    bg: cardGive,
    url: "/contact",
  },
  {
    headline: "Contact",
    bg: community,
    url: "/contact",
  },
];
