const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data.data.news_category;
    }
    catch (error) {
        console.log(error)
    }
}

// Categories section 
const setAllMenu = async () => {
    const data = await loadCategory();
    // console.log(data)
    const allMenu = document.getElementById('menu-li');
    // const foundMenu = document.getElementById('news-found')

    for (const menu of data) {
        const foundMenu = document.getElementById('news-found')
        const li = document.createElement('li')
        li.innerHTML = `
        <a class='text-lg font-semibold uppercase text-stone-500 hover:text-black' onclick="loadNews('${menu.category_id}')">${menu.category_name}</a>`
        allMenu.appendChild(li)
        // foundMenu.innerText = `${}`
    }
}
setAllMenu();


// News Load section 
const loadNews = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

// news Display section 
const displayNews = newses => {
    const foundMenu = document.getElementById('news-found')
    foundMenu.innerHTML = `<h2 class="text-xl w-11/12 mx-auto border-0 bg-base-100	  divide-slate-300 fw-semibold rounded-md p-3">${newses.length} items found for category Entertainment</h2>`

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    for (const news of newses) {
        // console.log(news)
        const newsDiv = document.createElement('div')
        newsDiv.classList.add("card", "w-full", "bg-base-100", "shadow-xl")
        newsDiv.innerHTML = `
        <figure><img src="${news.thumbnail_url}" class="w-100" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${news.title}</h2>
                        <p>${news.details.length > 130 ? news.details.slice(0, 130) + '...' : news.details}</p>
                       <div class="flex justify-between items-center py-3">
                       <div class="flex">
                       <div><img src="${news.author.img}" class="h-12 w-12 me-2 rounded-full"/></div>
                        <div>
                        <p class='font-semibold'> ${news.author.name ? news.author.name : 'No data found'}</p>
                        <p class='text-xs'>${news.author.published_date ? news.author.published_date : 'No data found'}</p>
                        </div>
                       </div>
                       <div class="flex">
                       <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     </div>
                       <div>${news.total_view ? news.total_view + 'M' : 'No data available'}</div>
                       </div>
                       <div class="card-actions justify-end">
                       <label for="my-modal-6" class="btn btn-primary modal-button" onclick="loadModals('${news._id}')">Details</label>

                   </div>
                       </div>
                     </div>
        `
        newsContainer.appendChild(newsDiv)
    }
}

const loadModals = _id => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showModals(data.data[0]))
        .catch(error => console.log(error))
}

const showModals = modals => {
    console.log(modals)
    const modalTitle = document.getElementById('modal-title')
    modalTitle.innerText = `${modals.title}`
    const modalBody = document.getElementById('modal-body')
    modalBody.textContent = '';
    modalBody.innerHTML = `
    <img src='${modals.image_url}'/>
    <p>${modals.details}</p>
    `
}



loadNews('08')