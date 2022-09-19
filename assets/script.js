// Displays the current day, month and year
var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// time blocks for business hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// Returns string 
var currentHour = parseInt(moment().format("H"));

// Keeps scheduled events in blocks
var loadEvents = function (timeSlots) {

  // each element is an instance of the time, text obj
  timeSlots.forEach((element) => {
    console.log(element);
    let text = localStorage.getItem(parseInt(element.time));
    console.log(text);
    if (text) {
      element.text.val(text);
    }
  });
};

var fetchEvents = function () {
  var tempArr = [];
  // array iterator method
  $("textarea").each(function (index, elem) {
    tempArr.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  loadEvents(tempArr);
};

// Timeblocks color status reflect past, present and future
$("textarea").each(function () {
  var $this = $(this);
  var id = parseInt($this.attr("id"));

  if (id < currentHour) {
    $(this).addClass("past");
  }
  if (id > currentHour) {
    $(this).addClass("future");
  }
  if (id === currentHour) {
    $(this).addClass("present");
  }
});

// Click the lock button to save events
$("button.saveBtn").click(function (event, loadEvents) {
  event.preventDefault();

  // the current button being clicked
  var $element = $(this).siblings("textarea");
  // Grab time from id attribute
  var time = $element.attr("id");
  console.log(time);
  // Grab text content
  var text = $element.val().trim();
  console.log(text);

  // Save events to localStorage
  if (time && text !== "") {
    console.log(time, text);
    localStorage.setItem(time, text);
  }
});

$(".saveBtn").hover(function () {
  $(this).addClass("saveBtn:hover");
});

fetchEvents();