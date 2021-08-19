async function recommendOtherBook(){
    const response = await fetch(`http://localhost:3000/api/public/books/random`);
    const object = await response.json();

    console.log(object)

    Object.entries(object).forEach(([key, value]) => {
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
}