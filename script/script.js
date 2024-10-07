const loadAllPhones = async (status, searchText) => {
    document.getElementById('spinner').style.display = "none"

    
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`)
    const data = await response.json();


    if(status){
        displayAllPhones(data.data)
    }
    else{
        displayAllPhones(data.data.slice(0, 6))
    }
    
}  



const displayAllPhones = (phones) => {
  const phoneContainer = document.getElementById('phones-container');
  phones.forEach((phone) => {
    const {brand, image, phone_name, slug} = phone;
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card m-2 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title font-bold">${brand}</h2>
    <h2 class ="card-title">${phone_name}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    
    `
    phoneContainer.appendChild(div)
  });
}

const handleShowAll=() =>{
    loadAllPhones(true)
    
} 


const handelSearch = () => {
    document.getElementById('spinner').style.display = "block";
    const searchText = document.getElementById('search-box').value;
    setTimeout(function(){
        loadAllPhones(false, searchText)
    }, 3000)
}

const phoneDetails = async (slugs) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await response.json()
    console.log(data.data);
    const {brand, image, slug} = data.data
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div')
    div.innerHTML = `
       <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <h2 class="text-lg font-bold">${brand}</h2>
          <p class="py-4">${image}</p>
          <p class="py-4">${slug}</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
     `
      
     modalContainer.appendChild(div)

    my_modal_1.showModal()
    
}

loadAllPhones(false, "iphone")