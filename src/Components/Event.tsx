import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import Pin from "@mui/icons-material/PinDrop";
import Add from "@mui/icons-material/Add";

import { Context } from "../index";
import { avatarImageUrl, placeholderEventPosterUrl } from "../consts";
import { Event as EventType, Context as ContextType } from "../utils/types";
import { formatDate } from "../utils/helper";

import "../Styles/components/event.css";

const Event = ({ event }: { event: EventType }): JSX.Element => {
  //@ts-ignore
  const [_, setContext]: [ContextType, any] = React.useContext(Context);
  const handleAddEventToBasket = React.useCallback(() => {
    setContext((oldContext: ContextType) => ({
      ...oldContext,
      addedEvents: [...oldContext.addedEvents, event],
    }));
  }, [event, setContext]);

  return (
    <div className="EventWrapper">
      <div className="EventTitleWrapper">
        <img className="AvatarImage" src={avatarImageUrl} alt="avatarimage" />
        <Typography variant="body2" paddingLeft="1rem" fontWeight="bold">
          {event.title}
        </Typography>
      </div>
      <div
        className="Poster"
        style={{
          backgroundImage: `url(${
            event.flyerFront || placeholderEventPosterUrl
          })`,
        }}
      />
      <div className="EventInfoFooter">
        <div>
          <Button
            className="LinkButton"
            href={event.venue.direction}
            target="_blank"
          >
            {event.venue.name}
            <Pin />
          </Button>
          <Typography variant="body2">
            Starts: {formatDate({ date: event.startTime })}
          </Typography>
          <Typography variant="body2">
            End: {formatDate({ date: event.endTime })}
          </Typography>
        </div>
        <Box
          className="AddButton"
          component={IconButton}
          onClick={handleAddEventToBasket}
        >
          <Add />
        </Box>
      </div>
    </div>
  );
};

export default React.memo(Event);
