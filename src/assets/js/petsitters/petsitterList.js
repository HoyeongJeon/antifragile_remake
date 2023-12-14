const container = document.querySelector("#petsitter-container");

const getPetSitters = async () => {
  const jsonData1 = await (
    await fetch("http://localhost:3000/petsitters/1")
  ).json();
  console.log("뭐임?", jsonData1);

  const sitter1 = document.createElement("div");

  sitter1.classList.add("sitter");

  sitter1.innerHTML = `
    <div class="sitter-img">
    <img src="https://storage.enuri.info/pic_upload/knowbox/mobile_img/202110/2021100911564855416.png"></div>
    <div class="sitter-info">
    <p>마스터 : ${jsonData1.data.name}</p>
    <p>이메일 : ${jsonData1.data.email}</p>
    <p>경력 : ${jsonData1.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData1.data.Profile.introduce}</p>
    <p>평점 : ${jsonData1.data.avgRating}</p>
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

  sitter2.innerHTML = `
    <div class="sitter-img">
    <img src="https://mblogthumb-phinf.pstatic.net/MjAxODA2MTRfMjg5/MDAxNTI4OTUyNDkxMzY1.P3uixnKRQwvfp_dtQuBqX_20DtGiFCR4b6TQNj1xk7wg.O7IXw4ZIg546FxgfGek92Yo6D7hfjBkV4Ph2eLnvUA8g.PNG.dudbd13/%EC%9B%83%EA%B8%B4%EC%82%AC%EC%A7%84_3_%283%29.png?type=w800"></div>
    <div class="sitter-info">
    <p>마스터 : ${jsonData2.data.name}</p>
    <p>이메일 : ${jsonData2.data.email}</p>
    <p>경력 : ${jsonData2.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData2.data.Profile.introduce}</p>
    <p>평점 : ${jsonData2.data.avgRating}</p>
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

  sitter3.innerHTML = `
    <div class="sitter-img">
    <img src="https://image.ytn.co.kr/general/jpg/2017/1107/201711071050061704_d.jpg"></div>
    <div class="sitter-info">
    <p>마스터 : ${jsonData3.data.name}</p>
    <p>이메일 : ${jsonData3.data.email}</p>
    <p>경력 : ${jsonData3.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData3.data.Profile.introduce}</p>
    <p>평점 : ${jsonData3.data.avgRating}</p>
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

  sitter4.innerHTML = `
    <div class="sitter-img">
    <img src="https://pbs.twimg.com/media/EWirLsnUwAUXjr0?format=jpg&name=small"></div>
    <div class="sitter-info">
    <p>마스터 : ${jsonData4.data.name}</p>
    <p>이메일 : ${jsonData4.data.email}</p>
    <p>경력 : ${jsonData4.data.Profile.career}년</p>
    <p>한 줄 소개 : ${jsonData4.data.Profile.introduce}</p>
    <p>평점 : ${jsonData4.data.avgRating}</p>
    </div>
`;

  sitter4.addEventListener("click", () => {
    window.location.href = "http://localhost:3000";
  });

  container.appendChild(sitter4);
};

getPetSitters();
