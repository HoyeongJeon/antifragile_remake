const $mainContainer = document.querySelector("#container");
const $petsitterInfoDiv = document.querySelector(".petsitter-info");
const $reservationDiv = document.querySelector(".reservation");
const $reviewDiv = document.querySelector(".review");
const $calendarDateCol = document.querySelectorAll(".calendar-date__col");
const $calendarYearMonthCol = document.querySelector(
  ".calendar-yearmonth__col"
);

const urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get("id");

const getPetSitters = async () => {
  const jsonData = await (
    await fetch(`http://localhost:3000/petsitters/${sitterId}`)
  ).json();

  const sitter = jsonData.data;

  const sitterInfoDiv = document.createElement("div");

  sitterInfoDiv.classList.add("sitter");

  sitterInfoDiv.innerHTML = `
        <div class="sitter-info">
        <img
        src="${sitter.Profile.profile}"
        class="card-img-top"
        alt="..."
        style="height: 430px"
      />
        <h3 class="sitter-name"> ${sitter.name}</h3>
        <p class="sitter-email">${sitter.email}</p>
        <p class="sitter-career">${sitter.Profile.career}</p>
        <p class="sitter-avgRating"> ${"⭐".repeat(
          Math.floor(sitter.avgRating)
        )}</p>
        </div>
    `;
  $petsitterInfoDiv.appendChild(sitterInfoDiv);
};

// 페이지가 열리면서 바로 실행되도록 구현 (버튼이 아니기 때문)
getPetSitters();

const getReservation = async () => {
  const jsonData = await (
    await fetch(`http://localhost:3000/reservation/${sitterId}`)
  ).json();

  const reservation = jsonData.data;

  // 예약불가능한 날짜(이미 예약이 차있는 날짜)에는 달력에 색 표시
  reservation.forEach((el) => {
    $calendarDateCol.forEach((v) => {
      const reservedDate = el.reservationDate
        .split("")
        .slice(8, 10)
        .reduce((prev, curr) => prev + curr, "");
      if (v.innerHTML === reservedDate) {
        v.style.backgroundColor = "#ff8585";
      }
    });
  });

  //현재 날짜 이전 날짜에는 달력에 색 표시
  $calendarDateCol.forEach((v) => {
    const todayWithTime = new Date();
    const today = todayWithTime
      .split("")
      .slice(8, 10)
      .reduce((prev, curr) => prev + curr, "");

    if (+v.innerHTML <= +today) {
      v.style.backgroundColor = "ff8585";
    }
  });
};
document.addEventListener("DOMContentLoaded", getReservation);
// getReservation();

const getReviews = async () => {
  const jsonData = await (
    await fetch(`http://localhost:3000/petsitters/${sitterId}`)
  ).json();

  const review = jsonData.data.Review;

  review.forEach((el) => {
    const reservationDiv = document.createElement("div");

    reservationDiv.classList.add("sitter");
    console.log("el.title", el.title);
    reservationDiv.innerHTML = `
          <div class="review-info">

          <p class="sitter-rating">${el.comment}</p>
          <p class="sitter-review">${"⭐".repeat(el.rating)}</p>

          </div>
      `;
    $reviewDiv.appendChild(reservationDiv);
  });
};
getReviews();
