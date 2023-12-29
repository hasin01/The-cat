import axios from "axios"
axios.defaults.headers.common["x-api-key"] = 'api_key=live_JBkP82u1HblKDWYV8YlHDlSz3lfMHvpVNc2FeAYFdYs6mlqXRz2kbf29meVWMBFb'
import refs from "./refs"
export {fetchCatByBreed ,fetchBreeds,fetchData}
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';



axios.defaults.headers.common["x-api-key"] =
  "api_key=live_JBkP82u1HblKDWYV8YlHDlSz3lfMHvpVNc2FeAYFdYs6mlqXRz2kbf29meVWMBFb";

  refs.breedselect.addEventListener("change", function () {

    const  selectedValue = refs.breedselect.value;
    fetchCatByBreed(selectedValue)
})


async function fetchData() {
  try {

    const response = await axios.get('https://api.thecatapi.com/v1/breeds')

    const data = response.data;
    fetchBreeds(data);
    new SlimSelect({
      select: '#single',
    

  });
  } catch (error) {
    console.error('Ошибка в запросе Axios:', error);
  } finally {
    refs.loader.classList.add("is-hidden")
    refs.breedselect.classList.remove("is-hidden")
  }
}


  



async function fetchBreeds(response) {
  try {

    response.map(element =>{
      const option = document.createElement("option");
    option.value = element.reference_image_id
    option.text = element.name;
    refs.breedselect.appendChild(option);

   })
  } catch (error) {
    console.error( error.message);
  }
}


function renderCard(data){
  try {
    refs.app.innerHTML=`
  <img class="catImg" src="${data.url}" alt="" > 
<div class="description-card"><h1 class="catName">${data.breeds[0].name}</h1>
<p class="description">${data.breeds[0].description}</p>
<h2>Temperament</h2>
<p class="temperament">${data.breeds[0].temperament}</p> </div>
</div>`
  } catch (error) {
    console.log(error)
  
  }
}


async function fetchCatByBreed(breedId) {
  try {
    refs.loader.classList.remove("is-hidden")
 refs.app.innerHTML=""
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${breedId}`);
 
    renderCard(response.data);


  } catch (error) {
    console.error('Произошла ошибка:', error.message);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');

   
   
   
  }finally {
    refs.loader.classList.add("is-hidden");
  }
}
