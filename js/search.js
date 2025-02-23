// const server_url = "https://portalserver-sepia.vercel.app";
// let doctorsData = [];

// const getDoctors = async () => {
//     const profilesContainer = document.getElementById("profilesContainer");
//     const noResults = document.getElementById("noResults");
//     const loading = document.getElementById("loading");

//     // Show loading animation
//     loading.style.display = "flex";
//     profilesContainer.innerHTML = "";
//     noResults.style.display = "none";

//     try {
//         const response = await fetch(${server_url}/auth/doctors/all, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });

//         const data = await response.json();
//         console.log(data);

//         doctorsData = data.map((doctor, index) => ({
//             id: doctor.UserID || index + 1,
//             name: doctor.Name || "Unknown Doctor",
//             specialty: doctor.specializations ? doctor.specializations.join(", ") : "General",
//             rating: doctor.rating || (Math.random() * (5 - 4) + 4).toFixed(1),
//             price: doctor.CustomPricePerHour || 50,
//             working: doctor.working ?? true,
//             location: doctor.City || "Not Available", 
//             image: doctor.ProfileImage ? setProfileImages(doctor.ProfileImage) : "https://psyshell.help/assets/img/doctors/doctor-thumb-01.jpg",
//         }));
//        console.log(doctorsData.specializations);
       
//         renderDoctors(doctorsData);
//     } catch (error) {
//         console.error("Error fetching doctors:", error);
//         noResults.style.display = "block";
//     } finally {
//         // Hide loading animation
//         loading.style.display = "none";
//     }
// };

// window.onload = () => {
//     getDoctors();
// };

// function setProfileImages(ProfileImage) {
//     if (!ProfileImage?.data) return "https://psyshell.help/assets/img/doctors/doctor-thumb-01.jpg";
//     const bufferArray = new Uint8Array(ProfileImage?.data);
//     const blob = new Blob([bufferArray], { type: "image/jpeg" });
//     return URL.createObjectURL(blob);
// }

// const renderDoctors = (doctors) => {
//     const profilesContainer = document.getElementById("profilesContainer");
//     const noResults = document.getElementById("noResults");

//     profilesContainer.innerHTML = "";

//     if (doctors.length === 0) {
//         noResults.style.display = "block";
//     } else {
//         noResults.style.display = "none";
//         doctors.forEach(doctor => {
  
            
//             const card = document.createElement("div");
//             card.classList.add("profile-card");
//             card.innerHTML = `
//                 <img src="${doctor.image}" class="profile-image" alt="${doctor.name}">
//                 <div class="profile-details">
//                     <h3 class="doctor-name">${doctor.name}</h3>
//                     <p class="specialty">${doctor.specialty}</p>
//                     <p class="price">💰 $${doctor.price} / Session</p>
//                     <div class="button-container">
//                        <button class="view-profile-btn" onclick="viewProfile('${doctor.id}', '${doctor.name}', '${doctor.location}')">Profile</button>

// <button class="book-btn" onclick="bookDoctor('${doctor.id}', '${doctor.name}', '${doctor.location || 'Unknown'}')" ${!doctor.working ? "disabled" : ""}>
//     ${doctor.working ? "Book Now" : "Booked"}
// </button>


//                     </div>
//                 </div>
//             `;
//             profilesContainer.appendChild(card);
//         });
//     }
// };

// // const handleSearch = () => {
// //     const searchTerm = document.getElementById("searchInput").value.toLowerCase();
// //     const filteredDoctors = doctorsData.filter(doctor =>
// //         doctor.specialty.toLowerCase().includes(searchTerm)
// //     );
// //     renderDoctors(filteredDoctors);
// // };
// const handleSearch = () => {
//     const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

//     if (!searchTerm) {
//         renderDoctors(doctorsData); // Show all doctors when input is empty
//         return;
//     }

//     const filteredDoctors = doctorsData.filter(doctor =>
//         doctor.specializations?.some(spec => 
//             spec.toLowerCase().includes(searchTerm)
//         )
//     );

//     renderDoctors(filteredDoctors);
// };

// const handleSort = () => {
//     const sortOption = document.getElementById("sortSelect").value;

//     if (!doctorsData.length) return; // Prevent sorting on an empty array

//     let sortedDoctors = [...doctorsData]; // Copy array to avoid modifying the original

//     switch (sortOption) {
//         case "price":
//             sortedDoctors.sort((a, b) => (a.price || 0) - (b.price || 0));
//             break;
//         case "rating":
//             sortedDoctors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//             break;
//     }

//     renderDoctors(sortedDoctors);
// };


// // function viewProfile(doctorId, docName, location) {
// //     // Construct the URL with dynamic parameters
// //     const encodedDocName = encodeURIComponent(docName);
// //     const encodedLocation = encodeURIComponent(location);

// //     const url = https://psyshell.help/mentalhealth/#${encodedDocName}?id=${doctorId}&Loc=${encodedLocation};

// //     // Redirect to the constructed URL
// //     window.location.href = url;
// // }

// function viewProfile(doctorId, docName, location) {
//     const url = profile.html?id=${doctorId}&docName=${docName}&Loc=${location};
    
//     window.location.href = url;
// } 
// function bookDoctor(doctorId, docName, location) {

//     if (!doctorId) {
//         console.error("Error: Doctor ID is missing!");
//         return;
//     }
//     // Remove image from localStorage
//     localStorage.removeItem("doctorImage")
//     // Ensure values are valid
//     docName = docName || "Unknown Doctor";
//     location = location || "Not Available";

//     // Encode parameters to handle spaces & special characters in URL
//     const url = Bookingpage.html?id=${encodeURIComponent(doctorId)}&docName=${encodeURIComponent(docName)}&Loc=${encodeURIComponent(location)};

//     // console.log("Redirecting to:", url);  // Debugging log
//     window.location.href = url;
// }
const server_url = "https://portalserver-sepia.vercel.app";
let doctorsData = [];

const getDoctors = async () => {
    const profilesContainer = document.getElementById("profilesContainer");
    const noResults = document.getElementById("noResults");
    const loading = document.getElementById("loading");

    // Show loading animation
    loading.style.display = "flex";
    profilesContainer.innerHTML = "";
    noResults.style.display = "none";

    try {
        const response = await fetch(`${server_url}/auth/doctors/all`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);

        doctorsData = data.map((doctor, index) => ({
            id: doctor.UserID || index + 1,
            name: doctor.Name || "Unknown Doctor",
            specializations: doctor.specializations || [],  // Keep as an array
            specialty: doctor.specializations ? doctor.specializations.join(", ") : "General",
            rating: doctor.rating || (Math.random() * (5 - 4) + 4).toFixed(1),
            price: doctor.CustomPricePerHour || 50,
            working: doctor.working ?? true,
            location: doctor.City || "Not Available", 
            image: doctor.ProfileImage ? setProfileImages(doctor.ProfileImage) : "https://psyshell.help/assets/img/doctors/doctor-thumb-01.jpg",
        }));

        console.log(doctorsData); // Log entire doctorsData instead of specializations

        renderDoctors(doctorsData);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        noResults.style.display = "block";
    } finally {
        loading.style.display = "none"; // Hide loading animation
    }
};

window.onload = () => {
    getDoctors();
};

function setProfileImages(ProfileImage) {
    if (!ProfileImage?.data) return "https://psyshell.help/assets/img/doctors/doctor-thumb-01.jpg";
    const bufferArray = new Uint8Array(ProfileImage?.data);
    const blob = new Blob([bufferArray], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
}

const renderDoctors = (doctors) => {
    const profilesContainer = document.getElementById("profilesContainer");
    const noResults = document.getElementById("noResults");

    profilesContainer.innerHTML = "";

    if (doctors.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
        doctors.forEach(doctor => {
            const card = document.createElement("div");
            card.classList.add("profile-card");
            card.innerHTML = `
                <img src="${doctor.image}" class="profile-image" alt="${doctor.name}">
                <div class="profile-details">
                    <h3 class="doctor-name">${doctor.name}</h3>
                    <p class="specialty">${doctor.specialty}</p>
                    <p class="price">💰 $${doctor.price} / Session</p>
                    <div class="button-container">
                       <button class="view-profile-btn"> <a class="view-pro-btn" href="https://psyshell.help/mentalhealth/#${doctor.name}"
                          >View Profile</a
                        ></button>

                       <button class="book-btn" onclick="bookDoctor('${doctor.id}', '${doctor.name}', '${doctor.location || 'Unknown'}')" ${!doctor.working ? "disabled" : ""}>
                           ${doctor.working ? "Book Now" : "Booked"}
                       </button>
                    </div>
                </div>
            `;
            profilesContainer.appendChild(card);
        });
    }
};

const handleSearch = () => {
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

    if (!searchTerm) {
        renderDoctors(doctorsData); // Show all doctors when input is empty
        return;
    }

    const filteredDoctors = doctorsData.filter(doctor =>
        doctor.specializations.some(spec => 
            spec.toLowerCase().includes(searchTerm)
        )
    );

    renderDoctors(filteredDoctors);
};

const handleSort = () => {
    const sortOption = document.getElementById("sortSelect").value;

    if (!doctorsData.length) return; // Prevent sorting on an empty array

    let sortedDoctors = [...doctorsData]; // Copy array to avoid modifying the original

    switch (sortOption) {
        case "price":
            sortedDoctors.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case "rating":
            sortedDoctors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
    }

    renderDoctors(sortedDoctors);
};

// function viewProfile(username) {
//     if (!username) {
//         console.error("Error: Doctor username is missing!");
//         return;
//     }

//     const url = `https://psyshell.help/mentalhealth/#${username}`;
//     window.location.href = url;
// }

function bookDoctor(doctorId, docName, location) {
    if (!doctorId) {
        console.error("Error: Doctor ID is missing!");
        return;
    }
    localStorage.removeItem("doctorImage");

    docName = docName || "Unknown Doctor";
    location = location || "Not Available";
    const url = `https://psyshell.help/booking.html?doctorId=${doctorId}&docName=${encodeURIComponent(docName)}&Loc=${encodeURIComponent(location)}`;
    window.location.href = url;
}