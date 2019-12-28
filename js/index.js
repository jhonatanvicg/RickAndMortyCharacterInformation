// fetch('https://rickandmortyapi.com/api/character/')
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(user){
//         console.log(user.results[0])
//     })


    (async function rickAndMorty(){

        async function obtenerDatos(url){
            const respuesta = await fetch(`${url}`);
            const datos = await respuesta.json();
    
            return datos;
            

        }

        const API_BASE = 'https://rickandmortyapi.com/api/character/?page=';

        var contador = 1
        const {results:listaPersonajes} = await obtenerDatos(`${API_BASE}${contador}`)
        const $contenedor = document.querySelector('#container');


        function templatePersonajes(personaje){

            return(
                `<div class="item" data-id= "${personaje.id}">
                    <img src="${personaje.image}"  alt="${personaje.name}">
                </div>`
            )
        }

        function createTemplate(HTMLString){
            const html = document.implementation.createHTMLDocument();//CREAMO UN DOCUMENTO HTML
            html.body.innerHTML = HTMLString;//Se crea el template donde se agregara la imagen y este sera retornado
            return html.body.children[0]
        }

        function findCharacter(id,listaP){
            return listaP.find(personaje => personaje.id === parseInt(id,10));
        }

        const $overlay = document.getElementById('overlay');
        const $modal = document.getElementById('modal');

        const $imagen = $modal.querySelector('img');
        const $name = document.querySelector('#nameContainer-text');
        const $status = $modal.querySelector('#status');
        const $specie = $modal.querySelector('#specie');
        const $gender = $modal.querySelector('#gender');
        const $origin = $modal.querySelector('#origin');
        const $lastLocation = $modal.querySelector('#lastLocation');
        const closeModal = $modal.querySelector('.item__close-modal');

        closeModal.addEventListener('click',hideModal);
        function hideModal(){
            $overlay.classList.remove('active');
            $modal.style.animation = 'modalOut .8s forwards';
        }

        function showModal($elemento,listaP){
            const id = $elemento.dataset.id;
            const data = findCharacter(id,listaP);
            $overlay.classList.add('active');
            $modal.style.animation = 'modalIn .8s forwards';
            $status.textContent = data.status;
            $imagen.setAttribute('src',data.image);
            $specie.textContent = data.species;
            $gender.textContent = data.gender;
            $origin.textContent = data.origin.name;
            $lastLocation.textContent = data.location.name;
            $name.textContent = data.name;

        }

        function addEventClickElement($elemento,listaP){
            $elemento.addEventListener('click',()=>{
                showModal($elemento,listaP);
            })
        }


        function renderPersonajes(listaP,$contenedor){
            listaP.forEach((personaje)=>{
                const HTMLString = templatePersonajes(personaje);
                const cartaPersonaje = createTemplate(HTMLString);
                $contenedor.append(cartaPersonaje);

                addEventClickElement(cartaPersonaje,listaP);

            })
        }


        renderPersonajes(listaPersonajes,$contenedor);

        // async function addEventClick(nextPage){
        //     nextPage.addEventListener('click',async ()=>{
        //         contador++;
        //         const cartas = document.getElementsByClassName('item');
        //         const $cont = document.querySelector('#container');
        //         for(var i = 0 ; i<20 ; i ++){
        //             $cont.children[0].remove(cartas);
        //         }
        //         const {results:listaPersonajes} = await obtenerDatos(`${API_BASE}${contador}`)
        //         renderPersonajes(listaPersonajes,$contenedor);
        //     })
        // }


        async function changePage(valor){
            if(valor == 'siguiente'){
                contador++;

            }else if(valor == 'atras'){
                contador--
            }
            const cartas = document.getElementsByClassName('item');
            const $cont = document.querySelector('#container');
            for(var i = 0 ; i<20 ; i ++){
                $cont.children[0].remove(cartas);
            }
            const {results:listaPersonajes} = await obtenerDatos(`${API_BASE}${contador}`)
            renderPersonajes(listaPersonajes,$contenedor);


        }

        const np = 'siguiente';
        const bp = 'atras';

        const nextPage = document.getElementById('btn-next').addEventListener('click',()=>{
            changePage(np)
        });
        const backPage = document.getElementById('btn-back').addEventListener('click',()=>{
            changePage(bp);
        });


    })()