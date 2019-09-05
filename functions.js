
const nowz = new Date();

const myday = nowz.getDate();
console.log("myday:", myday)

function logDate(datex){
  const myday = datex.getDate();
  const mymonth = datex.getMonth();
  const myyear = datex.getFullYear();
  
  console.log("logged Date: ", mymonth + "/" + myday + "/" + myyear);
}

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
    return "sun";
  } else if(day === 1){
    return "mon";
  } else if(day === 2){
    return "tue";
  } else if(day === 3){
    return "wed";
  } else if(day === 4){
    return "thu";
  } else if(day === 5){
    return "fri";
  } else if(day === 6){
    return "sat";
  } else {
    return "not found";
  }
}

const monthNumToName = (month) => {
  if(month === 1){
    return "jan";
  } else if(month === 2){
    return "feb";
  } else if(month === 3){
    return "mar";
  } else if(month === 4){
    return "apr";
  } else if(month === 5){
    return "may";
  } else if(month === 6){
    return "jun";
  } else if(month === 7){
    return "jul";
  } else if(month === 8){
    return "aug";
  } else if(month === 9){
    return "sep";
  } else if(month === 10){
    return "oct";
  } else if(month === 11){
    return "nov";
  } else if(month === 12){
    return "dec";
  } else {
    return "not found";
  }
}


function createYearObjectArray(){

  function SynMonth (date, milliseconds, formatOne, createdOrder, daydate, month, weekday) {
    this.date = date;
    this.milliseconds = milliseconds;
    this.formatOne = formatOne;
    this.createdOrder = createdOrder;
    this.daydate = daydate;
    this.month = month;
    this.weekday = weekday;
    this.dayName = convertToDayOfTheWeek(weekday);
    this.monthName = monthNumToName(month);
  }

  const dataArray = []
  let now = new Date();
  let start = now.getTime();
  let formatnow = new Date(start);
  let nextyear = (formatnow.getMonth() + 1) + "/" + (formatnow.getDate()) + "/" +  (formatnow.getFullYear() + 1);
  let nystandard = new Date(nextyear);
  let nextyearmilli = nystandard.getTime();
  let daymils = 86400000;

  for(let i = 0; i < 370; i++){
    let disday = start + (daymils*i);
    let standard = new Date(disday);
    let daydatei = standard.getDate();
    let slashFormat = (standard.getMonth() + 1) + "/" + (standard.getDate()) + "/" +  (standard.getFullYear());
    let monthId = standard.getMonth() + 1;
    let dayId = standard.getDay();//day of the week
    const dayNode = new SynMonth(standard, disday, slashFormat, i, daydatei, monthId, dayId);
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
      document.getElementById("container").innerHTML = markup;
    }
    function renderInfo(){}//this should render day object info in header
    renderyear(yearObjectArray);
  }

