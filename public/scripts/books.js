async function recommendOtherBook(){

    const random_book_id = await Math.floor(Math.random() * 3) + 1;
    const response = await fetch(`https://galhardoapp-json-database.herokuapp.com/books/${random_book_id}`);
    const book = await response.json();

    Object.entries(book).forEach(([key, value]) => {
        document.getElementById("book_id").value = book.id;
        document.getElementById("book_image").src = book.image;
        document.getElementById("book_title").innerHTML = book.title;
        document.getElementById("book_year_release").innerHTML = book.year_release;
        document.getElementById("book_resume").innerHTML = book.resume;
        document.getElementById("book_author").innerHTML = book.author;
        document.getElementById("book_genres").innerHTML = book.genres;
        document.getElementById("book_pages").innerHTML = book.pages;
        document.getElementById("book_amazon_link").href = book.amazon_link;
    });
}