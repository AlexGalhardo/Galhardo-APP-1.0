# ---------------------------------------- LIKE

/*
WHERE CustomerName LIKE 'a%'    Finds any values that start with "a"
WHERE CustomerName LIKE '%a'    Finds any values that end with "a"
WHERE CustomerName LIKE '%or%'    Finds any values that have "or" in any position
WHERE CustomerName LIKE '_r%'    Finds any values that have "r" in the second position
WHERE CustomerName LIKE 'a_%'    Finds any values that start with "a" and are at least 2 characters in length
WHERE CustomerName LIKE 'a__%'    Finds any values that start with "a" and are at least 3 characters in length
WHERE ContactName LIKE 'a%o'    Finds any values that start with "a" and ends with "o"
*/



# ---------------------------------------- JOINS
SELECT colunas
FROM tabela1
INNER JOIN tabela2
ON tabela1.coluna=tabela2.coluna;



SELECT * FROM tbl_Livro
INNER JOIN tbl_autores
ON tbl_Livro.ID_Autor = tbl_autores.ID_Autor;



SELECT tbl_Livro.Nome_Livro, tbl_Livro.ISBN, tbl_autores.Nome_Autor
FROM tbl_Livro
INNER JOIN tbl_autores
ON tbl_Livro.ID_Autor = tbl_autores.ID_Autor;



SELECT L.Nome_Livro AS Livros, E.Nome_editora AS Editoras
FROM tbl_Livro AS L
INNER JOIN tbl_editoras AS E
ON L.ID_editora = E.ID_editora
WHERE E.Nome_Editora LIKE 'M%';



SELECT L.Nome_Livro AS Livro,
A.Nome_autor AS Autor,
E.Nome_Editora AS Editora,
L.Preco_Livro AS 'Preço do Livro'
FROM tbl_Livro AS L
INNER JOIN tbl_autores AS A
ON L.ID_autor = A.ID_autor
INNER JOIN tbl_editoras AS E
ON L.ID_editora = E.ID_editora
WHERE E.Nome_Editora LIKE 'O%'
ORDER BY L.Preco_Livro DESC;
