<?php 

include("conexion.php");
echo "hola";


        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $contraseña =trim($_POST['password']);
        
        $consulta="INSERT INTO usuarios(nombre, email, contraseña) VALUES ('$name','$email','$contraseña')";
        $resultado=mysqli_query($connection,$consulta);
        if($resultado){
            ?>
            <h3>te has inscrito correctamente
            </h3>

            <?php 
        }else{
             ?>
             <h3>ups ha ocurrido un problema</h3>
             <?php 
        }

?>







