const allCardContainer = document.getElementById('allCardContainer');
const loadingSpinner = document.getElementById("loadingSpinner");
const tabButtons = document.querySelectorAll('#tabButtons');


// Loading
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  allCardContainer.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// all buttons styles add

// load all cards and display

async function loadCards(){
    showLoading();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    hideLoading();
    displayCards(data.data);
}

function displayCards(cards){
    cards.forEach((card) => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML =`
        <div class="card bg-base-100 shadow-2xl h-full">
               <div class="card-body">
                <div class="flex justify-end">
                    <div class="badge badge-soft badge-error">${card.priority}</div>
                </div>
              <h2 class="card-title text-[#1F2937]">${card.title}</h2>
              <p class="text-[#64748B]">${card.description}</p>
              <div class="flex flex-wrap gap-2 border-b border-[#b4c5dd9d] pb-3">
                  <div class="badge badge-soft badge-error">
                  <i class="fa-solid fa-bug"></i> ${card.labels[0]}
                  </div>

                  <div class="badge badge-soft badge-warning">
                    <i class="fa-regular fa-life-ring"></i> ${card.labels[1]}
                  </div>
                  </div>
              <p class="text-sm text-[#64748B] mt-2">#${card.author}</p>
              <p class="text-sm text-[#64748B]">${card.createdAt}</p>
            </div>
        </div>
        `;
        allCardContainer.appendChild(cardDiv);
    })
} 

loadCards();

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }