import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import device from "../styles/mediaqueries";
import Checkbox from "@mui/material/Checkbox";
import { Context } from "../ContextProvider";
import { Slider } from "@mui/material";

const Container = styled.div`
  flex: 1;
    width:100%;
  /* display: ${(props) => (props.showTheFilter ? "flex" : "none")}; */
  @media${device.tablet} {
  }
`;

const DesktopFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;

  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  @media${device.tablet} {
    width: 80%;
  }
`;
const Minidiv = styled.div`
  padding: 0;
  margin: 0;
  margin-left: 0.7em;

  margin-bottom: 0.3em;
`;
const FilterParagraph = styled.p`
  margin: 0;
  padding: 0;
  margin-left: 0.5em;
`;

function FilterComponent({ show }) {
  console.log("Show är just nu: ", show);
  const { userData, setUserData, fetchDb, filteredData, setFilteredData } =
    useContext(Context);
  const [ageFilter, setAgeFilter] = useState(false);
  const [smokingFilter, setSmokingFilter] = useState(false);
  const [petsFilter, setPetsfilter] = useState(false);
  const [theRent, setTheRent] = useState(null);
  const [newData, setNewData] = useState(null);
  const getCookie = JSON.parse(sessionStorage.getItem("filteredState"));

  const smokeFilter = userData.filter((data) => {
    return data.smoker === false;
  });

  const filterSmoke = filteredData.filter((data) => {
    return data.smoker === false;
  });

  function cookieFilter() {
    const cookie = sessionStorage.getItem("filteredState");
    if (!cookie) {
      sessionStorage.setItem("filteredState", smokingFilter);
    } else {
      const cookieExists = JSON.parse(sessionStorage.getItem("filteredState"));
      setSmokingFilter(cookieExists);
    }
  }

  function changeFilterState() {
    setSmokingFilter((current) => !current);
  }

  useEffect(() => {
    cookieFilter();
  }, []);

  useEffect(() => {
    if (smokingFilter) {
      setFilteredData(smokeFilter);
      sessionStorage.setItem("filteredState", JSON.stringify(smokingFilter));
    } else {
      setFilteredData(userData);
      sessionStorage.setItem("filteredState", JSON.stringify(smokingFilter));
    }
  }, [smokingFilter]);

  console.log("filtret är", smokingFilter);

  return (
    <Container showTheFilter={show}>
      <DesktopFilter>
        <FilterParagraph
          style={{
            marginLeft: "0.7em",
            fontSize: "1.5em",
            marginBottom: "0.3em",
          }}
        >
          FILTER
        </FilterParagraph>
        <Minidiv>
          <FilterParagraph>Icke rökare</FilterParagraph>
          <Checkbox
            checked={smokingFilter}
            onChange={changeFilterState}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Minidiv>

        <Minidiv>
          <FilterParagraph>Husdjursfri</FilterParagraph>
          <Checkbox
            checked={petsFilter}
            onChange={() => setPetsfilter((current) => !current)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Minidiv>

        <Minidiv
          style={{
            width: "60%",
            marginTop: "1em",
            marginLeft: "0.8em",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FilterParagraph>Maxhyra</FilterParagraph>
          <Slider
            defaultValue={0}
            value={theRent}
            onChange={(e) => setTheRent(e.target.value)}
            size="medium"
            aria-label="Small"
            valueLabelDisplay=""
            max={25000}
            step={100}
          />
        </Minidiv>
      </DesktopFilter>
    </Container>
  );
}

export default FilterComponent;
