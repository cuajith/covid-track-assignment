import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CovidDataGraph = ({data}) => {
  const chartRef = useRef(null);
  console.log(data)
  const obj = Object.values(data)[1];
  const totalCount = Object.values(obj)[2];
  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const width = 300;
    const height = 200;
    const margin = { top: 20, right: 150, bottom: 30, left: 20 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => Object.values(d)[0].length))
      .range([margin.left, 650 - margin.right])
      .padding(0.8);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, totalCount.confimed)])
      .nice()
      .range([height - margin.bottom, margin.top])

      const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.5));
      
    svg.selectAll("*").remove();


    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => Object.values(d)[0].length)
      .attr("y", totalCount.confirmed)
      .attr("width", x.bandwidth())
      .attr("height", totalCount.confirmed)
      .attr("fill", "forestgreen");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      // .call(d3.axisLeft(y));
  }, [data])
  return <svg ref={chartRef} width={600} height={400}></svg>;
}

export default CovidDataGraph