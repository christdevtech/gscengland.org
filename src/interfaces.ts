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
  eventId: string;
  title: string;
  date: { start: string; end: string };
  venue: string;
  description: string;
  imgUrl: string;
  pictures: string[];
  recurring: {
    recurringstate: boolean;
    frequency?: "weekly" | "monthly" | "yearly";
  };
}
