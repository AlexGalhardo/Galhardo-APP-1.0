// yarn init -y && yarn add mysql2 uuid rand-token bcryptjs
// npm init -y && npm isntall mysql2 uuid rand-token bcryptjs



import mysql2 from 'mysql2';
import { v4 as uuid } from 'uuid';


// CONNECT TO MYSQL 
let connection = null
try {
    connection = mysql2.createPool({
        host: '172.18.0.3', // DOCKER IPv4 Address Here (use $ sudo docker inspect galhardoapp_mysql)
        user: 'root',
        password: 'root',
        database: 'galhardoapp',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}
catch(error){
    throw new Error(error)
}

let MYSQL = connection.promise()




// DATETIME
class DateTime  {
    
    static getDateTime(timestamp){
        let date = new Date(timestamp*1000).toLocaleDateString('pt-BR')
        let time = new Date(timestamp*1000).toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }

    static getNow() {
        let date = new Date().toLocaleDateString('pt-BR')
        let time = new Date().toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }
}



// MODEL GAMES
class Games {

    static async selectAll()  {
        try {
            let stmt = `SELECT * 
                        FROM games`;

            const [ rows ] = await MYSQL.execute(stmt)

            console.log('selectAll: ', rows ? rows : null)

            // return rows ? rows : null

        } catch (error) {
            throw new Error(error);
        };
    }


    static async getTotal()  {
        try {
            let stmt = "SELECT COUNT(id) as totalGames FROM games";

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getTotal: ', rows ? rows[0].totalGames : false)

            // return rows ? rows[0].totalGames : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async getRandom()  {
        try {
            let stmt = `SELECT * FROM games ORDER BY RAND() LIMIT 1;`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getRandom: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectByID(game_id) {
        try {
            let stmt = `SELECT * FROM games WHERE id = ${game_id}`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectByID: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async create(gameObject) {
        try {
            for(let i = 0; i < gameObject.length; i++){
                let stmt = `INSERT INTO games
                                (id,
                                title,
                                year_release,
                                price,
                                resume,
                                image,
                                igdb_link,
                                igdb_rating,
                                platforms,
                                developer,
                                genres,
                                amazon_link,
                                created_at,
                                updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                let data = [
                    gameObject[i].id,
                    gameObject[i].title,
                    gameObject[i].year_release,
                    gameObject[i].price,
                    gameObject[i].resume,
                    gameObject[i].image,
                    gameObject[i].igdb_link,
                    gameObject[i].igdb_rating,
                    gameObject[i].platforms,
                    gameObject[i].developer,
                    gameObject[i].genres,
                    gameObject[i].amazon_link,
                    DateTime.getNow(),
                    DateTime.getNow()
                ];

                const [ rows ] = await MYSQL.execute(stmt, data);

                rows.affectedRows ?  console.log(`GAME: ${gameObject[i].title} CREATED!`) : console.log(`GAME: ${gameObject[i].title} NOT CREATED!`)
            }            

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async update(gameObject) {
        try {
            let stmt = `UPDATE games
                    SET
                        title = '${gameObject.title}',
                        year_release = '${gameObject.year_release}',
                        price = '${gameObject.price}',
                        resume = '${gameObject.resume}',
                        image = '${gameObject.image}',
                        igdb_link = '${gameObject.igdb_link}',
                        igdb_rating = '${gameObject.igdb_rating}',
                        platforms = '${gameObject.platforms}',
                        developer = '${gameObject.developer}',
                        genres = '${gameObject.genres}',
                        amazon_link = '${gameObject.amazon_link}',
                        updated_at = '${DateTime.getNow()}'
                    WHERE
                        id = '${gameObject.id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows.affectedRows ? console.log(`GAME ID: ${gameObject.id} UPDATED!`) : console.log(`GAME ID: ${gameObject.id} NOT UPDATED!`)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async delete(game_id){
        try {
            let stmt = `DELETE FROM games WHERE id = '${game_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('delete: ', rows.affectedRows ? `GAME_ID: ${game_id} DELETED!` : `GAME_ID ${game_id} NOT Deleted!`)

        } catch (error) {
            throw new Error(error);
        }
    }


    static async searchTitle(game_title){
        try {
            let stmt = `SELECT * FROM games WHERE title LIKE '%${game_title}%'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('searchTitle: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error)
        }
    }
}




// TEST MODEL BLOG
async function testModelGames(){

    await Games.create([
        {
      id: 1,
      title: "God Of War",
      year_release: 2018,
      price: 13990,
      resume: "It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created...",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
      igdb_link: "https://www.igdb.com/games/god-of-war--1",
      igdb_rating: 9.5,
      platforms: "PS4, PS5",
      developer: "Santa Mônica Studios",
      genres: "Action, Third Person, Adventure, Hack and slash/Beat 'em up",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 2,
      title: "Ghost Of Tsushima",
      year_release: 2020,
      price: 19990,
      resume: "The year is 1274. Samurai warriors are the legendary defenders of Japan — until the fearsome Mongol Empire invades the island of Tsushima, wreaking havoc and conquering the local population. As one of the last surviving samurai, you rise from the ashes to fight back. But, honorable tactics won’t lead you to victory. You must move beyond your samurai traditions to forge a new way of fighting — the way of the Ghost — as you wage an unconventional war for the freedom of Japan.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2crj.jpg",
      igdb_link: "https://www.igdb.com/games/ghost-of-tsushima",
      igdb_rating: 9,
      platforms: "PS4, PS5",
      developer: "Scker Punch Productions",
      genres: "Action, hird Person, Drama, Open world, Stealth, Adventure, Hack and slash/Beat 'em p",      "amaon_link": "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B07581SQQ",      "created_at": "04/08/2021 18:35:09",
      "updated_at": "04/08/2021 18:55:16",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 3,
      title: "Marvel's SpiderMan",
      year_release: 2018,
      price: 12990,
      resume: "Starring the world’s most iconic Super Hero, Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. From traversing with parkour and utilizing the environment, to new combat and blockbuster set pieces, it’s Spider-Man unlike any you’ve played before.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.jpg",
      igdb_link: "https://www.igdb.com/games/marvels-spider-man",
      igdb_rating: 8.8,
      platforms: "PS4, PS5",
      developer: "Isomniac Games",
      genres: "Action, hird Person, Drama, Open world, Stealth, Adventure, Hack and slash/Beat 'em p",      "amaon_link": "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B07581SQQ",      "created_at": "04/08/2021 18:35:09",
      "updated_at": "04/08/2021 18:55:16",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 4,
      title: "Uncharted 4: A Thief's End",
      year_release: 2016,
      price: 5990,
      resume: "Several years after his last adventure, retired fortune hunter, Nathan Drake, is forced back into the world of thieves. With the stakes much more personal, Drake embarks on a globe-trotting journey in pursuit of a historical conspiracy behind a fabled pirate treasure. His greatest adventure will test his physical limits, his resolve, and ultimately what he's willing to sacrifice to save the ones he loves.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.jpg",
      igdb_link: "https://www.igdb.com/games/uncharted-4-a-thief-s-end",
      igdb_rating: 9.2,
      platforms: "PS4, PS5",
      developer: "Naughty Dog",
      genres: "SinglePlayer, Action, Drama, Stealth, Adventure",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 5,
      title: "Uncharted: The Lost Legacy",
      year_release: 2017,
      price: 8990,
      resume: "From the critically acclaimed developer, Naughty Dog, comes the first standalone adventure in the Uncharted series. Fan-favorite character, Chloe Frazer, must enlist the aid of renowned mercenary Nadine Ross from Uncharted 4: A Thief’s End in order to recover a fabled ancient Indian artifact and keep it out of the hands of a ruthless war profiteer. Together, they’ll venture deep into the mountains of India in search of the legendary artifact. Along the way, they’ll learn to work together to unearth the mystery of the artifact, fight their way through fierce opposition, and prevent the region from falling into chaos.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tp9.jpg",
      igdb_link: "https://www.igdb.com/games/uncharted-the-lost-legacy",
      igdb_rating: 9.2,
      platforms: "PS4, PS5",
      developer: "Naughty Dog",
      genres: "SinglePlayer, Third Person, Action, Drama, Stealth, Adventure",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 6,
      title: "Bloodborne",
      year_release: 2015,
      price: 2990,
      resume: "An action RPG in which the player embodies a Hunter who, after being transfused with the mysterious blood local to the city of Yharnam, sets off into a 'night of the Hunt', an extended night in which Hunters may phase in and out of dream and reality in order to thin the outbreak of abominable beasts that plague the land and, for the more resilient and insightful Hunters, uncover the answers to the Hunt's many mysteries.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.jpg",
      igdb_link: "https://www.igdb.com/games/bloodborne",
      igdb_rating: 9.1,
      platforms: "PS4, PS5",
      developer: "FromSoftware",
      genres: "SinglePlayer, Third Person, RPG, Action, Adventure",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16",
      "userLoggedRecommend": "btn-success",
      "userLoggedNotRecommend": "btn-outline-danger",
      "userLoggedAddedToShopCart": "btn-warning"
    },
    {
      id: 7,
      title: "Persona 5 Royal",
      year_release: 2019,
      price: 3990,
      resume: "An enhanced version of Persona 5 with some new characters and a third semester added to the game. Released Internationally in 2020.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nic.jpg",
      igdb_link: "https://www.igdb.com/games/persona-5-royal",
      igdb_rating: 9.4,
      platforms: "PS4, PS5",
      developer: "Atlus",
      genres: "SinglePlayer, Third Person, RPG, Turn-Based, Adventure",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 8,
      title: "God of War III",
      year_release: 2010,
      price: 990,
      resume: "Set in the realm of brutal Greek mythology, God of War III is a single-player game that allows players to take on the climatic role of the ex-Spartan warrior, Kratos, as he scales through the intimidating heights of Mt. Olympus and the dark depths of Hell to seek revenge on those who have betrayed him. Armed with double-chained blades, and an array of new weapons and magic for this iteration of the trilogy, Kratos must take on mythology's darkest creatures while solving intricate puzzles throughout his merciless quest to destroy Olympus.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co30a3.jpg",
      igdb_link: "https://www.igdb.com/games/god-of-war-iii",
      igdb_rating: 8.6,
      platforms: "PS3, PS4",
      developer: "Santa Mônica Studios",
      genres: "SinglePlayer, Third Person, Adventure, Hack and slash/Beat 'em up",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 9,
      title: "The Last of Us Part II",
      year_release: 2020,
      price: 9990,
      resume: "Set 5 years after the events of The Last of Us, we see the return of Joel and Ellie. Driven by hatred, Ellie sets out for Seattle to serve justice. However, she begins to wonder what justice really means.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r0o.jpg",
      igdb_link: "https://www.igdb.com/games/the-last-of-us-part-ii",
      igdb_rating: 9.3,
      platforms: "PS3, PS4",
      developer: "Naughty Dog",
      genres: "SinglePlayer, Third Person, Shooter, Adventure",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 10,
      title: "The Last of Us",
      year_release: 2013,
      price: 8990,
      resume: "A third person shooter/stealth/survival hybrid, in which twenty years after the outbreak of a parasitic fungus which takes over the neural functions of humans, Joel, a Texan with a tragic familial past, finds himself responsible with smuggling a fourteen year old girl named Ellie to a militia group called the Fireflies, while avoiding strict and deadly authorities, infected fungal hosts and other violent survivors.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
      igdb_link: "https://www.igdb.com/games/the-last-of-us",
      igdb_rating: 9.4,
      platforms: "PS3, PS4",
      developer: "Naughty Dog",
      genres: "SinglePlayer, Third Person, Shooter, Adventure",
      amazon_link: "https://www.amazon.com.br/God-War-Padr%C3%A3o-PlayStation-4/dp/B079581SQQ",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16",
      "userLoggedRecommend": "btn-success",
      "userLoggedNotRecommend": "btn-outline-danger",
      "userLoggedAddedToShopCart": "btn-warning"
    },
    {
      id: 11,
      title: "Hades",
      year_release: "2020",
      price: 7990,
      resume: "A rogue-lite hack and slash dungeon crawler in which Zagreus, son of Hades the Greek god of the dead, attempts to escape his home and his oppressive father by fighting the souls of the dead through the various layers of the ever-shifting underworld, while getting to know and forging relationships with its inhabitants.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co39vc.jpg",
      igdb_link: "https://www.igdb.com/games/hades--1",
      igdb_rating: "94",
      platforms: "PC, XboxOne Series S|X, PS4, PS5",
      developer: "Supergiant Games",
      genres: "Adventure, Hack and slash/Beat 'em up, Indie, Role-playing (RPG)",
      amazon_link: "#",
      updated_at: "17/08/2021 05:28:54",
      created_at: "17/08/2021 05:28:54"
    },
    {
      id: 12,
      title: "Detroit: Become Human",
      year_release: 2018,
      price: 6990,
      resume: "Detroit: Become Human is an neo-noir thriller. The plot revolves around three androids: Kara, who escapes the factory she was made in to explore her newfound sentience; Connor, whose job it is to hunt down deviant androids like Kara; and Markus, who devotes himself to releasing the androids from servitude. The characters may survive or perish depending on the choices that are made, which serve to shape the story as customised by the player.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2md2.png",
      igdb_link: "https://www.igdb.com/games/detroit-become-human--1",
      igdb_rating: 8.3,
      platforms: "PS4, PS5",
      developer: "Quantic Dream",
      genres: "Adventure, Puzzle",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 13,
      title: "Shadow of the Colossus",
      year_release: 2018,
      price: 5990,
      resume: "Tales speak of an ancient land where creatures the size of mountains, roam the majestic landscape. Bound to the land, these creatures hold a key to a mystical power of revival - a power you must obtain to waken a loved one. Shadow of the Colossus is a majestic journey through ancient lands to seek out and destroy gigantic mythical beasts. With your trusty horse at your side, explore the spacious lands and unearth each Colossi. Armed with your wits, a sword and a bow, use cunning and strategy to topple each behemoth. A remake of the critically-claimed game of the same title. Also from the minds that brought you The Last Guardian & ICO",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co272w.png",
      igdb_link: "https://www.igdb.com/games/shadow-of-the-colossus--1",
      igdb_rating: 8.5,
      platforms: "PS4, PS5",
      developer: "Bluepoint Games",
      genres: "Single Player, Adventure, Platform",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 14,
      title: "Gran Turismo Sport",
      year_release: 2018,
      price: 4990,
      resume: "Welcome to the future of motorsports – the definitive motor racing experience is back and better than ever only on PlayStation 4. Gran Turismo Sport is the world’s first racing experience to be built from the ground up to bring global, online competitions sanctioned by the highest governing body of international motorsports, the FIA (Federation International Automobile). Create your legacy as you represent and compete for your home country or favorite manufacturer.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1pd4.png",
      igdb_link: "https://www.igdb.com/games/gran-turismo-sport",
      igdb_rating: 7.6,
      platforms: "PS4, PS5",
      developer: "Bluepoint Games",
      genres: "Single/Multiplayer Player, Simulation, Race",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 15,
      title: "Horizon Zero Dawn",
      year_release: 2018,
      price: 3990,
      resume: "Horizon Zero Dawn, an exhilarating new action role playing game exclusively for the PlayStation 4 system, developed by the award winning Guerrilla Games, creatos of PlayStation's venerated Killzone franchise. As Horizon Zero Dawn's main protagonist Aloy, a skilled hunter, explore a vibrant and lush world inhabited by mysterious mechanized creatures.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2una.png",
      igdb_link: "https://www.igdb.com/games/horizon-zero-dawn",
      igdb_rating: 9.1,
      platforms: "PS4, PS5, PC",
      developer: "Guerrilla Games",
      genres: "Single Player, Adventure, Platform, Third Person",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 16,
      title: "Final Fantasy 7 Remake",
      year_release: 2020,
      price: 2990,
      resume: "A spectacular re-imagining of one of the most visionary games ever, FINAL FANTASY VII REMAKE rebuilds and expands the legendary RPG for today. The first game in this project is set in the eclectic city of Midgar and presents a fully standalone gaming experience.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qxr.png",
      igdb_link: "https://www.igdb.com/games/final-fantasy-vii-remake",
      igdb_rating: 8.8,
      platforms: "PS4, PS5, PC",
      developer: "Square Enix",
      genres: "Single Player, Adventure, RPG, Third Person",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 17,
      title: "Death Stranding",
      year_release: 2019,
      price: 990,
      resume: "Action & exploration third person game set in a post-apocalyptic open world.Developed by Kojima Productions and published first on PS4 by Sony Interactive and later on PC by 505 Games.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co316v.png",
      igdb_link: "https://www.igdb.com/games/death-stranding",
      igdb_rating: 890,
      platforms: "PS4, PS5, PC",
      developer: "Kojima Productions",
      genres: "Single Player, Adventure, Third Person",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 18,
      title: "Metal Gear Solid V",
      year_release: 2015,
      price: 1990,
      resume: "The 5th installment of the Metal Gear Solid saga, Metal Gear Solid V: The Phantom Pain continues the story of Big Boss (aka Naked Snake, aka David), connecting the story lines from Metal Gear Solid: Peace Walker, Metal Gear Solid: Ground Zeroes, and the rest of the Metal Gear Universe.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v85.png",
      igdb_link: "https://www.igdb.com/games/metal-gear-solid-v-the-phantom-pain",
      igdb_rating: 8.6,
      platforms: "PS4, PS5, PC",
      developer: "Konami",
      genres: "Single Player, Adventure, Action, Shooter, Third Person",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 19,
      title: "Uncharted: The Nathan Drake Collection",
      year_release: 2015,
      price: 5990,
      resume: "Uncharted: The Nathan Drake Collection is a remastered compilation of the action-adventure shooter platform video games Drake's Fortune, Among Thieves, and Drake's Deception. Ported by Bluepoint Games, the collection was released exclusively for the PlayStation 4 on October 7, 2015 in Europe and October 9th, 2015 in North America. The Nathan Drake Collection features the original three games in the Uncharted series with 1080p resolution, 60 frames per second, better lighting, textures and models. The collection also implements a photo mode, a mode where the player can freeze the game at any moment to take personalized screenshots, derived from Naughty Dog's other remastered entry, The Last of Us Remastered, as well as new trophies. The ported games only include their respective single-player modes.",
      image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tps.png",
      igdb_link: "https://www.igdb.com/games/uncharted-the-nathan-drake-collection",
      igdb_rating: 9,
      platforms: "PS4",
      developer: "Naughty Dog",
      genres: "Single Player, Adventure, Action, Shooter, Third Person",
      amazon_link: "#",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    }]) 

    /*
    await Games.selectAll()

    await Games.selectByID(7)

    await Games.getTotal()

    await Games.getRandom()
    
    await Games.searchTitle('god of war')

    await Games.update({
        id: 7,
        title: 'Title Updated',
        year_release: 2010,
        price: 3990,
        resume: 'resume_here',
        image: 'image_here',
        igdb_link: 'igdb_link_here',
        igdb_rating: 7.5,
        platforms: 'PS4, PS5',
        developer: 'Alex Productions',
        genres: 'Action',
        amazon_link: 'amazon_link'
    })*/

    // await Games.delete(7)
}

testModelGames()
