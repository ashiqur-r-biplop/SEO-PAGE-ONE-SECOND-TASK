const loadData = async (query) => {
  try {
    toggleSpinner(query, true);
    const URL = `http://localhost:5000/card/${query}`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data[0]?.type == "incomplete") {
      displayData(data[0], data[0]?.incomplete);
      toggleSpinner(query, false);
    }
    if (data[0]?.type == "todo") {
      displayData(data[0], data[0]?.todo);
      toggleSpinner(query, false);
    }
    if (data[0]?.type == "doing") {
      displayData(data[0], data[0]?.doing);
      toggleSpinner(query, false);
    }
    if (data[0]?.type == "Review") {
      displayData(data[0], data[0]?.Review);
      toggleSpinner(query, false);
    }
    if (data[0]?.type == "completed") {
      displayData(data[0], data[0]?.completed);
      toggleSpinner(query, false);
    }
    if (data[0]?.type == "overd") {
      displayData(data[0], data[0]?.overd);
      toggleSpinner(query, false);
    }
  } catch (error) {
    console.log(error?.message);
    toggleSpinner(false);
  }
};

const displayData = (allDataLength, data) => {
  const incomplete = document.getElementById("incomplete-length");
  const todo = document.getElementById("todo-length");
  const doing = document.getElementById("doing-length");
  const Review = document.getElementById("Review-length");
  const completed = document.getElementById("completed-length");
  const overd = document.getElementById("overd-length");
  // set Column Data Length
  if (allDataLength?.type == "incomplete") {
    incomplete.innerText = `${data.length}`;
    displayCard(allDataLength?.incomplete, "incomplete");
  }
  if (allDataLength?.type == "todo") {
    todo.textContent = `${data.length}`;
    displayCard(allDataLength?.todo, "todo");
  }
  if (allDataLength?.type == "doing") {
    doing.textContent = `${data.length}`;
    displayCard(allDataLength?.doing, "doing");
  }
  if (allDataLength?.type == "Review") {
    Review.textContent = `${data.length}`;
    displayCard(allDataLength?.Review, "Review");
  }
  if (allDataLength?.type == "completed") {
    completed.textContent = `${data.length}`;
    displayCard(allDataLength?.completed, "completed");
  }
  if (allDataLength?.type == "overd") {
    overd.textContent = `${data.length}`;

    displayCard(allDataLength?.overd, "overd");
  }
};

const displayCard = (cards, type) => {
  console.log(type);
  const cardContainers = document.getElementsByClassName("card-container");

  let cardContainer;
  switch (type) {
    case "incomplete":
      cardContainer = cardContainers[0];
      break;
    case "todo":
      cardContainer = cardContainers[1];
      break;
    case "doing":
      cardContainer = cardContainers[2];
      break;
    case "Review":
      cardContainer = cardContainers[3];
      break;
    case "completed":
      cardContainer = cardContainers[4];
      break;
    case "overd":
      cardContainer = cardContainers[5];
      break;
    default:
      console.error("Unknown card type:", type);
      return;
  }

  cardContainer.innerHTML = "";
  console.log(cardContainer);
  cards.map((singleData) => {
    console.log(singleData);
    // access single data
    // destructuring in object
    const {
      client_id,
      client_name,
      client_photo,
      commenter,
      resent_client_name,
      resent_client_photo,
    } = singleData;
    console.log(singleData);
    // uploads-file
    const date = singleData?.["publish-date"];
    const momentData = moment(date).format("D-MM-YYYY");

    const div = document.createElement("div");

    // apply card to dynamic
    div.classList.add("column-card");
    div.innerHTML = `
    <div class="card-img-group">
        <div class="card-img">
            <img src="${client_photo}" alt="">
            <h2>${client_name}</h2>
        </div>
        <div class="card-img">
        <img src="${resent_client_photo} alt="">
        <h2>${resent_client_name}</h2>
        </div>
    </div>
    <div class="crad-description">
        <div class="description">
            <i class="fa-solid fa-database description-icon"></i>
            <p>${singleData?.description.slice(0, 22)}..</p>
        </div>
        <div class="half-in-card">
            <i class="fa-solid fa-bag-shopping"></i>
            <p>1/2</p>
        </div>
    </div>
    <div class="card-footer">
    <img key={i} src="${commenter[0]?.commenter_photo}" alt="" />
    <img key={i} src="${commenter[1]?.commenter_photo}" alt="" />
    <div class="card-footer-man">12+</div>
        <div class="footer-comment">
            <i class="fa-regular fa-comment-dots"></i>
            <p>
            ${singleData?.commenter?.slice(0, 12).length}
            ${singleData?.commenter?.length > 12 && "+"}
            </p>
        </div>
        <div class="footer-upload-file">
            <i class="fa-solid fa-link button-modal" onclick="handleModalOpen(${client_id})"></i>
            <span>25</span>
        </div>
        <div class="footer-date">
            <i class="fa-solid fa-calendar-days"></i>
            <span>${momentData}</span>
        </div>
    
    </div>
    `;
    cardContainer.appendChild(div);
  });
  // spinner
  toggleSpinner(false);
};
const modal = document.getElementById("my-modal");
const modalBtn = document.getElementById("modal-btn");
const closeBtn = document.getElementById("close");

const handleModalOpen = (id) => {
  handleUpload.bind(null, id);
  modal.style.display = "block";
};

const handleModalClose = () => {
  modal.style.display = "none";
};

// Close If Outside Click
const outsideClick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
window.addEventListener("click", outsideClick);
const handleUpload = (e, id) => {
  modal.style.display = "none";
};
// spinner
const toggleSpinner = (type, isSpinner) => {
  const spinner = document.querySelector(`#spinner.${type}-spinner`);
  if (isSpinner === true) {
    spinner?.classList.remove("d-none");
  } else {
    spinner?.classList.add("d-none");
  }
};

(async () => {
  await loadData("incomplete");
  await loadData("todo");
  await loadData("doing");
  await loadData("Review");
  await loadData("completed");
  await loadData("overd");
})();
toggleSpinner("incomplete", true); // After all data is loaded, hide the spinner
