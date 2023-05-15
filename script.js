function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#agency_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li>${Object.values(item)}</li>`;
    target.innerHTML += str;
  });
}
function filterList(list, query) {
  //query = passed in value

  /*   return list.filter((item)=> {
    return item.sum_amount >= query
  }); */
  return list.filter((item) => item.sum_amount >= query);
}
/* function cutAgencyList(list){
  console.log('fired cut list');
  const range = [...Array(15).keys()];
  return (newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  }));
} */
function initBar(array) {
  console.log("fired intitBar");
  console.log("print array: ", array);
  console.log("values?? : ", Object.values(array));
  /* window.onload =*/ function charter() {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Spend By Agency",
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
          indexLabel: "{agency}, {sum_amount}",

          dataPoints: [
            { label: "MANAGEMENT & BUDGET", y: 11273.38 },
            {
              label: "PERMITTING, INSPECTIONS & ENFORCEMENT",
              y: 6305488.78,
            },
            {
              label: "CITEZEN COMPLIANT OVERSIGHT PANEL",
              y: 2148.58,
            },
            { label: "SOIL CONSERVATION", y: 7239.61 },
            { label: "HOMELAND SECURITY", y: 14014205.63 },
            { label: "CENTRAL SERVICES", y: 44508550.50 },
            { label: "FIRE/EMS", y: 20574216.09 },
            { label: "REIMBURSABLE BILLINGS", y: 13.76 },
            { label: "CORRECTIONS", y: 10588944.55 },
            { label: "FINANCE", y: 1717535.38 },
            { label: "ORPHAN'S COURT", y: 13354.33 },
            { label: "HOUSING", y: 2960928.92 },
            { label: "STATE'S ATTORNEY", y: 632079.01 },
            {
              label: "PUBLIC WORKS & TRANSPORTATION",
              y: "135086757.49",
            },
            { label: "COUNTY EXECUTIVE", y: 131404.24 },
            { label: "NON-DEPARTMENTAL", y: 49196137.10 },
            { label: "ETHICS & ACCOUNTABILITY", y: 11272.24 },
            //{ label: "EDUCATION", y: 923984248.31 },
            { label: "HUMAN RESOURCES", y: 1269930.11 },
            { label: "PERSONNEL BOARD", y: 3759.65 },
            { label: "ELECTIONS", y: 268257.82 },
            { label: "HEALTH", y: 20562452.40 },
            { label: "ENVIRONMENT", y: 147332773.65 },
            { label: "CIRCUIT COURT", y: 1792390.20 },
            { label: "POLICE", y: 19288965.41 },
            { label: "SOCIAL SERVICES", y: 8409513.65 },
            { label: "COMMUNITY RELATIONS", y: 99585.55 },
            { label: "SHERIFF", y: 1133334.99 },
            { label: "LICENSE COMMISIONERS", y: 21933.13 },
            { label: "INFORMATION TECHNOLOGY", y: 31901573.39 },
            { label: "LAW", y: 94426.77 },
            { label: "COUNTY COUNCIL", y: 2093509.81 },
            { label: "FAMILY SERVICES", y: 7054452.34 },
          ],
          //[Object.values(array)],

          /* dataPoints: [
            { label: "105 Campus Connector", y: 71 },
            { label: "116 Purple", y: 55 },
            { label: "104 College Park Metro", y: 50 },
            { label: "108 Adelphi", y: 65 },
            { label: "115 Organge", y: 92, indexLabel: "\u2605 Highest" },
            { label: "118 Gold", y: 21, indexLabel: "\u2691 Lowest" },
          ] , */
        },
      ],
    });
    chart.render();
  }
  charter();
}

async function mainEvent() {
  const form = document.querySelector(".main_form");
  const loadDataButton = document.querySelector("#data_load");
  const filterDataButton = document.querySelector("#data_filter");

  let currentList = [];


  
  //const currentList = await results.json();




  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something
    console.log("Loading data"); // this is substituting for a "breakpoint"

    const results = await fetch(
      "https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json?$select=agency,sum(amount)&$group=agency");
    const storedList = await results.json();
    localStorage.setItem('storedData', JSON.stringify(storedList));
    parsedData = storedList;
    
    if (parsedData?.length > 0) {
      //generateListButton.classList.remove('hidden');
    }


    console.table(storedList);
    injectHTML(storedList)
    //localStorage.setItem('storedData', JSON.stringify(storedList));

    //  console.table(storedList); // this is called "dot notation"
  });

  filterDataButton.addEventListener("click", (event) => {
    currentList = parsedData;

    console.log("currentlist 1: ", currentList);
    console.table(currentList);
    
    console.log("clicked FilterButton");

    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData); //short for form properties

    console.log("formProps: ", formProps);
    console.log("currentlist: ", currentList);
    const newList = filterList(currentList, parseInt(formProps.amount));
    injectHTML(newList)
    //console.log("new list: ", newList);

    const array_newList = Object.values(newList);
    //const tester_array= Object.values(filterList(currentList, parseInt(formProps.amount)))
    //console.log("array_newList: ", array_newList)
    //console.log(typeof array_newList)
/*     const points = [
      { label: "105 Campus Connector", y: 71 },
      { label: "116 Purple", y: 55 },
      { label: "104 College Park Metro", y: 50 },
      { label: "108 Adelphi", y: 65 },
      { label: "115 Organge", y: 92 },
      { label: "118 Gold", y: 21 },
    ]; */

    initBar(array_newList);

    //console.log(array_newList)
    // console.log(newList);
    //injectHTML(newList);
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
