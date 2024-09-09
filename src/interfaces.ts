export interface AppPage {
  url: string;
  icon: string;
  title: string;
  dropdown?: {
    title: string;
    url: string;
  }[];
}

export interface SiteLinks {
  address: string;
  email: string;
  facebook: string;
  instagram: string;
  map: string;
  mapEmbed: string;
  phone: string;
  waMe: string;
  youtube: string;
  serviceTime: string;
  thursdayService: string;
}

export interface MonthData {
  bible: string;
  imgUrl: string;
  month: string;
  monthWriteup: string;
  newsletter: string;
}

export interface GSCEvent {
  description: string;
  end: string;
  eventId: string;
  frequency?: "weekly" | "monthly" | "yearly";
  imgUrl: string;
  pictures: string[];
  recurring: boolean;
  start: string;
  title: string;
  venue: string;
}
