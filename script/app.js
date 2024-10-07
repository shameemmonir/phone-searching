const loadAllPhones = async (status, searchText) => {
    document.getElementById('spinner').style.display = "none";

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'iphone'}`);
    const data = await response.json();
    console.log(data);

    if (status) {
        displayAllPhone(data.data);
    }
    else {
        displayAllPhone(data.data.slice(0, 6))
    }
}


const displayAllPhone = (phones) => {
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card m-2 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `
        phoneContainer.appendChild(div);
    });
}


const handleShowAll = () => {
    loadAllPhones(true)
}





const handelSearch = () => {
    document.getElementById('spinner').style.display = "block";

    const searchText = document.getElementById('search-box').ariaValueMax;
    setTimeout(function () {
        loadAllPhones(false, searchText)
    }, 3000)
}

loadAllPhones(false)

