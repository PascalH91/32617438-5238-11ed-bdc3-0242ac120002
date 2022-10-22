import _ from "lodash";
import { format } from "date-fns";
import de from "date-fns/locale/de";

import { Event, EventsByDatesMap } from "./types";

export const filterEvents = ({
  events,
  searchString,
}: {
  events: Event[];
  searchString?: string;
}): {
  countries: string[];
  fromTo?: string;
  eventsByDatesMap: EventsByDatesMap;
} => {
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchString?.toLowerCase() || "")
  );

  const eventsByDatesMap = filteredEvents.reduce((acc, event) => {
    const transformedDate = format(new Date(event.startTime), "yyyy-MM-dd");
    if (!acc[transformedDate]) {
      acc[transformedDate] = [];
    }

    acc[transformedDate].push(event);
    return acc;
  }, {} as EventsByDatesMap);

  const eventDates = Object.keys(eventsByDatesMap).map((date) =>
    format(new Date(date), "dd MMM yyyy")
  );
  const fromTo = eventDates.length
    ? `${eventDates[0]} - ${eventDates[eventDates.length - 1]}`
    : undefined;

  const countries = filteredEvents.reduce((acc, event) => {
    acc.push(event.country);
    return Array.from(new Set(acc));
  }, [] as string[]);

  return {
    countries,
    fromTo,
    eventsByDatesMap,
  };
};

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const data = await fetch(
      "https://tlv-events-app.herokuapp.com/events/uk/london",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res: Event[] = await data.json();
    const eventsWithStartAndEndtime = res.filter(
      (event) => event.startTime && event.endTime
    );
    const sortedEvents = _.sortBy(eventsWithStartAndEndtime, ["date"], ["asc"]);

    return sortedEvents;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const formatDate = ({
  date,
  formatSyntax,
}: {
  date?: string;
  formatSyntax?: string;
}): string | undefined => {
  return (
    date &&
    format(new Date(date), formatSyntax || "dd.MM.yyyy, hh:mm", {
      locale: de,
    })
  );
};
