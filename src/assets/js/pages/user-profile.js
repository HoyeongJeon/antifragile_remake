const userName = document.querySelector(".userName");
const reservatedPetsitteName = document.querySelector(
  ".reservatedPetsitteName"
);
const reservationUl = document.querySelector(".reservationUl");
const walletInput = document.querySelector(".wallet");
const reservationDate = document.querySelector(".reservationDate");
const reviewWrapper = document.querySelector(".reviewWrapper");
let userId = 0;

const paintPage = (email, name, reservationInfo, wallet, Review) => {
  userName.innerText = name;
  walletInput.innerText = wallet;

  console.log("리뷰", Review);

  if (reservationInfo.length === 0) {
    const li = `
    <li class="list-group-item">
    <span class="reservatedPetsitteName">예약 내역이 없습니다.</span>
  </li>`;
    reservatedPetsitteName.innerText = `
    <li class="list-group-item">
    <span class="reservatedPetsitteName">예약 내역이 없습니다.</span>
  </li>`;
    reservationUl.innerHTML += li;
  } else {
    reservationInfo.forEach((reservation) => {
      const li = `
      <li class="list-group-item">
      <span class="reservatedPetsitteName">${
        reservation.petsitterName
      } : </span>
      <span class="reservationDate">${reservation.reservationDate.slice(
        0,
        10
      )}</span>
    </li>
      `;
      reservationUl.innerHTML += li;
    });
  }

  if (Review.length === 0) {
    const noReview = `<h6>작성 된 리뷰가 존재하지 않습니다.</h6>`;
    reviewWrapper.innerHTML += noReview;
  } else {
    Review.forEach((review) => {
      const yesReview = `
      <div class="card review-card">
      <div class="card-header">
        To <span class="reviewPetsitteName">${review.Petsitter.name}</span>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>${review.comment}</p>
          <footer class="blockquote-footer reviewReservationDate">
            ${review.createdAt.slice(0, 10)}
          </footer>
        </blockquote>
      </div>
    </div>
      `;
      reviewWrapper.innerHTML += yesReview;
    });
  }
};

const getUserInfo = async () => {
  const res = await fetch("/auth/me");
  const jsonData = await res.json();
  userId = jsonData.data.userId;
  const resposne = await (await fetch(`/auth/users`)).json();

  const { email, name, reservationInfo, wallet, Review } = resposne.data;
  paintPage(email, name, reservationInfo, wallet, Review);
};

getUserInfo();
