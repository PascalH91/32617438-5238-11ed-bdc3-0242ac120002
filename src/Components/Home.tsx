import React from "react";
import { Box, Typography } from "@mui/material";

import { Context } from "../index";
import { Context as ContextType } from "../utils/types";
import { fetchEvents, filterEvents } from "../utils/helper";
import SortedEventsCalendar from "./SortedEventsCalendar";
import GeneralEventParameters from "./GeneralEventParameters";

const Home = (): JSX.Element => {
  //@ts-ignore
  const [context, setContext]: [ContextType, any] = React.useContext(Context);

  React.useEffect(() => {
    const getEventsData = async () => {
      const eventData = await fetchEvents();
      if (!context.allEvents) {
        setContext((oldContext: ContextType) => ({
          ...oldContext,
          allEvents: eventData,
        }));
      }
    };
    context && !context.allEvents && getEventsData();
  }, [context, setContext]);

  const eventsToShow =
    context?.allEvents &&
    context?.allEvents.filter(
      (event) =>
        !context.addedEvents.map((event) => event._id).includes(event._id)
    );

  const filteredEvents =
    eventsToShow &&
    filterEvents({ events: eventsToShow, searchString: context.searchString });

  return (
    <Box>
      {filteredEvents && (
        <>
          <Typography className="EventListHeader" variant="h2">
            ALL EVENTS
          </Typography>
          <GeneralEventParameters
            countries={filteredEvents.countries}
            timeSpan={filteredEvents.fromTo}
          />
          <SortedEventsCalendar
            topOffset={context.topOffset}
            events={filteredEvents.eventsByDatesMap}
          />
        </>
      )}
    </Box>
  );
};

export default React.memo(Home);
