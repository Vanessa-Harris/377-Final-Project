function initBar(){

    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Parse the Data

    d3.json("https://api.umd.io/v1/bus/routes/116/schedules").then ( function(data) {
    //( function(data) {
      // sort data
      data.sort(function(a,b,c,d,e) {
        return a.Value - b.Value;
      });
    
      // X axis
      const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(d => d.title))
        .padding(0.2);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
    
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 13000])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
    
      // Bars
      svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", d => x(d.title))
          .attr("y", d => y(d.Value))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.Value))
          .attr("fill", "#69b3a2")
    
    })

    return carto;

}

async function mainEvent(){
    const form = document.querySelector(".main_form");
    const carto = initBar();
  
    const results = await fetch(
        "https://api.umd.io/v1/bus/routes/116/schedules"
      );
    // This changes the response from the GET into data we can use - an "object"
    const storedList = await results.json();


}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests

