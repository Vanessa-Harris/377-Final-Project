function initBar() {
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Simple Column Chart with Index Labels",
      },
      axisY: {
        includeZero: true,
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelFontSize: 16,
          indexLabelPlacement: "outside",
          dataPoints: [
            { label: "105 Campus Connector", y: 71 },
            { label: "116 Purple", y: 55 },
            { label: "104 College Park Metro", y: 50 },
            { label: "108 Adelphi", y: 65 },
            { label: "115 Organge", y: 92, indexLabel: "\u2605 Highest" },
            { label: "118 Gold", y: 21, indexLabel: "\u2691 Lowest" },
          ],
        },
      ],
    });
    chart.render();
  };

  
}

async function mainEvent() {
  const form = document.querySelector(".main_form");
  const loadDataButton = document.querySelector("#data_load");
  
  const carto = initBar();

  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("Loading data"); // this is substituting for a "breakpoint"


    const results = await fetch("https://api.umd.io/v1/bus/routes/108/schedules");

    // This changes the response from the GET into data we can use - an "object"
    const storedList = await results.json();
    console.log(storedList);
    //localStorage.setItem('storedData', JSON.stringify(storedList));


   //  console.table(storedList); // this is called "dot notation"
  

  });

  //Problem #1: I need to create a function that finds the frequency of a stop name
  // in each bus's schedule api. ie. how many times does this bus stop at STAMP?
  // first step = 
  //Problem #2: I need to create an array that contains each bus name as x and 
  //and the amount of time that bus goes to a selected stop . this array should
  //change each time the user selects a new stop since it now must calculate a 
  //different set of frequencies.
  //lab 6 or 5, shows how to access data
  //1st firgur why 12
// how to extract data ie. stop_id
// use a list of strongs where each string is a concatanation of bus number and stop id
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
