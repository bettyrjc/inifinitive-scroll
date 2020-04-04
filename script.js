const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// show in the DOM

async function showPost() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(div);
  });
}
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    console.log("hola");

    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
showPost();
filter.addEventListener("input", filterPosts);
