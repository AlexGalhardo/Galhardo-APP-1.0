async function recommendOtherGame(){
    const response = await fetch(`http://localhost:3000/api/public/games/random`);
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