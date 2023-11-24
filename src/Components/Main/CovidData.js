import React, { useEffect, useState } from "react";
import axios from "axios";
import CovidDataGraph from "./CovidDataGraph";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../styles/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { getFilteredData } from "../Helpers/getFilteredData";

const CovidData = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [data, setData] = useState();
  const objectData = data && Object.entries(data)[0];

  useEffect(() => {
    axios
      .get("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((response) => setData(response.data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h6>Covid19-India</h6>
        <div className="dropdowns col-md-12">
          <h4 className="col-md-6">Covid Cases on state of AN</h4>
          <span className="dropdown-menus col-md-3">
            <p>From</p>
            <DatePicker
              selected={fromDate}
              placeholder="From"
              onChange={(date) => setFromDate(date)}
            />
          </span>
          <span className="dropdown-menus col-md-3">
            <p>To</p>
            <DatePicker
              selected={toDate}
              placeholder="From"
              onChange={(date) => setToDate(date)}
            />
          </span>
        </div>
      </div>
      {objectData &&
        getFilteredData(
          objectData,
          moment(fromDate).format("YYYY-MM-DD"),
          moment(toDate).format("YYYY-MM-DD")
        ).map((item, index) => 
          // if (typeof item === "object") {
          //   Object.entries(item).forEach(([key, value]) => {
          //     <CovidDataGraph value={value} />;
              
          //   });
          <CovidDataGraph data={item} />
          )
        }
    </div>
  );
};

export default CovidData;
