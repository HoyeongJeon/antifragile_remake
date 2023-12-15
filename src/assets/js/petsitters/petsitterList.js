const container = document.querySelector("#petsitter-container");

const getPetSitters = async () => {
  const jsonData1 = await (
    await fetch("http://localhost:3000/petsitters/1")
  ).json();
  console.log("뭐임?", jsonData1);

  const sitter1 = document.createElement("div");

  sitter1.classList.add("sitter");
  const starRating1 = "⭐".repeat(Math.floor(jsonData1.data.avgRating));
  sitter1.innerHTML = `
    <div class="sitter-img">
    <img src="${jsonData1.data.Profile.profile}"></div>
    <div class="sitter-info">
    <p>마스터 : ${jsonData1.data.name}</p>
    <p>이메일 : ${jsonData1.data.email}</p>
    <p>경력 : ${jsonData1.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData1.data.Profile.introduce}</p>
    <p>평점 : ${starRating1}</p>
    </div>
`;
  sitter1.addEventListener("click", () => {
    window.location.href = "http://localhost:3000";
  });

  container.appendChild(sitter1);

  const jsonData2 = await (
    await fetch("http://localhost:3000/petsitters/2")
  ).json();
  console.log("뭐임?", jsonData2);

  const sitter2 = document.createElement("div");

  sitter2.classList.add("sitter");

  const starRating2 = "⭐".repeat(Math.floor(jsonData1.data.avgRating));
  sitter2.innerHTML = `
    <div class="sitter-img">
    <img src="${jsonData2.data.Profile.profile}"></div>   
     <div class="sitter-info">
    <p>마스터 : ${jsonData2.data.name}</p>
    <p>이메일 : ${jsonData2.data.email}</p>
    <p>경력 : ${jsonData2.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData2.data.Profile.introduce}</p>
    <p>평점 : ${starRating2}</p>
    </div>
`;

  sitter2.addEventListener("click", () => {
    window.location.href = "http://localhost:3000";
  });

  container.appendChild(sitter2);

  const jsonData3 = await (
    await fetch("http://localhost:3000/petsitters/3")
  ).json();
  console.log("뭐임?", jsonData3);

  const sitter3 = document.createElement("div");

  sitter3.classList.add("sitter");

  const starRating3 = "⭐".repeat(Math.floor(jsonData1.data.avgRating));
  sitter3.innerHTML = `
    <div class="sitter-img">
    <img src="${jsonData3.data.Profile.profile}"></div>    
    <div class="sitter-info">
    <p>마스터 : ${jsonData3.data.name}</p>
    <p>이메일 : ${jsonData3.data.email}</p>
    <p>경력 : ${jsonData3.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData3.data.Profile.introduce}</p>
    <p>평점 : ${starRating3}</p>
    </div>
`;

  sitter3.addEventListener("click", () => {
    window.location.href = "http://localhost:3000";
  });

  container.appendChild(sitter3);

  const jsonData4 = await (
    await fetch("http://localhost:3000/petsitters/4")
  ).json();
  console.log("뭐임?", jsonData4);

  const sitter4 = document.createElement("div");

  sitter4.classList.add("sitter");

  const starRating4 = "⭐".repeat(Math.floor(jsonData1.data.avgRating));
  sitter4.innerHTML = `
    <div class="sitter-img">
    <img src="${jsonData4.data.Profile.profile}"></div> 
       <div class="sitter-info">
    <p>마스터 : ${jsonData4.data.name}</p>
    <p>이메일 : ${jsonData4.data.email}</p>
    <p>경력 : ${jsonData4.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData4.data.Profile.introduce}</p>
    <p>평점 : ${starRating4}</p>
    </div>
`;

  sitter4.addEventListener("click", () => {
    window.location.href = "http://localhost:3000";
  });

  container.appendChild(sitter4);
};

getPetSitters();
