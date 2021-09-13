const user_id = document.querySelector("#user_id").value || null
const app_url = document.querySelector("#app_url").value



async function recommendOtherBook(){
    let previousBookID = document.querySelector("#book_id").value

    const response = await fetch(`${app_url}/api/public/books/random`);
    const object = await response.json();

    Object.entries(object).forEach(([key, value]) => {

        document.querySelector(`#button_recommend_bookid_${previousBookID}`).id = `button_recommend_bookid_${object.book.id}`
        document.querySelector(`#button_not_recommend_bookid_${previousBookID}`).id = `button_not_recommend_bookid_${object.book.id}`

        document.querySelector(`#total_recommend_bookid_${previousBookID}`).id = `total_recommend_bookid_${object.book.id}`

        document.querySelector(`#total_not_recommend_bookid_${previousBookID}`).id = `total_not_recommend_bookid_${object.book.id}`

        document.getElementById("book_id").value = object.book.id;
        document.getElementById("book_image").src = object.book.image;
        document.getElementById("book_title").innerHTML = object.book.title;
        document.getElementById("book_year_release").innerHTML = object.book.year_release;
        document.getElementById("book_resume").innerHTML = object.book.resume;
        document.getElementById("book_author").innerHTML = object.book.author;
        document.getElementById("book_genres").innerHTML = object.book.genres;
        document.getElementById("book_pages").innerHTML = object.book.pages;
        document.getElementById("book_amazon_link").href = object.book.amazon_link;
    });

    const buttonRecommendEl = document.querySelector(`#button_recommend_bookid_${object.book.id}`)
    const buttonNotRecommendEl = document.querySelector(`#button_not_recommend_bookid_${object.book.id}`)

    if(object.book.userLoggedRecommend === 'btn-success') {
        buttonRecommendEl.classList.remove('btn-outline-success')
        buttonRecommendEl.classList.add('btn-success')
        buttonNotRecommendEl.classList.remove('btn-danger')
        buttonNotRecommendEl.classList.add('btn-outline-danger')
    } else {
        buttonRecommendEl.classList.remove('btn-success')
        buttonRecommendEl.classList.add('btn-outline-success')
    }


    if(object.book.userLoggedNotRecommend === 'btn-danger') {
        buttonNotRecommendEl.classList.remove('btn-outline-danger')
        buttonNotRecommendEl.classList.add('btn-danger')
        buttonRecommendEl.classList.remove('btn-success')
        buttonRecommendEl.classList.add('btn-outline-success')
    } else {
        buttonNotRecommendEl.classList.remove('btn-danger')
        buttonNotRecommendEl.classList.add('btn-outline-danger')
    }

    document.querySelector(`#total_recommend_bookid_${object.book.id}`).innerHTML = object.book.recommend
    document.querySelector(`#total_not_recommend_bookid_${object.book.id}`).innerHTML = object.book.not_recommend
}




async function recommendThisBook(){
    const book_id = document.getElementById("book_id").value

    const response = await fetch(`${app_url}/recommend/book/${parseInt(book_id)}/${user_id}`)
    const json = await response.json()

    const buttonRecommendEl = document.querySelector(`#button_recommend_bookid_${book_id}`)

    const buttonNotRecommendEl = document.querySelector(`#button_not_recommend_bookid_${book_id}`)


    if(json.user_recommend) {
        buttonRecommendEl.classList.remove('btn-outline-success')
        buttonRecommendEl.classList.add('btn-success')
    } else {
        buttonRecommendEl.classList.add('btn-outline-success')
        buttonRecommendEl.classList.remove('btn-success')
    }


    if(json.user_not_recommend) {
        buttonNotRecommendEl.classList.remove('btn-outline-danger')
        buttonNotRecommendEl.classList.add('btn-danger')
    } else {
        buttonNotRecommendEl.classList.add('btn-outline-danger')
        buttonNotRecommendEl.classList.remove('btn-danger')
    }

    document.querySelector(`#total_recommend_bookid_${book_id}`).innerHTML = json.total_recommend
    document.querySelector(`#total_not_recommend_bookid_${book_id}`).innerHTML = json.total_not_recommend
}



async function dontRecommendThisBook(){
    const book_id = document.getElementById("book_id").value

    const response = await fetch(`${app_url}/notRecommend/book/${parseInt(book_id)}/${user_id}`)
    const json = await response.json()

    const buttonRecommendEl = document.querySelector(`#button_recommend_bookid_${parseInt(book_id)}`)

    const buttonNotRecommendEl = document.querySelector(`#button_not_recommend_bookid_${parseInt(book_id)}`)

    if(json.user_recommend) {
        buttonRecommendEl.classList.remove('btn-outline-success')
        buttonRecommendEl.classList.add('btn-success')
        buttonNotRecommendEl.classList.remove('btn-danger')
        buttonNotRecommendEl.classList.add('btn-outline-danger')
    } else {
        buttonRecommendEl.classList.remove('btn-success')
        buttonRecommendEl.classList.add('btn-outline-success')
    }


    if(json.user_not_recommend) {
        buttonNotRecommendEl.classList.remove('btn-outline-danger')
        buttonNotRecommendEl.classList.add('btn-danger')
        buttonRecommendEl.classList.remove('btn-success')
        buttonRecommendEl.classList.add('btn-outline-success')
    } else {
        buttonNotRecommendEl.classList.remove('btn-danger')
        buttonNotRecommendEl.classList.add('btn-outline-danger')
    }

    document.querySelector(`#total_recommend_bookid_${book_id}`).innerHTML = json.total_recommend
    document.querySelector(`#total_not_recommend_bookid_${book_id}`).innerHTML = json.total_not_recommend
}
