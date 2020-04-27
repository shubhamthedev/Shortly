const shortenIt = document.querySelector(".special-btn");
const result = document.querySelector(".result");
shortenIt.addEventListener("click", shortenLink);
result.addEventListener("click", copyToClipboard);

class Http {
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }
}
class UI {
  showResult(id, link) {
    const div = document.createElement("div");
    div.className = "result-box";
    div.innerHTML = `
    <a href="${link}" class="result-box__url">${link}</a>
    <a href="https://rel.ink/${id}" style="user-select:all" class="result-box__shorten">https://rel.ink/${id}</a>
    <button class="result-box__btn">Copy</btn>
    `;
    result.appendChild(div);
  }
  changeButtonText(copyBtn) {
    document.querySelector(".result-box__btn").innerText = "COPIED!";
  }
}
const http = new Http();
const ui = new UI();
function shortenLink(e) {
  const link = document.querySelector("#link").value;
  if (link === "") {
    console.log("Please enter a valid link");
  } else {
    const data = { url: link };
    http
      .post("https://rel.ink/api/links/", data)
      .then((res) => ui.showResult(res.hashid, link))
      .catch((err) => console.log(err));
  }
  e.preventDefault();
}
function copyToClipboard(e) {
  if (e.target.classList.contains("result-box__btn")) {
    ui.changeButtonText();
  }
  e.preventDefault();
}
