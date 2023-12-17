const userName = document.querySelector(".userName");
const reservatedPetsitteName = document.querySelector(
  ".reservatedPetsitteName"
);
const reservationUl = document.querySelector(".reservationUl");
const walletInput = document.querySelector(".wallet");
const reservationDate = document.querySelector(".reservationDate");
const reviewWrapper = document.querySelector(".reviewWrapper");

let userId = 0;
let petsitterId = 0;

const modal = document.getElementById("myModal");
const paintPage = (email, name, reservationInfo, wallet, Review) => {
  userName.innerText = name;
  walletInput.innerText = wallet;

  if (reservationInfo.length === 0) {
    const li = `
    <li class="list-group-item">
    <span class="reservatedPetsitteName">예약 내역이 없습니다.</span>
  </li>`;
    reservationUl.innerHTML += li;
  } else {
    reservationInfo.forEach((reservation) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", async () => {
        const deletedReservationId = li.dataset.reservationId;
        const deletedPetsitterId = li.dataset.PetsitterId;
        console.log("Deleted Reservation ID:", deletedReservationId);
        console.log(deletedPetsitterId);
        // 여기에 삭제 동작을 추가하면 됩니다.
        const res = await (
          await fetch(
            `/reservation/${deletedPetsitterId}/${deletedReservationId}`,
            {
              method: "DELETE"
            }
          )
        ).json();

        if (res.status === 200) {
          alert("예약이 취소되었습니다.");
          window.location.reload("user-profile.html");
        } else {
          alert("예약 취소에 실패했습니다.");
        }
      });
      const modalWrapper = document.querySelector(".modal-wrapper");
      const postReviewBtn = document.createElement("button");
      postReviewBtn.classList = "postReviewBtn";
      postReviewBtn.textContent = "리뷰 작성";
      postReviewBtn.addEventListener("click", (event) => {
        console.log("here");
        const today = new Date();
        console.log("날짜", event.target.parentElement.children[1].innerHTML);
        console.log(
          new Date(event.target.parentElement.children[1].innerHTML) >= today
        );
        if (
          new Date(event.target.parentElement.children[1].innerHTML) >= today
        ) {
          alert(
            "펫시터 매칭 날짜보다 이전이기 때문에 리뷰를 작성할 수 없습니다."
          );
          return;
        }
        modal.style.display = "flex";
        petsitterId = event.target.parentElement.dataset.PetsitterId;
        console.log(event.target.parentElement);
        console.log(petsitterId);
      });

      li.innerHTML = `
        <span class="reservatedPetsitteName">${
          reservation.petsitterName
        } : </span>
        <span class="reservationDate">${reservation.reservationDate.slice(
          0,
          10
        )}</span>
      `;

      li.appendChild(deleteButton);
      li.appendChild(postReviewBtn);

      // reservationId를 li의 dataset에 추가
      li.dataset.reservationId = reservation.reservationId;
      li.dataset.PetsitterId = reservation.PetsitterId;

      reservationUl.appendChild(li);
    });
  }
  console.log("리뷰", Review);

  console.log(Review.length);
  if (Review.length === 0) {
    const noReview = `<h6>작성 된 리뷰가 존재하지 않습니다.</h6>`;
    reviewWrapper.innerHTML += noReview;
  } else {
    Review.forEach((review) => {
      console.log(review);
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

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const submitBtn = document.getElementById("submitBtn");

// const modal = document.getElementById("myModal");

// openModalBtn.addEventListener("click", () => {
//   modal.style.display = "flex";
// });

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

submitBtn.addEventListener("click", async () => {
  const title = document.getElementById("postTitle").value;
  const comment = document.getElementById("postComment").value;
  const rating = document.getElementById("postReview").value;

  const data = {
    title,
    comment,
    rating,
    petsitterId
  };

  const jsonData = await (
    await fetch(
      `http://localhost:3000/petsitters/profile/${petsitterId}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
  ).json();

  // console.log("제목:", postTitle);
  // console.log("내용:", postComment);
  // console.log("별점:", postReview);

  modal.style.display = "none";
  window.location.reload();
});

const getUserInfo = async () => {
  const res = await fetch("/auth/me");
  const jsonData = await res.json();
  userId = jsonData.data.userId;
  const resposne = await (await fetch(`/auth/users`)).json();

  const { email, name, reservationInfo, wallet, Review } = resposne.data;
  paintPage(email, name, reservationInfo, wallet, Review);
};

getUserInfo();

// rating에서 실시간 range value 보여주기
const postReviewInput = document.getElementById("postReview");
const postReviewValue = document.getElementById("postReviewValue");
const postReviewLabel = document.getElementById("postReviewLabel");

postReviewInput.addEventListener("input", () => {
  const currentValue = postReviewInput.value;
  postReviewLabel.innerText = `별점: ${"⭐".repeat(currentValue)}`;
});
