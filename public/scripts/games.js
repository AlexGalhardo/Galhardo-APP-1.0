const user_id = document.querySelector("#user_id").value || null
const app_url = document.querySelector("#app_url").value

async function recommendOtherGame(){
    const response = await fetch(`${app_url}/api/public/games/random`);
    const object = await response.json();

    Object.entries(object).forEach(([key, value]) => {
        document.getElementById("game_id").value = object.game.id;
        document.getElementById("game_image").src = object.game.image;
        document.getElementById("game_title").innerHTML = object.game.title;
        document.getElementById("game_year_release").innerHTML = object.game.year_release;
        document.getElementById("game_resume").innerHTML = object.game.resume;
        document.getElementById("game_genres").innerHTML = object.game.genres;
        document.getElementById("game_platforms").innerHTML = object.game.platforms;
        document.getElementById("game_developer").innerHTML = object.game.developer;
        document.getElementById("game_igdb_link").href = object.game.igdb_link;
        document.getElementById("game_igdb_rating").innerHTML = (object.game.igdb_rating).toFixed(1);
        document.getElementById("game_amazon_link").href = object.game.amazon_link;
    });
}


async function recommendThisBook(book_id){
    const response = await fetch(`${app_url}/recommend/game/${parseInt(book_id)}/${user_id}`)
    const json = await response.json()

    const buttonRecommendEl = document.querySelector(`#button_recommend_gameid_${book_id}`)

    const buttonNotRecommendEl = document.querySelector(`#button_not_recommend_gameid_${book_id}`)

    if(buttonRecommendEl.classList.contains('btn-success')){
        buttonRecommendEl.classList.remove('btn-success')
        buttonRecommendEl.classList.add('btn-outline-success')
    } else {
        buttonRecommendEl.classList.remove('btn-outline-success')
        buttonRecommendEl.classList.add('btn-success')
        buttonNotRecommendEl.classList.remove('btn-danger')
        buttonNotRecommendEl.classList.add('btn-outline-danger')
    }

    document.querySelector(`#total_recommend_bookid_${book_id}`).innerHTML = json.total_recommend
    document.querySelector(`#total_not_recommend_bookid_${book_id}`).innerHTML = json.total_not_recommend
}



async function dontRecommendThisBook(book_id){
    const response = await fetch(`${app_url}/notRecommend/game/${parseInt(book_id)}/${user_id}`)
    const json = await response.json()

    const buttonRecommendEl = document.querySelector(`#button_recommend_gameid_${parseInt(book_id)}`)

    const buttonNotRecommendEl = document.querySelector(`#button_not_recommend_gameid_${parseInt(book_id)}`)

    if(buttonNotRecommendEl.classList.contains('btn-danger')){
        buttonNotRecommendEl.classList.remove('btn-danger')
        buttonNotRecommendEl.classList.add('btn-outline-danger')
    } else {
        buttonNotRecommendEl.classList.remove('btn-outline-danger')
        buttonNotRecommendEl.classList.add('btn-danger')
        buttonRecommendEl.classList.remove('btn-success')
        buttonRecommendEl.classList.add('btn-outline-success')
    }

    document.querySelector(`#total_recommend_bookid_${book_id}`).innerHTML = json.total_recommend
    document.querySelector(`#total_not_recommend_bookid_${book_id}`).innerHTML = json.total_not_recommend
}
