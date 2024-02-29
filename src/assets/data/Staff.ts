import grace from "../img/grace.jpg";
import centina from "../img/centina.jpg";
import dora from "../img/dora.jpg";

export interface Trustee {
  name: string;
  imgUrl: string;
}

export const trustees: Trustee[] = [
  { name: "Grace Olaiya", imgUrl: grace },
  { name: "Dora Affam", imgUrl: dora },
  { name: "Centina Sylvester", imgUrl: centina },
];
