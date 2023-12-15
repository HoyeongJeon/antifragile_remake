const init = {
  monthArr: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ],
  date: new Date(),
  today: new Date(),
  setYearMonth: function (selectedDate) {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    $(".calendar-yearmonth__col").text(`${init.monthArr[month]}, ${year}`);
  },
  setDates: function (selectedDate) {
    const lastDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const firstWeek = 7 - firstDay;

    let day = 0;
    let week = 1;
    let innerHtml = '<div class="calendar-date__row">';

    for (let j = 1; j <= 7 - firstWeek; j++) {
      innerHtml = innerHtml + "<div class='calendar-date__col'></div>";
      day !== 6 ? day++ : (day = 0);
    }

    for (let i = 1; i <= lastDate; i++) {
      if (week === 1) {
        innerHtml = innerHtml + `<div class='calendar-date__col'>${i}</div>`;
        if (day === 6) {
          innerHtml = innerHtml + "</div><div class='calendar-date__row'>";
          day = 0;
          week++;
        } else {
          day++;
        }
      } else {
        innerHtml = innerHtml + `<div class='calendar-date__col'>${i}</div>`;
        if (day === 6) {
          innerHtml = innerHtml + "</div><div class='calendar-date__row'>";
          day = 0;
          week++;
        } else {
          day++;
        }
      }
    }

    if (day !== 0) {
      while (day !== 0) {
        innerHtml = innerHtml + "<div class='calendar-date__col'></div>";
        day !== 6 ? day++ : (day = 0);
      }
      innerHtml = innerHtml + "</div>";
    }

    $(".calendar-date").html(innerHtml);
  },
  drawCalendar: function () {
    const date = init.date;
    init.setYearMonth(date);
    init.setDates(date);
    if (
      date.getMonth() === init.today.getMonth() &&
      date.getFullYear() === init.today.getFullYear()
    ) {
      init.addClassToday(init.findToday(init.today));
    }
  },
  findToday: function (date) {
    const thisDay = date;
    const firstDay = new Date(
      thisDay.getFullYear(),
      thisDay.getMonth(),
      1
    ).getDay();
    const week = Math.ceil((thisDay.getDate() + firstDay) / 7);
    let day = (thisDay.getDate() % 7) + firstDay;

    if (day > 7) {
      day = day - 7;
    }

    const today = $(
      `.calendar-date>div:nth-child(${week})>div:nth-child(${day})`
    );
    return today;
  },
  addClassToday: function (today) {
    today.addClass("calendar-date__today");
  }
};

function prevMonthDraw() {
  const thisMonth = init.date.getMonth();
  const thisYear = init.date.getFullYear();

  init.date = new Date(thisYear, thisMonth - 1, 1);
  init.drawCalendar();
}

function nextMonthDraw() {
  const thisMonth = init.date.getMonth();
  const thisYear = init.date.getFullYear();

  init.date = new Date(thisYear, thisMonth + 1, 1);
  init.drawCalendar();
}

$(".calendar-yearmonth div:nth-child(1)").on("click", prevMonthDraw);
$(".calendar-yearmonth div:nth-child(3)").on("click", nextMonthDraw);

init.drawCalendar();
