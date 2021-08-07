async function recommendOtherGame(){

    const random_game_id = await Math.floor(Math.random() * 10) + 1;
    const response = await fetch(`https://galhardoapp-json-database.herokuapp.com/games/${random_game_id}`);
    const game = await response.json();

    Object.entries(game).forEach(([key, value]) => {
        document.getElementById("game_id").value = game.id;
        document.getElementById("game_image").src = game.image;
        document.getElementById("game_title").innerHTML = game.title;
        document.getElementById("game_year_release").innerHTML = game.year_release;
        document.getElementById("game_resume").innerHTML = game.resume;
        document.getElementById("game_genres").innerHTML = game.genres;
        document.getElementById("game_platforms").innerHTML = game.platforms;
        document.getElementById("game_developer").innerHTML = game.developer;
        document.getElementById("game_igdb_link").href = game.igdb_link;
        document.getElementById("game_igdb_rating").innerHTML = (game.igdb_rating).toFixed(1);
        document.getElementById("game_amazon_link").href = game.amazon_link;
    });
}