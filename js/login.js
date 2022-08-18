function login(){
    let usuario = document.getElementById("form2Example18").value;
    let password = document.getElementById("form2Example28").value;
    if(usuario == "" || password == ""){
    if(usuario == "" ){
        document.getElementById("form2Example18").classList.add("error");
    }
    if(password == ""){
        document.getElementById("form2Example28").classList.add("error");
    }
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ingresaron todos los datos, intente nuevamente por favor',
        })
    }else {
        localStorage.setItem('user', usuario);
        location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("boton").addEventListener("click", ()=>{
        login();
    })
})