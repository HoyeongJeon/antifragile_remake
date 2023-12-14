const $container = document.querySelector("#container");
const $petSitterDiv = document.querySelector(".petsitter-Info");
const $reservationDiv = document.querySelector("/reservation-Info");
const $reviewDiv = document.querySelector(".review-Info");

const getPetSitters = async () => {
  const jsonData = await (
    await fetch("http://localhost:3000/petsitters/")
  ).json();

  const sitter = jsonData.data;
  const petsitterInfo = document.querySelector(".sitters-container");

  // sitters.forEach((sitter) => {
  //   const sitterCard = document.createElement("div");
  //   sitterCard.classList.add("sitter-card");
  //   sitter.profile = sitter.profile.replace("%22", "");
  //   console.log(sitter.profile);
  //   sitterCard.innerHTML = `
  //         <div class="sitter-img">
  //         <img src=/${sitter.profile} alt="${sitter.name}" />
  //         </div>
  //         <div class="sitter-info">
  //         <h3 class="sitter-name">${sitter.name}</h3>
  //         <p class="sitter-email">${sitter.email}</p>
  //         <p class="sitter-phone">${sitter.phone}</p>
  //         <p class="sitter-address">${sitter.address}</p>
  //         </div>
  //     `;
  //   sittersContainer.appendChild(sitterCard);
  // });
};
