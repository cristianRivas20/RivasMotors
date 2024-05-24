<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <title>Formulario de Registro</title>
    <link rel="stylesheet" href="../Estilos/login.css">
</head>
<body>
    <div class="container-form register">
        <div class="information">
            <div class="info-childs">
                <h2>Bienvenido a RivasMotors</h2>
                <p> Para unirte a nuestra comunidad por favor inicia sesion con tus datos </p>
                <input type="button" value="Inicia sesion" id="sign-in">
            </div>
        </div>
        <div class="form-information">
            <div class="form-information-childs">
                <h2>Crear una cuenta</h2>
                <div class="icons">
                    <i class='bx bxl-google'></i>
                    <i class='bx bxl-github' ></i>
                    <i class='bx bxl-linkedin' ></i>
                </div>
                <p>O usa tu email como registrarte</p>
                <form class="form"action="../BBDD/crearUsuario.php" method="post">
                    <label for="">
                        <i class='bx bx-user' ></i>
                        <input type="text" name="name" placeholder="Nombre y apellidos">
                    </label>
                    <label>
                        <i class='bx bx-envelope' ></i>
                        <input type="email"name="email" placeholder="Correo electronico">

                    </label>
                    <label>
                        <i class='bx bx-lock-alt' ></i>
                        <input type="password"name="password" placeholder="contraseña" >

                    </label>
                    <input type="submit" value="Registrarse">
                </form>
            </div>
        </div>
    </div>




    <div class="container-form login hide">
        <div class="information">
            <div class="info-childs">
                <h2>¡¡Bienvenido nuevamente!!</h2>
                <p> Para unirte a nuestra comunidad por favor inicia sesion con tus datos </p>
                <input type="button" value="Registrarse" id="sign-up">
            </div>
        </div>
        <div class="form-information">
            <div class="form-information-childs">
                <h2>Iniciar Sesion</h2>
                <div class="icons">
                    <i class='bx bxl-google'></i>
                    <i class='bx bxl-github' ></i>
                    <i class='bx bxl-linkedin' ></i>

                </div>
                <p>O iniciar sesion con una cuenta</p>
                <form class="form" action="../BBDD/crearUsuario.php" method="post">

                    

                    <label>
                        <i class='bx bx-envelope' ></i>
                        <input type="email" placeholder="Correo electronico">

                    </label>

                    <label>
                        <i class='bx bx-lock-alt' ></i>
                        <input type="password" placeholder="contraseña" >

                    </label>
                    <input type="submit" value="Iniciar Sesion">
                </form>
            </div>
        </div>
    </div>

<script src="../JavaScript/login.js"></script>

   <?php 
   include("../BBDD/conexion.php");
   
   
   ?>
    
    
</body>
</html>