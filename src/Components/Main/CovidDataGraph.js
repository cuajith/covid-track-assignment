import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../../styles/style.css";

const CovidDataGraph = ({ data }) => {
  
  const chartRef = useRef(null);
  const newData =
    data &&
    data.map(([date, entry]) => {
      const { delta, delta7, ...total } = entry;
      return [date, { total }];
    });

  const newArray =
    newData &&
    newData.map(([date, { total }]) => ({
      date,
      total: {
        confirmed: total.total.confirmed,
        recovered: total.total.recovered,
      },
    }));
  console.log(newArray);

  useEffect(() => {
  
    // Ensure data is available
    if (!data || data.length === 0) {
      return;
    }

    // Set up chart dimensions
    const width = 1000;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Extract data
    const dates = newArray.map((entry) => entry.date);
    const confirmedValues = newArray.map((entry) => entry.total.confirmed);
    const recoveredValues = newArray.map((entry) => entry.total.recovered);

    // Set up scales
    const x = d3
      .scaleBand()
      .domain(dates)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(confirmedValues, (d) => Math.max(d, ...recoveredValues)),
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create a line function
    const line = d3
      .line()
      .x((d, i) => x(dates[i]) + x.bandwidth() / 2)
      .y((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Select chart container
    const svg = d3.select(chartRef.current);

    // Clear previous elements
    svg.selectAll("*").remove();

    // Append axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Append lines
    svg
      .append("path")
      .datum(confirmedValues)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(recoveredValues)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [newArray]);
  return (
    <div className="covid-graph">
      <svg ref={chartRef}></svg>
      <div className="container-style">
        <div className="box-style"></div>
        <p>Confirmed</p>

        <div className="box-style recovered"></div>
        <p>Recovered</p>
      </div>
    </div>
  );
};

export default CovidDataGraph;
