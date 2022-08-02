const inputUsuario = document.getElementById("usuario")
const inputContrasenia = document.getElementById("contrasenia")
const formSesion = document.getElementById("form-sesion")
const newNote = document.getElementById("new-note")
const logOut = document.getElementById("log-out")
const main = document.querySelector("main")
const asideLogin = document.querySelector("aside")
const formNewNote = document.getElementById("form-new-note")
const inputFechaNewNote = document.getElementById("input-fecha-newnote")
const inputTextNewNote = document.getElementById("input-text-newnote")
const containerNotes = document.getElementById("container-notes")
const cerrarFormNewNote = document.getElementById("cerrar-newnote")

// variables globales

const user = {
    usuario: "caro",
    contrasenia: "lala"
}

let notas = []

// grupo 1

formSesion.onsubmit = (e) => {
    e.preventDefault()
    if ( inputUsuario.value === user.usuario && inputContrasenia.value === user.contrasenia ) {
        main.style.display = "flex"
        asideLogin.style.display = "none"
        localStorage.setItem("user", true)
    } else {
        formSesion.reset()
        alert("El usuario o contraseña es incorrecto")
    }
}

function preferenciaDeUsuario () {
    const tokenLS = localStorage.getItem("user")
    if ( tokenLS === "true" ) {
        main.style.display = "flex"
        asideLogin.style.display = "none"
    } else if ( tokenLS !== "true" ) {
        main.style.display = "none"
        asideLogin.style.display = "flex"
    }
}

preferenciaDeUsuario()

logOut.onclick = () => {
    localStorage.removeItem("user")
    location.reload() // recarga la página
}

// grupo 2

newNote.onclick = () => {
    formNewNote.style.display = "flex"
}

cerrarFormNewNote.onclick = () => {
    formNewNote.style.display = "none"
}

const notasAlLocalStorage = (array) => {
    const arrayConvertidoAJSON = JSON.stringify(array)
    localStorage.setItem("notas", arrayConvertidoAJSON)
}

const valorDelLocalStorage = (clave) => {
    const valorDelLs = localStorage.getItem(clave)
    const parsearValor = JSON.parse(valorDelLs)
    return parsearValor
}

// grupo 3

const pushearObjetos = (fecha, nota, array) => array.push({
    fechaDeLaNota: fecha,
    descripcion: nota
})

const notasAlHtml = (array) => {

    const arrayReducido = array.reduce((acc, curr) => {
        const fecha = new Date(curr.fechaDeLaNota)

        return acc + `
            <article class="notita">
                <h2>
                    ${fecha.toLocaleDateString()}
                </h2>
                <p>
                    ${curr.descripcion}
                </p>
            </article>
        `
    },"")

    return arrayReducido
}

formNewNote.onsubmit = (e) => {
    e.preventDefault()
    pushearObjetos(inputFechaNewNote.value, inputTextNewNote.value, notas)
    notasAlLocalStorage(notas)
    formNewNote.reset()
    formNewNote.style.display = "none"
    containerNotes.innerHTML = notasAlHtml(notas)
}

let notasTraidasDelLocalStorage = valorDelLocalStorage("notas")
notas = notasTraidasDelLocalStorage
containerNotes.innerHTML = notasAlHtml(notas)