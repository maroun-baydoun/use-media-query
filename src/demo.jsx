import React from "react";
import ReactDOM from "react-dom";
import useMediaQuery from "@maroun-baydoun/use-media-query";

const MediaQuery = ({ mediaQuery, matches }) => (
  <div className="demo-row">
    <div>{mediaQuery}</div> <div>{matches ? "matches" : "doesn't match"}</div>
  </div>
);

const Demo = () => {
  const matches1 = useMediaQuery("only screen and (min-width: 1024px)");
  const matches2 = useMediaQuery("only screen and (max-width: 420px)");
  const matches3 = useMediaQuery("only screen and (min-width: 760px)");

  return (
    <div className="demo-container">
      <MediaQuery
        mediaQuery="only screen and (min-width: 1024px)"
        matches={matches1}
      />
      <MediaQuery
        mediaQuery="only screen and (max-width: 420px)"
        matches={matches2}
      />
      <MediaQuery
        mediaQuery="only screen and (min-width: 760px)"
        matches={matches3}
      />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("demo"));
