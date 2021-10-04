// yarn init -y && yarn add mysql2 uuid rand-token bcryptjs
// npm init -y && npm isntall mysql2 uuid rand-token bcryptjs

/*
LIKE Operator    Description
WHERE CustomerName LIKE 'a%'    Finds any values that start with "a"
WHERE CustomerName LIKE '%a'    Finds any values that end with "a"
WHERE CustomerName LIKE '%or%'    Finds any values that have "or" in any position
WHERE CustomerName LIKE '_r%'    Finds any values that have "r" in the second position
WHERE CustomerName LIKE 'a_%'    Finds any values that start with "a" and are at least 2 characters in length
WHERE CustomerName LIKE 'a__%'    Finds any values that start with "a" and are at least 3 characters in length
WHERE ContactName LIKE 'a%o'    Finds any values that start with "a" and ends with "o"
*/


import mysql2 from 'mysql2';
import { v4 as uuid } from 'uuid';


// CONNECT TO MYSQL 
let connection = null
try {
    connection = mysql2.createPool({
        host: '172.20.0.3', // DOCKER IPv4 Address Here (use $ sudo docker inspect galhardoapp_mysql)
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



// MODEL BOOKS
class Books {

    static async selectAll()  {
        try {
            let stmt = `SELECT * 
                        FROM books`;

            const [ rows ] = await MYSQL.execute(stmt)

            console.log('selectAll: ', rows ? rows : null)

            // return rows ? rows : null

        } catch (error) {
            throw new Error(error);
        };
    }


    static async getTotal()  {
        try {
            let stmt = "SELECT COUNT(id) as totalGames FROM books";

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getTotal: ', rows ? rows[0].totalGames : false)

            // return rows ? rows[0].totalGames : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async getRandom()  {
        try {
            let stmt = `SELECT * FROM books ORDER BY RAND() LIMIT 1;`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getRandom: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectByID(book_id) {
        try {
            let stmt = `SELECT * FROM books WHERE id = ${book_id}`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectByID: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async create(bookObject) {
        try {
            for(let i= 0; i < bookObject.length; i++){
                let stmt = `INSERT INTO books
                                (id,
                                title,
                                year_release,
                                price,
                                image,
                                amazon_link,
                                resume,
                                pages,
                                genres,
                                author,
                                created_at,
                                updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                let data = [
                    bookObject[i].id,
                    bookObject[i].title,
                    bookObject[i].year_release,
                    bookObject[i].price,
                    bookObject[i].image,
                    bookObject[i].amazon_link,
                    bookObject[i].resume,
                    bookObject[i].pages,
                    bookObject[i].genres,
                    bookObject[i].author,
                    DateTime.getNow(),
                    DateTime.getNow()
                ];

                const [ rows ] = await MYSQL.execute(stmt, data);

                rows.affectedRows ?  console.log(`BOOK: ${bookObject[i].title} CREATED!`) : console.log(`BOOK: ${bookObject[i].title} NOT CREATED!`)
            }
            
            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async update(bookObject) {
        try {
            console.log('id é', bookObject.id)
            let stmt = `UPDATE books
                    SET
                        title = '${bookObject.title}',
                        year_release = '${bookObject.year_release}',
                        price = '${bookObject.price}',
                        image = '${bookObject.image}',
                        amazon_link = '${bookObject.amazon_link}',
                        resume = '${bookObject.resume}',
                        pages = '${bookObject.pages}',
                        genres = '${bookObject.genres}',
                        author = '${bookObject.author}',
                        updated_at = '${DateTime.getNow()}'
                    WHERE
                        id = '${bookObject.id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows.affectedRows ? console.log(`BOOK_ID: ${bookObject.id} UPDATED!`) : console.log(`BOOK_ID: ${bookObject.id} NOT UPDATED!`)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async delete(book_id){
        try {
            let stmt = `DELETE FROM books WHERE id = '${book_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('delete: ', rows.affectedRows ? `book_id: ${book_id} DELETED!` : `book_id ${book_id} NOT Deleted!`)

        } catch (error) {
            throw new Error(error);
        }
    }


    static async searchTitle(book_title){
        try {
            let stmt = `SELECT * FROM books WHERE title LIKE '%${book_title}%'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('searchTitle: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error)
        }
    }
}




// TEST MODEL BLOG
async function testModelBooks(){

    await Books.create([
        {
      id: 1,
      title: "Sapiens: A Brief History of Humankind",
      year_release: 2014,
      price: 2990,
      image: "https://m.media-amazon.com/images/I/51Sn8PEXwcL.jpg",
      amazon_link: "https://www.amazon.com/Sapiens-Humankind-Yuval-Noah-Harari-ebook/dp/B00ICN066A/ref=sr_1_2?crid=165V6E4JEUXKV&dchild=1&keywords=yuval+harari&qid=1632431375&s=digital-text&sprefix=yuval+ha%2Cdigital-text%2C288&sr=1-2",
      "resume": "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be “human.” One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold with this highly original book that begins about 70,000 years ago with the appearance of modern cognition. From examining the role evolving humans have played in the global ecosystem to charting the rise of empires, Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine specific events within the context of larger ideas.",
      pages: 464,
      genres: "Historic",
      author: "Yuval Noah Harari ",
      updated_at: "11/08/2021 20:36:33",
      created_at: "11/08/2021 20:36:33"
    },
    {
      id: 2,
      title: "21 Lessons for the 21st Century",
      year_release: 2018,
      price: 2990,
      image: "https://m.media-amazon.com/images/I/41+uVWlucWL.jpg",
      amazon_link: "https://www.amazon.com/Lessons-21st-Century-Yuval-Harari-ebook/dp/B079WM7KLS/ref=sr_1_1?crid=165V6E4JEUXKV&dchild=1&keywords=yuval+harari&qid=1632431324&s=digital-text&sprefix=yuval+ha%2Cdigital-text%2C288&sr=1-1",
      "resume": "How do computers and robots change the meaning of being human? How do we deal with the epidemic of fake news? Are nations and religions still relevant? What should we teach our children? Yuval Noah Harari’s 21 Lessons for the 21st Century is a probing and visionary investigation into today’s most urgent issues as we move into the uncharted territory of the future. As technology advances faster than our understanding of it, hacking becomes a tactic of war, and the world feels more polarized than ever, Harari addresses the challenge of navigating life in the face of constant and disorienting change and raises the important questions we need to ask ourselves in order to survive.",
      pages: "355",
      genres: "Historic",
      author: "Yuval Harari",
      updated_at: "11/08/2021 20:32:39",
      created_at: "11/08/2021 20:32:39"
    },
    {
      id: 3,
      title: "Homo Deus: A Brief History of Tomorrow",
      year_release: 2016,
      price: 2990,
      image: "https://m.media-amazon.com/images/I/4193zapM4cL._SY346_.jpg",
      amazon_link: "https://www.amazon.com.br/gp/product/B01LXCJTO4/ref=dbs_a_def_rwt_bibl_vppi_i0",
      resume: "Yuval Noah Harari, author of the critically-acclaimed New York Times bestseller and international phenomenon Sapiens, returns with an equally original, compelling, and provocative book, turning his focus toward humanity’s future, and our quest to upgrade humans into gods. Over the past century humankind has managed to do the impossible and rein in famine, plague, and war. This may seem hard to accept, but, as Harari explains in his trademark style—thorough, yet riveting—famine, plague and war have been transformed from incomprehensible and uncontrollable forces of nature into manageable challenges. For the first time ever, more people die from eating too much than from eating too little; more people die from old age than from infectious diseases; and more people commit suicide than are killed by soldiers, terrorists and criminals put together. The average American is a thousand times more likely to die from binging at McDonalds than from being blown up by Al Qaeda.",
      pages: "464",
      genres: "Historic",
      author: "Alex",
      created_at: "04/08/2021 18:35:09",
      updated_at: "04/08/2021 18:55:16"
    },
    {
      id: 4,
      title: "The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race",
      year_release: "2020",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/41sdqD62cSL._SY346_.jpg",
      amazon_link: "https://www.amazon.com.br/dp/8532531768/ref=s9_acsd_al_bw_c2_x_1_t?pf_rd_m=A3RN7G7QC5MWSZ&pf_rd_s=merchandised-search-4&pf_rd_r=94401YP4EFQBKS2C6QK8&pf_rd_t=101&pf_rd_p=bed818b6-7184-4c08-8637-f6cb1f410f34&pf_rd_i=13348890011",
      resume: "The bestselling author of Leonardo da Vinci and Steve Jobs returns with a gripping account of how Nobel Prize winner Jennifer Doudna and her colleagues launched a revolution that will allow us to cure diseases, fend off viruses, and have healthier babies. When Jennifer Doudna was in sixth grade, she came home one day to find that her dad had left a paperback titled The Double Helix on her bed. She put it aside, thinking it was one of those detective tales she loved. When she read it on a rainy Saturday, she discovered she was right, in a way. As she sped through the pages, she became enthralled by the intense drama behind the competition to discover the code of life.",
      pages: "256",
      genres: "Biography",
      author: "Walter Isaacson",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 5,
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      year_release: "2009",
      price: 2990,
      image: "https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL._SX342_SY445_QL70_FMwebp_.jpg",
      amazon_link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM/ref=sr_1_1?crid=1AGS1CVBWJ2I9&dchild=1&keywords=clean+code&qid=1632431269&s=digital-text&sprefix=clean+code%2Cdigital-text%2C298&sr=1-1",
      resume: "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer–but only if you work at it.",
      pages: "425",
      genres: "Software",
      author: "Robert C. Martin",
      updated_at: "19/08/2021 03:34:40",
      created_at: "19/08/2021 03:34:40"
    },
    {
      id: 6,
      title: "Domain-Driven Design: Tackling Complexity in the Heart of Software",
      year_release: "2016",
      price: 2990,
      "image": "https://images-na.ssl-images-amazon.com/images/I/51OWGtzQLLL._SX342_SY445_QL70_FMwebp_.jpg",
      "amazon_link": "https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software-ebook/dp/B00794TAUG/ref=sr_1_1?crid=3MSX5CWJWV1HH&dchild=1&keywords=domain+driven+design&qid=1632431205&s=digital-text&sprefix=domain+dri%2Cdigital-text%2C295&sr=1-1",
      "resume": "Domain-Driven Design fills that need. This is not a book about specific technologies. It offers readers a systematic approach to domain-driven design, presenting an extensive set of design best practices, experience-based techniques, and fundamental principles that facilitate the development of software projects facing complex domains. Intertwining design and development practice, this book incorporates numerous examples based on actual projects to illustrate the application of domain-driven design to real-world software development.",
      pages: "528",
      genres: "Software",
      author: "Eric Evans",
      updated_at: "19/08/2021 03:35:50",
      created_at: "19/08/2021 03:35:50"
    },
    {
      id: 7,
      title: "How To Win Friends and Influence People",
      year_release: "2012",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/51NVtjOrnqL._SY346_.jpg",
      amazon_link: "https://www.amazon.com/How-Win-Friends-Influence-People-ebook/dp/B003WEAI4E/ref=sr_1_1?crid=P2NW8U2G4S65&dchild=1&keywords=how+to+make+friends+and+influence+people&qid=1632431120&s=digital-text&sprefix=how+to+make+fri%2Cdigital-text%2C303&sr=1-1",
      "resume": "Dale Carnegie’s rock-solid, time-tested advice has carried countless people up the ladder of success in their business and personal lives. One of the most groundbreaking and timeless bestsellers of all time, How to Win Friends & Influence People will teach you: -Six ways to make people like you -Twelve ways to win people to your way of thinking -Nine ways to change people without arousing resentment. And much more! Achieve your maximum potential—a must-read for the twenty-first century with more than 15 million copies sold!",
      pages: "264",
      genres: "Personal Development",
      author: "Dale Carnegie",
      updated_at: "19/08/2021 04:48:10",
      created_at: "19/08/2021 04:48:10"
    },
    {
        id: 8,
      title: "The Art Of War",
      year_release: "2021",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/41MyeYYbBoL.jpg",
      amazon_link: "https://www.amazon.com/Art-War-Sun-Tzu-ebook/dp/B003ZUY13E/ref=sr_1_1?crid=3716V7D9ETKYB&dchild=1&keywords=sun+tzu+art+of+war&qid=1632431049&s=digital-text&sprefix=sun+tzu%2Cdigital-text%2C289&sr=1-1",
      "resume": "Art of War is almost certainly the most famous study of strategy ever written and has had an extraordinary influence on the history of warfare. The principles Sun-tzu expounded were utilized brilliantly by such great Asian war leaders as Mao Tse-tung, Giap, and Yamamoto. First translated two hundred years ago by a French missionary, Sun-tzu's Art of War has been credited with influencing Napoleon, the German General Staff, and even the planning for Desert Storm. Many Japanese companies make this book required reading for their key executives. And increasingly, Western businesspeople and others are turning to the Art of War for inspiration and advice on how to succeed in competitive situations of all kinds.",
      pages: "160",
      genres: "Strategic",
      author: "Sun Tzu",
      created_at: "19/08/2021 06:46:13",
      updated_at: "19/08/2021 06:46:13"
    },
    {
      id: 9,
      title: "Steve Jobs",
      year_release: "2020",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/4119AW7yvlL.jpg",
      amazon_link: "https://www.amazon.com/gp/product/B004W2UBYW/ref=dbs_a_def_rwt_bibl_vppi_i1",
      resume: "Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than 100 family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing. Isaacson’s portrait touched millions of readers. At a time when America is seeking ways to sustain its innovative edge, Jobs stands as the ultimate icon of inventiveness and applied imagination. He knew that the best way to create value in the twenty-first century was to connect creativity with technology. He built a company where leaps of the imagination were combined with remarkable feats of engineering.",
      pages: "256",
      genres: "Biography",
      author: "Walter Isaacson",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 10,
      title: "Leonardo da Vinci",
      year_release: "2020",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/51gFt86kFAL.jpg",
      amazon_link: "https://www.amazon.com/gp/product/B071Y385Q1/ref=dbs_a_def_rwt_bibl_vppi_i2",
      resume: "Based on thousands of pages from Leonardo da Vinci’s astonishing notebooks and new discoveries about his life and work, Walter Isaacson “deftly reveals an intimate Leonardo” (San Francisco Chronicle) in a narrative that connects his art to his science. He shows how Leonardo’s genius was based on skills we can improve in ourselves, such as passionate curiosity, careful observation, and an imagination so playful that it flirted with fantasy. He produced the two most famous paintings in history, The Last Supper and the Mona Lisa. With a passion that sometimes became obsessive, he pursued innovative studies of anatomy, fossils, birds, the heart, flying machines, botany, geology, and weaponry. He explored the math of optics, showed how light rays strike the cornea, and produced illusions of changing perspectives in The Last Supper. His ability to stand at the crossroads of the humanities and the sciences, made iconic by his drawing of Vitruvian Man, made him history’s most creative genius.",
      pages: "256",
      genres: "Biography",
      author: "Walter Isaacson",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 11,
      title: "Benjamin Franklin: An American Life",
      year_release: "2020",
      price: 2990,
      "image": "https://images-na.ssl-images-amazon.com/images/I/51e4pdrIVKL._SX328_BO1,204,203,200_.jpg",
      "amazon_link": "https://www.amazon.com/gp/product/B000FBJG4U/ref=dbs_a_def_rwt_bibl_vppi_i4",
      "resume": "Benjamin Franklin is the founding father who winks at us, the one who seems made of flesh rather than marble. In a sweeping narrative that follows Franklin’s life from Boston to Philadelphia to London and Paris and back, Walter Isaacson chronicles the adventures of the runaway apprentice who became, over the course of his eighty-four-year life, America’s best writer, inventor, media baron, scientist, diplomat, and business strategist, as well as one of its most practical and ingenious political leaders. He explores the wit behind Poor Richard’s Almanac and the wisdom behind the Declaration of Independence, the new nation’s alliance with France, the treaty that ended the Revolution, and the compromises that created a near-perfect Constitution.",
      pages: "256",
      genres: "Biography",
      author: "Walter Isaacson",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 12,
      title: "Einstein: His Life and Universe",
      year_release: "2020",
      price: 2990,
      "image": "https://m.media-amazon.com/images/I/510RQE9G+AL.jpg",
      "amazon_link": "https://www.amazon.com/Einstein-Life-Universe-Walter-Isaacson-ebook/dp/B000PC0S0K/ref=sr_1_1?crid=1SVNXRWCK9N0J&dchild=1&keywords=einstein&qid=1632431547&s=digital-text&sprefix=einstein%2Cdigital-text%2C306&sr=1-1",
      "resume": "How did his mind work? What made him a genius? Isaacson’s biography shows how his scientific imagination sprang from the rebellious nature of his personality. His fascinating story is a testament to the connection between creativity and freedom. Based on newly released personal letters of Einstein, this book explores how an imaginative, impertinent patent clerk—a struggling father in a difficult marriage who couldn’t get a teaching job or a doctorate—became the mind reader of the creator of the cosmos, the locksmith of the mysteries of the atom, and the universe. His success came from questioning conventional wisdom and marveling at mysteries that struck others as mundane. This led him to embrace a morality and politics based on respect for free minds, free spirits, and free individuals. These traits are just as vital for this new century of globalization, in which our success will depend on our creativity, as they were for the beginning of the last century, when Einstein helped usher in the modern age.",
      pages: "705",
      genres: "Biography",
      author: "Walter Isaacson",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 13,
      title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
      year_release: "2015",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/51tw6UjHpDL._SY346_.jpg",
      amazon_link: "https://www.amazon.com/Elon-Musk-SpaceX-Fantastic-Future-ebook/dp/B00KVI76ZS/ref=sr_1_1?crid=1L76QFVRLPXOW&dchild=1&keywords=elon+musk&qid=1632431662&s=digital-text&sprefix=elon+musk%2Cdigital-text%2C303&sr=1-1",
      "resume": "In Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future, veteran technology journalist Ashlee Vance provides the first inside look into the extraordinary life and times of Silicon Valley's most audacious entrepreneur. Written with exclusive access to Musk, his family and friends, the book traces the entrepreneur's journey from a rough upbringing in South Africa to the pinnacle of the global business world. Vance spent over 40 hours in conversation with Musk and interviewed close to 300 people to tell the tumultuous stories of Musk's world-changing companies: PayPal, Tesla Motors, SpaceX and SolarCity, and to characterize a man who has renewed American industry and sparked new levels of innovation while making plenty of enemies along the way.",
      pages: "705",
      genres: "Biography",
      author: "Walter Isaacson",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 14,
      title: "Alice's Adventures in Wonderland",
      year_release: "1865",
      price: 2990,
      "image": "https://m.media-amazon.com/images/I/51HFDCO5f4L.jpg",
      "amazon_link": "https://www.amazon.com/Alices-Adventures-Wonderland-Lewis-Carroll-ebook/dp/B09DJNGYJZ/ref=sr_1_2?crid=1U7MZJ195HFXT&dchild=1&keywords=alice+in+wonderland&qid=1632431725&s=digital-text&sprefix=alice+in%2Cdigital-text%2C309&sr=1-2",
      "resume": "In Alice in Wonderland looking for a pastime, Alice will discover a whole new world and its bizarre inhabitants. In Through the Looking-Glass, six months after the visit to Wonderland, crossing a mirror, Alice is once again involved in unlikely adventures.",
      pages: "92",
      genres: "Fantasy, Fiction",
      author: "Lewis Carroll",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 15,
      title: "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
      year_release: "1865",
      price: 2990,
      "image": "https://m.media-amazon.com/images/I/51N-u8AsmdL.jpg",
      "amazon_link": "https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation-ebook/dp/B004J4XGN6/ref=sr_1_1?crid=1F9VTKTRXNCT7&dchild=1&keywords=lean+startup&qid=1632431932&s=digital-text&sprefix=lean+st%2Cdigital-text%2C302&sr=1-1",
      "resume": "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched. Eric Ries defines a startup as an organization dedicated to creating something new under conditions of extreme uncertainty. This is just as true for one person in a garage or a group of seasoned professionals in a Fortune 500 boardroom. What they have in common is a mission to penetrate that fog of uncertainty to discover a successful path to a sustainable business. The Lean Startup approach fosters companies that are both more capital efficient and that leverage human creativity more effectively. Inspired by lessons from lean manufacturing, it relies on “validated learning,” rapid scientific experimentation, as well as a number of counter-intuitive practices that shorten product development cycles, measure actual progress without resorting to vanity metrics, and learn what customers really want. It enables a company to shift directions with agility, altering plans inch by inch, minute by minute.",
      pages: "92",
      genres: "Bussiness",
      author: "Eric Reis",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 16,
      title: "I, Robot",
      year_release: "1982",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/41ED86iNFkL.jpg",
      amazon_link: "https://www.amazon.com/I-Robot-Book-1-ebook/dp/B000FC1PW0/ref=sr_1_2?crid=37Q92VPCQTPHH&dchild=1&keywords=isaac+asimov&qid=1632432064&s=digital-text&sprefix=isaac+asi%2Cdigital-text%2C305&sr=1-2",
      resume: "I, Robot, the first and most widely read book in Asimov’s Robot series, forever changed the world’s perception of artificial intelligence. Here are stories of robots gone mad, of mind-reading robots, and robots with a sense of humor. Of robot politicians, and robots who secretly run the world—all told with the dramatic blend of science fact and science fiction that has become Asimov’s trademark. The Three Laws of Robotics: 1) A robot may not injure a human being or, through inaction, allow a human being to come to harm. 2) A robot must obey orders given to it by human beings except where such orders would conflict with the First Law. 3) A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.",
      pages: "92",
      genres: "Science Fiction",
      author: "Isaac Asimov",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 17,
      title: "The Hitchhiker's Guide to the Galaxy",
      year_release: "2007",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/51vfuNNWMTS.jpg",
      amazon_link: "https://www.amazon.com/Hitchhikers-Guide-Galaxy-Douglas-Adams-ebook/dp/B000XUBC2C/ref=sr_1_1?dchild=1&keywords=The+Hitchhiker%27s+Guide+to+the+Galaxy&qid=1632432113&s=digital-text&sr=1-1",
      resume: "It’s an ordinary Thursday morning for Arthur Dent . . . until his house gets demolished. The Earth follows shortly after to make way for a new hyperspace express route, and Arthur’s best friend has just announced that he’s an alien. After that, things get much, much worse. With just a towel, a small yellow fish, and a book, Arthur has to navigate through a very hostile universe in the company of a gang of unreliable aliens. Luckily the fish is quite good at languages. And the book is The Hitchhiker’s Guide to the Galaxy . . . which helpfully has the words DON’T PANIC inscribed in large, friendly letters on its cover. Douglas Adams’s mega-selling pop-culture classic sends logic into orbit, plays havoc with both time and physics, offers up pithy commentary on such things as ballpoint pens, potted plants, and digital watches . . . and, most important, reveals the ultimate answer to life, the universe, and everything.",
      pages: "92",
      genres: "Science Fiction",
      author: "Douglas Adams",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    },
    {
      id: 18,
      title: "Foundation",
      year_release: "2007",
      price: 2990,
      image: "https://m.media-amazon.com/images/I/41sIWKtP-4L.jpg",
      amazon_link: "https://www.amazon.com/Foundation-Isaac-Asimov-ebook/dp/B000FC1PWA/ref=sr_1_1?crid=20BD250HGCU0S&dchild=1&keywords=foundation+asimov&qid=1632432306&s=digital-text&sprefix=foundation%2Cdigital-text%2C320&sr=1-1",
      resume: "For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future—to a dark age of ignorance, barbarism, and warfare that will last thirty thousand years. To preserve knowledge and save humankind, Seldon gathers the best minds in the Empire—both scientists and scholars—and brings them to a bleak planet at the edge of the galaxy to serve as a beacon of hope for future generations. He calls his sanctuary the Foundation. The Foundation novels of Isaac Asimov are among the most influential in the history of science fiction, celebrated for their unique blend of breathtaking action, daring ideas, and extensive worldbuilding. In Foundation, Asimov has written a timely and timeless novel of the best—and worst—that lies in humanity, and the power of even a few courageous souls to shine a light in a universe of darkness.",
      pages: "255",
      genres: "Science Fiction",
      author: "Isaac Asimov",
      updated_at: "17/08/2021 05:49:19",
      created_at: "17/08/2021 05:49:19"
    }
    ]) 

    /*
    await Books.selectAll()

    // await Books.selectByID(7)

    await Books.getTotal()

    await Books.getRandom()
    
    await Books.searchTitle('harry potter')

    await Books.update({
        id: 6,
        title: 'Title editado',
        year_release: 2018,
        price: 4990,
        image: 'image_here',
        amazon_link: 'amazon_link_here',
        resume: 'resume_here',
        pages: 257,
        genres: 'Fiction',
        author: 'JK Rowling'
    })*/

    // await Books.delete(6)
}

testModelBooks()