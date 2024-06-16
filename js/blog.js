document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("blogid");

  if (!blogId) {
    this.body.innerHTML = `
        <div class="text-center">
        <h1 class= "text-center text-danger"> BLOG not found (ENTERED IN TO WRONG LINK)</h1>   <br>
        <a href="blogs.html" class="text-center"> more blogs available  </a>
</div>
        `;
    document.body.style.backgroundImage = "url('./assets/img/404.jpg');";
    document.title = "BLOG not found";
    return;
  }

  fetch(`https://atman.onrender.com/blog/${blogId}`)
    .then((response) => response.json())
    .then((data) => {
      data = data.blog;

      document.getElementById("blog-banner").src = data?.bannerUrl  || "./assets/img/imgicon.png";;
      document.getElementById("blog-title").innerText = data?.title;
      document.getElementById("blog-title-breadcrumb").innerText = data?.title;
      document.title = `${data?.title} - Blog | PsyShell`;
      if (data?.title) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = "description";
          document.head.appendChild(metaDescription);
        }
        metaDescription.content = data.title;
      }
    
      // Set the Open Graph image
      if (data.bannerUrl) {
        let metaOgImage = document.querySelector('meta[property="og:image"]');
        if (!metaOgImage) {
          metaOgImage = document.createElement('meta');
          metaOgImage.setAttribute("property", "og:image");
          document.head.appendChild(metaOgImage);
        }
        metaOgImage.content = data?.bannerUrl || "./assets/img/imgicon.png";
      }
  

      document.getElementById("blog-timestamp").innerText =
        formatTimeDifferences(data.createdAt);
      document.getElementById("blog-content").innerHTML = data.content;

      document.getElementById("profile-image").src =
        data?.userDetails?.profile || "./assets/img/defaultpic.jpg";
      document.getElementById("profile-name").innerText =
        data?.userDetails?.nickname || "anonymus";
      document.getElementById("profile-bio").innerText =
        data?.userDetails?.email || "anonymus";

      document.getElementById("blog-extra").innerHTML = `
            <button class="share-btn btn btn-primary  m-2" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
          </svg> Share</button>
            `;

      if (data.userDetails?.linkedin) {
        document.getElementById(
          "linkedin-link"
        ).innerHTML = `<a href="${data?.userDetails?.linkedin}" target="_blank"><i class="fa fa-linkedin"></i> LinkedIn</a>`;
      } else {
        document.getElementById("linkedin-link").innerHTML = "Anonymous";
      }

      const shareButton = document
        .getElementById("blog-extra")
        .querySelector(".share-btn");
      shareButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent card click event
        navigator
          .share({
            title: data?.title,
            text: data?.title,
            url: `blog.html?blogid=${data?.id}`,
          })
          .catch((error) => console.error("Error sharing", error));
      });
    })

    .catch((error) => {
      console.log(error);
      this.body.innerHTML = `
            <div class="text-center">
            <h1 class= "text-center text-danger"> BLOG not found</h1>   <br>
            <a href="blogs.html" class="text-center"> more blogs available  </a>
</div>
            `;
      document.body.style.backgroundImage = "url('./assets/img/404.jpg');";
      document.title = "BLOG not found";
    });
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
