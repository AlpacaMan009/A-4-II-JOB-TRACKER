let interviewList = [];
let rejectedList = [];
let currentStatus = "all-filter-btn";
// let allJobsList = [];

// for the counts
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let allJobCount = document.getElementById("all-job-count");

// for the filter buttons
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// for cards, main and filter section
const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

// function for calculating count
function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  // allJobCount.innerText = allJobsList.length;
  allJobCount.innerText = allCardSection.children.length + " Jobs";
}

calculateCount();

// step 1;
function toggleStyle(id) {
  allFilterBtn.classList.remove("bg-blue-600", "text-white");
  interviewFilterBtn.classList.remove("bg-blue-600", "text-white");
  rejectedFilterBtn.classList.remove("bg-blue-600", "text-white");

  allFilterBtn.classList.add("bg-gray-300", "text-gray-500");
  interviewFilterBtn.classList.add("bg-gray-300", "text-gray-500");
  rejectedFilterBtn.classList.add("bg-gray-300", "text-gray-500");

  const selected = document.getElementById(id);
  selected.classList.add("bg-blue-600", "text-white");
  selected.classList.remove("bg-gray-300", "text-gray-500");

  currentStatus = id;
  console.log(currentStatus);

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
    // const parenNode = event.target.parentNode.parentNode;
    const parenNode = event.target.closest(".card");

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
      status: "Interview",
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
    } else if (currentStatus == "interview-filter-btn") {
      renderInterview();
    }

    calculateCount();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parenNode = event.target.closest(".card");

    const jobName = parenNode.querySelector(".jobName").innerText;
    const post = parenNode.querySelector(".post").innerText;
    const details = parenNode.querySelector(".details").innerText;
    const status = parenNode.querySelector(".stat").innerText;
    const notes = parenNode.querySelector(".notes").innerText;

    parenNode.querySelector(".stat").innerText = "Rejected";

    const cardInfo = {
      jobName,
      post,
      details,
      status: "Rejected",
      notes,
    };

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
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
    } else if (currentStatus == "rejected-filter-btn") {
      renderRejected();
    }
    calculateCount();
  }
});

// step 3  html file create
function renderInterview() {
  // make the filterSection empty every time
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    filterSection.innerHTML =
      "<p class='p-4 text-center text-gray-500'>No interview jobs yet</p>";
    return;
  }

  // creating innerHtml
  for (let interview of interviewList) {
    console.log(interview);

    let div = document.createElement("div");
    div.className =
      "card flex w-full justify-between bg-slate-100 p-5 mt-5 rounded-lg";
    div.innerHTML = `
    <div class="flex-1 space-y-5">
                    <!-- part-1 - -->
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="jobName text-[18px] font-semibold text-[#002C5C]">${interview.jobName}</p>
                            <p class="post text-neutral/50">${interview.post}</p>
                        </div>

                        <!-- Delete button  -->
                        <button id="btn-dlt" class="btn btn-outline btn-error">Delete</button>
                    </div>

                    <!-- part-2  -->
                    <div class="flex gap-3">
                        <p class="details text-sm text-neutral/50 font-semibold">
                            ${interview.details}
                        </p>
                    </div>

                    <!-- part-3 -->
                    <div class="flex flex-col gap-2">
                        <p class="stat h-[36px] w-[150px] text-[#002C5C] font-semibold text-[14px]">${interview.status}</p>
                        <p class="notes">${interview.notes}</p>
                    </div>

                    <!-- (Interview & Rejected) buttons -->
                    <div class="flex gap-2 mt-2">
                        <button class="interview-btn btn btn-outline btn-success">Interview</button>
                        <button class="rejected-btn btn btn-outline btn-error">Rejected</button>
                    </div>
                </div>
        `;
    filterSection.appendChild(div);
  }
}






function renderRejected() {
  // make the filterSection empty every time
  filterSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filterSection.innerHTML =
      "<p class='p-4 text-center text-gray-500'>No rejected jobs yet</p>";
    return;
  }
  // crating innerHtml
  for (let rejected of rejectedList) {
    let div = document.createElement("div");
    div.className =
      "card flex w-full justify-between bg-slate-100 p-5 mt-5 rounded-lg";
    div.innerHTML = `
         <div class="flex-1 space-y-5">
                    <!-- part-1 - -->
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="jobName text-[18px] font-semibold text-[#002C5C]">${rejected.jobName}</p>
                            <p class="post text-neutral/50">${rejected.post}</p>
                        </div>

                        <!-- Delete button  -->
                        <button id="btn-dlt" class="btn btn-outline btn-error">Delete</button>
                    </div>

                    <!-- part-2  -->
                    <div class="flex gap-3">
                        <p class="details text-sm text-neutral/50 font-semibold">
                            ${rejected.details}
                        </p>
                    </div>

                    <!-- part-3 -->
                    <div class="flex flex-col gap-2">
                        <p class="stat h-[36px] w-[150px] text-[#002C5C] font-semibold text-[14px]">${rejected.status}</p>
                        <p class="notes">${rejected.notes}</p>
                    </div>

                    <!-- (Interview & Rejected) buttons -->
                    <div class="flex gap-2 mt-2">
                        <button class="interview-btn btn btn-outline btn-success">Interview</button>
                        <button class="rejected-btn btn btn-outline btn-error">Rejected</button>
                    </div>
                </div>
        `;
    filterSection.appendChild(div);
  }
}
