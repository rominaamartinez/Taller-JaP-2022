document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    let usuario = localStorage.getItem('user');
    if(usuario === null){ 
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe iniciar sesión para acceder a la web',
        }).then(function(){
            location.href = "login.html"
        })

    }else{
        Swal.fire({
            icon: 'success',
            title: 'Iniciaste sesión',
        })
    }
 
});

