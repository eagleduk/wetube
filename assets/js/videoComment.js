import axios from "axios";

const formComment = document.querySelector("#jsAddComment");

const increseNumber = () => {
  const span = document.querySelector("#jsCommentNumber");
  span.innerHTML = parseInt(span.innerHTML) + 1;
};

const addCommentElement = (comment) => {
  const ul = formComment.querySelector("ul");

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);

  ul.prepend(li);

  increseNumber();
};

const addComment = async () => {
  const inputComment = formComment.querySelector("input");
  const comment = inputComment.value;
  const videoId = window.location.href.split("/videos/")[1];
  const url = `/api/${videoId}/comment`;
  const response = await axios({
    url,
    method: "POST",
    data: {
      comment,
    },
  });

  if (response.status === 200) {
    inputComment.value = "";
    addCommentElement(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  addComment();
};

function init() {
  formComment.addEventListener("submit", handleSubmit);
}

formComment && init();
