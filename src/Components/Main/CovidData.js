import React, { useEffect, useState } from "react";
import axios from "axios";
import CovidDataGraph from "./CovidDataGraph";
import DatePicker from "react-datepicker";
import "../../styles/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { getFilteredData } from "../Helpers/getFilteredData";
import moment from "moment";

const CovidData = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filteredStartDate, setFilteredStartDate] = useState(new Date());
  const [filteredEndDate, setFilteredEndDate] = useState(new Date());
  const [data, setData] = useState();
  const objectData = data && Object.entries(data)[0];
  const item =
    objectData &&
    getFilteredData(
      objectData,
      filteredStartDate && moment(filteredStartDate).format("YYYY-MM-DD"),
      filteredEndDate && moment(filteredEndDate).format("YYYY-MM-DD")
    );

  let debounceTimeout;

  const handleFinalDates = (start, end) => {
    setFilteredStartDate(start);
    setFilteredEndDate(end);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleFinalDates(date, toDate);
    }, 0);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleFinalDates(fromDate, date);
    }, 0);
  };

  useEffect(() => {
    axios
      .get("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((response) => setData(response.data));
      setFilteredStartDate("");
      setFilteredEndDate("")
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="dropdowns col-md-12">
          <h4 className="col-md-6">Total Covid Cases on state of AN</h4>
          <span className="dropdown-menus col-md-3">
            <label>From:</label>
            <DatePicker
              selected={fromDate}
              placeholderText="From"
              onChange={handleFromDateChange}
            />
          </span>
          <span className="dropdown-menus col-md-3">
            <label>To:</label>
            <DatePicker
              selected={toDate}
              placeholderText="To"
              onChange={handleToDateChange}
            />
          </span>
        </div>
      </div>

      <CovidDataGraph data={item} />
    </div>
  );
};

export default CovidData;
