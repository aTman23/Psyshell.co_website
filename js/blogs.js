document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;
  const blogCardsContainer = document.getElementById("blog-cards-container");
 
  const showMoreButton = document.getElementById("show-more");
showMoreButton.style.display = "none";
  function fetchBlogPosts(page) {
    fetch(`https://atman.onrender.com/blogs?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        blogCardsContainer.innerHTML = "";
        data.blogs.forEach((post) => {

          console.log(post)
            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            card.innerHTML = `
              <div class="card position-relative">
                  <img src="${post.bannerUrl || "./assets/img/imgicon.png"}" class="card-img-top" alt="${post.title}" loading="lazy">
                  <div class="card-body">
                    <div class="card-details text-start">
                  <p >${formatTimeDifferences(post?.createdAt)}</p>
                  <p> By ${post?.userDetails?.nickname}</p>
                  </div>
                      <h6 class="card-title text-start h3">${post.title}</h6>

                      <a href="blog.html?blogid=${post.id}" class="btn btn-primary">Read</a>
                  </div>
                
                  <button class="share-btn btn btn-primary position-absolute top-0 end-0 m-2" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                </svg></button>
              </div>
            `;
            blogCardsContainer.appendChild(card);
            
            // Event listener to navigate to the blog page when the card is clicked
            card.addEventListener("click", () => {
              window.location.href = `blog.html?blogid=${post.id}`;
            });
            
            // Event listener for the share button
            const shareButton = card.querySelector(".share-btn");
            shareButton.addEventListener("click", (event) => {
              event.stopPropagation(); // Prevent card click event
              navigator.share({
                title: post.title,
                url: `blog.html?blogid=${post.id}`,
              }).catch((error) => console.error("Error sharing", error));
            });
            
        });
        if (!data.hasMore) {
          showMoreButton.style.display = "none";
        }else{
          showMoreButton.style.display = "block";
        }
        showMoreButton.addEventListener("click", function () {
          currentPage++;
          fetchBlogPosts(currentPage);
        });
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }

  // Initial fetch for the first page of blog posts
  fetchBlogPosts(currentPage);
});


function formatTimeDifferences(timestamp) {
  const currentTime = new Date();
  const commentTime = new Date(
    timestamp._seconds * 1000 + Math.round(timestamp._nanoseconds / 1000000)
  );

  const differenceInSeconds = Math.floor((currentTime - commentTime) / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  let timeDifference;
  if (differenceInDays > 7) {
    // If it crosses more than a week, display the date
    const options = { year: "numeric", month: "short", day: "numeric" };
    timeDifference = commentTime.toLocaleDateString("en-US", options);
  } else if (differenceInDays > 0) {
    // If it's within a week, but more than a day, display days ago
    timeDifference =
      differenceInDays === 1 ? "1 day ago" : `${differenceInDays} days ago`;
  } else if (differenceInHours > 0) {
    // If it's within a day, but more than an hour, display hours ago
    timeDifference =
      differenceInHours === 1 ? "1 hr ago" : `${differenceInHours} hrs ago`;
  } else {
    // If it's within an hour, display minutes ago
    timeDifference =
      differenceInMinutes <= 1 ? "just now" : `${differenceInMinutes} mins ago`;
  }

  // Format the exact date and time
  const exactDateTime = commentTime.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return `${timeDifference} (${exactDateTime})`;
}