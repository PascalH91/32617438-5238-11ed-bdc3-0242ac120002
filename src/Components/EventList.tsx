import React from "react";
import { Box } from "@mui/material";

import Event from "./Event";
import { Event as EventType } from "../utils/types";
import "../Styles/components/eventList.css";

const EventList = ({ events }: { events: EventType[] }): JSX.Element => {
  return (
    <Box
      className="EventListWrapper"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr",
      }}
    >
      {events.map((event) => (
        <Event key={event._id} event={event} />
      ))}
    </Box>
  );
};

export default React.memo(EventList);
