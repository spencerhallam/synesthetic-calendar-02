// http://bl.ocks.org/bycoffe/3404776
// const nowz = new Date();

// const myday = nowz.getDate();
// console.log("myday:", myday)

// function logDate(datex){
//   const myday = datex.getDate();
//   const mymonth = datex.getMonth();
//   const myyear = datex.getFullYear();
  
//   console.log("logged Date: ", mymonth + "/" + myday + "/" + myyear);
// }

function createYearArray(){
  const dataArray = []
  let now = new Date();
  let start = now.getTime();
  let formatnow = new Date(start);
  let nextyear = formatnow.getMonth() + "/" + (formatnow.getDate()) + "/" +  (formatnow.getFullYear() + 1);
  let nystandard = new Date(nextyear);
  let nextyearmilli = nystandard.getTime();
  let daymils = 86400000;
  for(let i = 0; i < 370; i++){
    let disday = start + (daymils*i)
    if(disday < nextyearmilli){
      dataArray.push(disday);
    }
  }

  return dataArray
}
// Utility Functions

const convertToDayOfTheWeek = (day) => {
  if(day === 0){
    return "Sunday";
  } else if(day === 1){
    return "Monday";
  } else if(day === 2){
    return "Tuesday";
  } else if(day === 3){
    return "Wednesday";
  } else if(day === 4){
    return "Thursday";
  } else if(day === 5){
    return "Friday";
  } else if(day === 6){
    return "Saturday";
  } else {
    return "not found";
  }
}

const monthNumToName = (month) => {
  if(month === 1){
    return "Jan";
  } else if(month === 2){
    return "Feb";
  } else if(month === 3){
    return "Mar";
  } else if(month === 4){
    return "Apr";
  } else if(month === 5){
    return "May";
  } else if(month === 6){
    return "Jun";
  } else if(month === 7){
    return "Jul";
  } else if(month === 8){
    return "Aug";
  } else if(month === 9){
    return "Sep";
  } else if(month === 10){
    return "Oct";
  } else if(month === 11){
    return "Nov";
  } else if(month === 12){
    return "Dec";
  } else {
    return "not found";
  }
}

const toggle = (obj) => {
        var item = document.getElementById(obj);
        if(item.style.display == 'block') { item.style.display = 'none', item.style.cursor = 'pointer' }
        else { item.style.display = 'block'; }
      }


function createYearObjectArray(){

  function SynMonth (date, milliseconds, formatOne, createdOrder, daydate, month, weekday, fullYear, xcoord, ycoord, code) {
    this.date = date;
    this.milliseconds = milliseconds;
    this.formatOne = formatOne;
    this.createdOrder = createdOrder;
    this.daydate = daydate;
    this.month = month;
    this.weekday = weekday;
    this.fullYear = fullYear;
    this.dayName = convertToDayOfTheWeek(weekday);
    this.monthName = monthNumToName(month);
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.code = code;
  }

  const dataArray = []
  let now = new Date();
  let start = now.getTime();
  let formatnow = new Date(start);
  let nextyear = (formatnow.getMonth() + 1) + "/" + (formatnow.getDate()) + "/" +  (formatnow.getFullYear() + 1);
  let nystandard = new Date(nextyear);
  let nextyearmilli = nystandard.getTime();
  let daymils = 86400000;

  for(let i = 0; i < 366; i++){
    let disday = start + (daymils*i);
    let standard = new Date(disday);
    let daydatei = standard.getDate();
    let theYear = standard.getFullYear();
    console.log('daydatei', daydatei);
    let slashFormat = (standard.getMonth() + 1) + "/" + (standard.getDate()) + "/" +  (standard.getFullYear());
    console.log('slashFormat', slashFormat);
    let currDayFormat = (formatnow.getMonth() + 1) + "/" + (formatnow.getDate()) + "/" +  (formatnow.getFullYear());
    let isToday = slashFormat === currDayFormat ? "today" : "otherday";
    let monthId = standard.getMonth() + 1;
    let dayId = standard.getDay();//day of the week
    let radius = 1200;
    let width = (radius * 2) + 50;
    let height = (radius * 2) + 50;
    let anglechange = 10.471975511965978;
    let angle = ((i / (366/2)) * Math.PI) + anglechange; // Calculate the angle at which the element will be placed.
                                              // For a semicircle, we would use (i / numNodes) * Math.PI.
    let xspot = (radius * Math.cos(angle)) + (width/2); // Calculate the x position of the element.
    console.log('Math.cos(angle)', Math.cos(angle));
    console.log("angle", angle);
    let yspot = (radius * Math.sin(angle)) + (width/2); // Calculate the y position of the element.
    const dayNode = new SynMonth(standard, disday, slashFormat, i, daydatei, monthId, dayId, theYear, xspot, yspot, isToday);
    if(disday < nextyearmilli){
      dataArray.push(dayNode);
    }
  }

  return dataArray
}

function formatYear(arrayx){
    let yoyo = arrayx.map(function(index){
    let mynumtodate = new Date(index);
    let myday = mynumtodate.getDate();
    let mymonth = mynumtodate.getMonth() + 1;
    let myyear = mynumtodate.getFullYear();
    return mymonth + "/" + myday + "/" + myyear;
  })
  return yoyo;
}

const yearArray = createYearArray(); //stores array of milliseconds for each day
const yearObjectArray = createYearObjectArray()
console.log("xy?", yearObjectArray);
const formattedYear = formatYear(yearArray); //stores array of formatted dates
console.log(yearObjectArray);

// rendered html
window.onload = (e) => {

    function renderyear(alldays){
      
    const markup = `
          ${ alldays.map(day => `
          <div class="daynode month-${day.month} weekday-${day.dayName}">
            <div class="day-name">${day.dayName} | ${day.monthName}</div>
            <div class="day-date">${day.daydate}</div>
          </div>`).join('') }
      `;
    const markup2 = `
          ${ alldays.map(day => `
              <circle id="day-node" class="month-${day.month} ${day.code} ${day.createdOrder} weekday-${day.dayName}" onmouseover="toggle('day-info-${day.createdOrder}');" onmouseout="toggle('day-info-${day.createdOrder}');" fill-opacity="${((366-day.createdOrder)*0.02173224043)}" cx="${day.xcoord}" cy="${day.ycoord}" r="10" />
              <text class="text-${day.code} weekday-${day.dayName}" x="${day.xcoord}" y="${day.ycoord}" onmouseover="toggle('day-info-${day.createdOrder}');" onmouseout="toggle('day-info-${day.createdOrder}');" text-anchor="middle" font-size="10px" font-family="Arial" dy=".3em">${day.daydate}</text>    
          `).join('') }
      `;

     const headerMarkup = `
       ${ alldays.map(day => `
          
              <div class="day-info" id="day-info-${day.createdOrder}" style="display: ${day.code === "today" ? "block" : "none"}">
              <div id="flex-header">
              <svg width="30" height="30" style="display: inline;">
              <circle id="day-node" class="month-${day.month} ${day.code} ${day.createdOrder} weekday-${day.dayName}" cx="12" cy="12" r="10" />
              </svg>  
                <div class="date-heading monthfont-${day.month}">${day.dayName}, ${day.monthName} ${day.daydate}, ${day.fullYear}</div> 
              </div>
                ${"Node Data: <strong>alt: </strong>" + day.formatOne + " , " + 
                "<strong>ms:</strong> " + day.milliseconds + " , " + 
                "<strong>created:</strong> " + day.createdOrder + " , " + 
                "<strong>date:</strong> " + day.daydate + " , " + 
                "<strong>mo-index:</strong> " + day.month + " , " + 
                "<strong>weekday-index:</strong> " + day.weekday + " , " + 
                "<strong>day-name:</strong> " + day.dayName + " , " + 
                "<strong>month-name:</strong> " + day.monthName + " , " + 
                "<strong>x-coord:</strong> " + day.xcoord + " , " + 
                "<strong>y-coord:</strong> " + day.ycoord + " , " + 
                "<strong>day-code:</strong> " + day.code 
                }
                </div>
                ${day.code === "today" ? "<p class='underline'><i>Selected Day: </i></p>" : ""}
          
          `).join('') }

     `; 
     
      document.getElementById("svg-wrapper").innerHTML = markup2;
      document.getElementById("info-box").innerHTML = headerMarkup;
      //document.getElementById("container").innerHTML = markup2;


    }
    
    
    

    function renderInfo(){}//this should render day object info in header
    renderyear(yearObjectArray);
  }

