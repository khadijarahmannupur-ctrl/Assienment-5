const allCardContainer = document.getElementById('allCardContainer');
const loadingSpinner = document.getElementById("loadingSpinner");
const tabButtons = document.querySelectorAll('#tabButtons button');
const issuesCount = document.getElementById('issuesCount');

const cardDetailsModal = document.getElementById('cardDetailsModal');

let allCards = [];


// Loading
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  allCardContainer.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// all buttons styles add
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {

    tabButtons.forEach((b) => {
       b.classList.remove('btn-primary'); 
       b.classList.add('btn-outline'); 
    })

    btn.classList.add('btn-primary');
    btn.classList.remove('btn-outline');
  })

})

// load all cards and display

async function loadCards(){
    showLoading();

    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();

    allCards = data.data;    
     
    hideLoading();
    displayCards(allCards);
}

function displayCards(cards){
    allCardContainer.innerHTML = '';

    issuesCount.innerHTML = `${cards.length}`;
        
    cards.forEach((card) => {
      // console.log(card)
        const cardDiv = document.createElement('div');
        // cardDiv.className = `${card.status === 'open' ? 'border-t-3 border-[#00A96E]' : 'border-t-3 border-[#A855F7]'}`
        cardDiv.innerHTML =`
        <div class="card bg-base-100 shadow-2xl h-full rounded-xl 
        ${card.status === 'open' ?'border-t-4 border-[#00A96E]' 
          : 'border-t-4 border-[#A855F7]'}"  onclick="openCardDetails(${card.id})">
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

function filterByStatus(status){
    // showLoading()

   if(status === 'all'){
    displayCards(allCards);
    // hideLoading();
    return;
   }

   const filterCards = allCards.filter((card) => card.status === status);
   displayCards(filterCards);
  //  hideLoading();
  //  console.log(filterCards)
}

// show modal hare 
async function openCardDetails(id){
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json();

  cardDetailsModal.showModal();
  // console.log(cardDetails);
  displayCardDetails(data.data);
}

function displayCardDetails(cards){
   const modalSection = document.getElementById('modalContent');
   modalSection.innerHTML = '';

    const cardDetails = document.createElement('div');
    cardDetails.innerHTML = `
    <!-- card details design -->  
  
            <div class="card-details">
              <h2 class="text-[#1F2937] font-bold text-2xl mb-2">${cards.title}</h2>

       <!-- title and open badge --> 
              <div class="flex items-center gap-2">
                <div class="badge rounded-full text-white ${cards.status === 'open' 
                  ? 'bg-[#00A96E]' : 'bg-[#A855F7]'}">${cards.status}</div>
                <img src="./assets/Dot.png" alt="">
                <p class="text-sm text-[#64748B]">${cards.assignee}</p>
                <img src="./assets/Dot.png" alt="">
                <p class="text-sm text-[#64748B]">${cards.updatedAt}</p>
              </div>

      <!-- BUG and HELP WANTED badge -->
              <div class="flex gap-1 mt-6">
                <div class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i> ${cards.labels[0]}</div> 
                <div class="badge badge-soft badge-warning"><i class="fa-regular fa-life-ring"></i> ${cards.labels[1]}</div>
              </div>
          <!-- description -->
              <p class="my-6 text-[16px] text-[#64748B]">${cards.description}</p>

       <!-- assignee and priority -->
              <div class="assignee-priority flex gap-30 p-4">
  
                 <div class="assignee space-y-1">
                   <p class="text-[16px] text-[#64748B]">Assignee:</p>
                   <h4 class="text-[16px] text-[#1F2937] font-bold">${cards.assignee}</h4>
                 </div>
               
                 <div class="priority">
                   <p class="text-[16px] text-[#64748B]">Priority:</p>
                   <div class="badge badge-error rounded-full">${cards.priority}</div>
                 </div>

              </div>

            </div>
    `
    modalSection.appendChild(cardDetails);

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
// 