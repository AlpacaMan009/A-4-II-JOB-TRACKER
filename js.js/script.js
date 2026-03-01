let interviewList = [];
let rejectedList = [];
let currentStatus = "all";
// let allJobsList = [];

let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let allJobCount = document.getElementById("all-job-count");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  // allJobCount.innerText = allJobsList.length;
}

calculateCount();

// step 1;
function toggleStyle(id) {
  // adding gray bg for all
  allFilterBtn.classList.add("bg-blue-600", "text-white");
  interviewFilterBtn.classList.add("bg-blue-600", "text-white");
  rejectedFilterBtn.classList.add("bg-blue-600", "text-white");

  // if any button has black then remove
//   allFilterBtn.classList.remove("bg-gray-200", "text-blue-600");
//   thrivingFilterBtn.classList.remove("bg-black", "text-white");
//   strugglingFilterBtn.classList.remove("bg-black", "text-white");

  // console.log(id);
  const selected = document.getElementById(id); //this is the button that clicked for filter

  currentStatus = id;
  console.log(currentStatus);
  // console.log(selected);

  // adding black bg for current button
  selected.classList.remove("bg-gray-300", "text-black");
  selected.classList.add("bg-blue-600", "text-white");
  // step 1 finish

  // show and hidden particular section
  // step 4 start
  // filtering while clicking the filter button (All, Thriving, Struggling)
  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id == "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejected();
  }
}

// step 2 delegation
mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parenNode = event.target.parentNode.parentNode;

    const jobName = parenNode.querySelector(".jobName").innerText;
    const post = parenNode.querySelector(".post").innerText;
    const details = parenNode.querySelector(".details").innerText;
    const status = parenNode.querySelector(".stat").innerText;
    const notes = parenNode.querySelector(".notes").innerText;

    parenNode.querySelector(".stat").innerText = "Interview";

    const cardInfo = {
      jobName,
      post,
      details,
      status: "Thrive",
      notes,
    };

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }

    // step 2 finish
    // removing the plant from struggling list
    rejectedList = rejectedList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    // after remove rerender the html
    if (currentStatus == "rejected-filter-btn") {
      renderRejected();
    }

    calculateCount();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parenNode = event.target.parentNode.parentNode;

    const jobName = parenNode.querySelector(".jobName").innerText;
    const post = parenNode.querySelector(".post").innerText;
    const details = parenNode.querySelector(".details").innerText;
    const status = parenNode.querySelector(".stat").innerText;
    const notes = parenNode.querySelector(".notes").innerText;

    parenNode.querySelector(".status").innerText = "Rejected";

    const cardInfo = {
      jobName,
      post,
      details,
      status: "Rejected",
      notes,
    };

    const jobExist = rejectedList.find(
      (item) => item.plantName == cardInfo.jobName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }

    // removing the plant from thriving list
    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    // console.log(thrivingList);

    // after remove rerender the html
    if (currentStatus == "interview-filter-btn") {
      renderInterview();
    }
    calculateCount();
  }
});

// step 3  html file create
function renderThriving() {
  // make the filterSection empty every time
  filterSection.innerHTML = "";

  // crating innerHtml
  for (let thrive of thrivingList) {
    console.log(thrive);

    let div = document.createElement("div");
    div.className = "card flex justify-between border p-8";
    div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${thrive.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${thrive.status}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                        <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `;
    filterSection.appendChild(div);
  }
}

function renderStruggling() {
  // make the filterSection empty every time
  filterSection.innerHTML = "";
  // crating innerHtml
  for (let struggle of strugglingList) {
    let div = document.createElement("div");
    div.className = "card flex justify-between border p-8";
    div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${struggle.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${struggle.status}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                        <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `;
    filterSection.appendChild(div);
  }
}
