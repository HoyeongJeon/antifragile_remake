const container = document.querySelector("#petsitter-container");

const getPetSitters = async () => {
  const generateStarRating = (rating) => {
    if (rating <= 0) {
      return "평점 없음";
    }
    return "⭐".repeat(Math.floor(rating));
  };

  const fetchAndRenderSitter = async (sitterNumber) => {
    const jsonData = await (
      await fetch(`http://localhost:3000/petsitters/${sitterNumber}`)
    ).json();

    const sitter = document.createElement("div");
    sitter.classList.add("sitter");

    const starRating = generateStarRating(jsonData.data.avgRating);

    sitter.innerHTML = `
    <div onclick="location.href='http://localhost:3000'" style="cursor:pointer">
      <div class="sitter-img">
        <img src="${jsonData.data.Profile.profile}">
      </div>
      <div class="sitter-info">
        <p>마스터 : ${jsonData.data.name}</p>
        <p>이메일 : ${jsonData.data.email}</p>
        <p>경력 : ${jsonData.data.Profile.career}년</p>
        <p>한 줄 소개 : ${jsonData.data.Profile.introduce}</p>
        <p>평점 : ${starRating}</p>
      </div>
      </div>
    `;

    container.appendChild(sitter);
  };

  await fetchAndRenderSitter(1);
  await fetchAndRenderSitter(2);
  await fetchAndRenderSitter(3);
  await fetchAndRenderSitter(4);
};

getPetSitters();
