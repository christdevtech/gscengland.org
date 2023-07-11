import {
  mailOutline,
  paperPlaneOutline,
  heartOutline,
  archiveOutline,
  trashOutline,
  homeOutline,
  peopleOutline,
  giftOutline,
  callOutline,
  logoWhatsapp,
} from "ionicons/icons";

export interface AppPage {
  url: string;
  icon: string;
  title: string;
  dropdown?: {
    title: string;
    url: string;
  }[];
}
