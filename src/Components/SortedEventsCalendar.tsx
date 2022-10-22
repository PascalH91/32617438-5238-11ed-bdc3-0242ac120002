import React from "react";
import { Box, Typography } from "@mui/material";

import { formatDate } from "../utils/helper";
import { EventsByDatesMap } from "../utils/types";
import EventList from "./EventList";

import "../Styles/components/sortedEventsCalendar.css";

const SortedEventsCalendar = ({
  events: allEvents,
  topOffset = 0,
}: {
  topOffset?: number;
  events: EventsByDatesMap;
}): JSX.Element => {
  return (
    <>
      {Object.values(allEvents)?.map((eventsOnOneDay, idx) => (
        <div key={idx}>
          <Box
            className="EventDateBar"
            component={Typography}
            top={`calc(0px + ${topOffset}px)`}
          >
            {formatDate({
              date: Object.keys(allEvents)[idx],
              formatSyntax: "EEE MMM dd yyyy",
            })?.toUpperCase()}
          </Box>
          <EventList events={eventsOnOneDay} />
        </div>
      ))}
    </>
  );
};

export default React.memo(SortedEventsCalendar);
