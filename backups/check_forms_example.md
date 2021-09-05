```html
<DOCTYPE html>
<html>
    <head>
        <title>Validar Formulário com JavaScript</title>
        <meta charset="utf-8">
        <script type="text/javascript">
            function validar(){
                var nome = formuser.nome.value;
                var email = formuser.email.value;
                var senha = formuser.senha.value;

                if(nome == ""){
                    alert('Preencha o campo nome.');
                    formuser.nome.focus();
                    return false;
                }

                if(email == "" || email.indexOf('@') == -1 ){
                    alert('Preencha o campo E-mail.');
                    formuser.email.focus();
                    return false;
                }

                if(senha == "" || senha.length <= 5){
                    alert('Preencha o campo senha com minimo 6 caracteres');
                    formuser.senha.focus();
                    return false;
                }
            }
        </script>
    </head>
    <body>
        <h1>Cadastrar Usuário</h1>
        <form name="formuser" action="enviar.php" method="POST">
            Nome:<input type="text" name="nome" ><br><br>
            E-mail:<input type="text" name="email" ><br><br>
            Senha:<input type="password" name="senha" ><br><br>

            <input type="submit" onclick="return validar()">
        </form>
    </body>
</html>
```
