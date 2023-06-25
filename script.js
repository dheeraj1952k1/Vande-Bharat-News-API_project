const API_KEY = "a0f31e2a63b04c059411450785303572";
const url = "https://newsapi.org/v2/everything?q=";
//  let DATA_Array = []  // article

async function fetchData(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  // console.log(`${url}${query}&apiKey=${API_KEY}`)
  const data = await res.json();
  return data;
  // console.log(data);
  // DATA_Array = [...data.article]
}

fetchData("all").then(data => renderMain(data.articles))

//menu btn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden")
});
// console.log(DATA_Array)

//render news
function renderMain(arr){
  // let main = document.querySelector("main")
  let mainHTML = " ";
  for (let i = 0; i < arr.length ; i++) {
    if(arr[i].urlToImage){
    mainHTML += ` <div class="card">
        <a href=${arr[i].url}>
        <img src=${arr[i].urlToImage} lazy="loading" />
        <h4>${arr[i].title}</h4>
        <div class="publishbyDate">
            <p>${arr[i].source.name}</p>
            <span>•</span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
        </div>
        <div class="desc">
        ${arr[i].description}
    </div>
    </a>

    </div>
    `
    }
}
      document.querySelector("main").innerHTML = mainHTML

}


  const searchBtn = document.getElementById("searchForm")
  const searchBtnMobile = document.getElementById("searchFormMobile")
  const searchInputMobile = document.getElementById("searchInputMobile")
  const searchInput =  document.getElementById("searchInput")
  searchBtn.addEventListener("submit", async(e)=>{
               e.preventDefault()
               console.log(searchInput.value)
               const data = await fetchData(searchInput.value)
              //  console.log(data)

               renderMain(data.articles)
  })

  searchBtnMobile.addEventListener("submit", async(e)=>{
               e.preventDefault()
             
               const data = await fetchData(searchInputMobile.value)
               renderMain(data.articles)
   })

  async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
  }
