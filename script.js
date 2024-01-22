const days = document.querySelector(".days");
const currentDate = document.querySelector(".current");
const prevNextIcon = document.querySelectorAll(".symbols");
const selectedDatesContainer = document.querySelector(".selected-dates");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let selectedDates = [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarData = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayofMonth = new Date(currYear,currMonth,lastDateofMonth).getDay();
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const isToday = i === date.getDate() && currMonth === date.getMonth() &&
    currYear === date.getFullYear()? "active": "";
    const isSelected = selectedDates.includes( `${currYear}-${currMonth + 1}-${i}`)? "selected": "";
    liTag += `<li class="${isToday} ${isSelected}" data-date="${currYear}-${
      currMonth + 1
    }-${i}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  days.innerHTML = liTag;

  // Attach a click event listener to each day
  days.querySelectorAll("li").forEach((day) => {day.addEventListener("click", toggleDateSelection);});
};

const toggleDateSelection = (event) => {
  const selectedDate = event.currentTarget.dataset.date;
  if (selectedDates.includes(selectedDate)) {
    selectedDates = selectedDates.filter((date) => date !== selectedDate);
  } else {
    selectedDates.push(selectedDate);
  }

  CalendarData();
  renderSelectedDates();
};

const renderSelectedDates = () => {
  // Render the selected dates below the calendar
  selectedDatesContainer.innerText = selectedDates.join(", ");
};

const updateDate = (change) => {
  currMonth += change;
  if (currMonth < 0 || currMonth > 11) {
    date = new Date(currYear, currMonth, date.getDate());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    date = new Date();
  }
  CalendarData();
};

CalendarData();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    updateDate(icon.id === "prev" ? -1 : 1);
  });
});
