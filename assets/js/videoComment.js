import axios from "axios";

const formComment = document.querySelector("#jsAddComment");
const commentList = document.querySelector("#jsCommentList");

const increseNumber = () => {
  const span = document.querySelector("#jsCommentNumber");
  span.innerHTML = parseInt(span.innerHTML) + 1;
};

const decreseNumber = () => {
  const span = document.querySelector("#jsCommentNumber");
  span.innerHTML = parseInt(span.innerHTML) - 1;
};

const addCommentElement = ({ data: { id, text } }) => {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerHTML = text;

  const button = document.createElement("button");
  button.name = id;
  button.innerHTML = "❌";
  button.addEventListener("click", handleDeleteComment);

  li.appendChild(span);
  li.appendChild(button);

  commentList.prepend(li);

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
    addCommentElement(response);
  }
};

const deleteComment = async (commentId) => {
  const response = await axios({
    url: `/api/${commentId}/delcomment`,
    method: "POST",
  });

  if (response.status === 200) {
    commentList.removeChild(
      document.querySelector(`button[name="${commentId}"]`).parentNode
    );
    decreseNumber();
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  addComment();
};

const handleDeleteComment = (event) => {
  const {
    target: { name: commentId },
  } = event;
  deleteComment(commentId);
};

function init() {
  formComment.addEventListener("submit", handleSubmit);
  commentList.querySelectorAll("button").forEach((buttonElement) => {
    buttonElement.addEventListener("click", handleDeleteComment);
  });
}

formComment && init();
