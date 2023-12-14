const $mainContainer = document.querySelector("#container");
const $petsitterInfoDiv = document.querySelector(".petsitter-info");
const $reservationDiv = document.querySelector(".reservation");
const $reviewDiv = document.querySelector(".review");

const getPetSitters = async () => {
  const jsonData = await (
    await fetch("http://localhost:3000/petsitters/1")
  ).json();
  console.log(jsonData);

  const sitter = jsonData.data;

  const sitterInfoDiv = document.createElement("div");

  sitterInfoDiv.classList.add("sitter");

  sitterInfoDiv.innerHTML = `
        <div class="sitter-info">
        <h3 class="sitter-name">${sitter.name}</h3>
        <p class="sitter-email">${sitter.email}</p>
        <p class="sitter-career">${sitter.career}</p>
        <p class="sitter-avgRating">${sitter.avgRating}</p>
        </div>
    `;
  $petsitterInfoDiv.appendChild(sitterInfoDiv);
};

// 페이지가 열리면서 바로 실행되도록 구현 (버튼이 아니기 때문)
getPetSitters();

const getReservation = async () => {
  const jsonData = await (
    await fetch("http://localhost:3000/reservation/1")
  ).json();
  console.log(jsonData);
};

const getReviews = async () => {
  const jsonData = await await fetch(
    "http://localhost:3000/profile/:petsitterId/review/:reviewId"
  );
  console.log(jsonData);
};
