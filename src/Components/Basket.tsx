import React from "react";
import { Box, Typography } from "@mui/material";

import { Context } from "../index";
import { Context as ContextType } from "../utils/types";
import { filterEvents } from "../utils/helper";
import SortedEventsCalendar from "./SortedEventsCalendar";
import GeneralEventParameters from "./GeneralEventParameters";

const Basket = (): JSX.Element => {
  //@ts-ignore
  const [context, _]: [ContextType, any] = React.useContext(Context);

  const filteredEvents = filterEvents({
    events: context.addedEvents,
    searchString: context.searchString,
  });

  return (
    <div>
      {filteredEvents && (
        <>
          <Typography className="EventListHeader" variant="h2">
            BASKET
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
    </div>
  );
};

export default React.memo(Basket);
