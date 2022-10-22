import React from "react";
//@ts-ignore
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { Chip } from "@mui/material";

import "../Styles/components/generalEventParameters.css";

const GeneralEventParameters = ({
  countries,
  timeSpan,
}: {
  countries: string[];
  timeSpan?: string;
}): JSX.Element => {
  return (
    <div className="ChipList">
      {countries.map((country) => (
        <Chip
          className="Chip"
          key={country}
          label={
            <div>{getUnicodeFlagIcon(country === "uk" ? "gb" : country)}</div>
          }
          variant="outlined"
        />
      ))}
      {timeSpan && (
        <Chip className="Chip" label={timeSpan} variant="outlined" />
      )}
    </div>
  );
};

export default React.memo(GeneralEventParameters);
