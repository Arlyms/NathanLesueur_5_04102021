// Appeler l'API de façon asynchrone

async function chargerCanapes() {
    
    const response = await fetch('http://localhost:3000/api/products');
    const canapes = await response.json();
    console.log(canapes);

    return canapes;
}

// Injecter les resultats dans le html

function afficherCanapes(canapes)
{
    canapes.forEach((canape) => {
        const html = ` 
            <a class="appareil stretched-link" href="produit.html?id=${canape._id}">
                <article>
                    <img src="${canape.imageUrl}" alt="${canape.altTxt}">
                    <h3>${canape.name}</h3>
                    <p>${canape.description}</p>
                    
                </article>
            </a>
        `
        document.getElementById("items").innerHTML += html;
    });
}

// Tout est ok on peut lancer le script

window.addEventListener("load", async () => {
    const canapes = await chargerCanapes();
    afficherCanapes(canapes);
  });   