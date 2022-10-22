type ID = string | number;

type Artist = { id: ID; name: string };

type Pick = { blurb: string; id: ID };

type Venue = {
  contentUrl: string;
  direction: string;
  id: ID;
  live: boolean;
  name: string;
};

export type Event = {
  _id: ID;
  artists: Artist[];
  attending: number;
  city: string;
  contentUrl: string;
  country: string;
  date: Date;
  endTime: string;
  flyerFront: string;
  pick: Pick;
  private: boolean;
  startTime: string;
  title: string;
  venue: Venue;
};

export type EventsByDatesMap = { [key: string]: Event[] };

export type Context = {
  addedEvents: Event[];
  allEvents?: Event[];
  topOffset?: number;
  searchString?: string;
};
