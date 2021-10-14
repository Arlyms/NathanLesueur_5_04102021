// Recuperation de l'ID du produit par L'URL

function recuperationProduitParId()
{
    const params = new URL(document.location).searchParams;

    if(params.has("id"))
        return params.get("id");
    else
        return null;    
}

// Appeler l'API (par ID) de façon asynchrone

async function chargerCanape(id)
{
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const canape = await response.json();
    console.log(canape);

    return canape;
}

// Charger le produit

function chargementProduit(canape) 
{
    let html = `
                <article>
                    <div class="item__img">
                    <img src="${canape.imageUrl}" alt="${canape.altTxt}">
                    </div>
                    <div class="item__content">

                    <div class="item__content__titlePrice">
                        <h1>${canape.name}</h1>
                        <p>Prix : <span>${canape.price}</span>€</p>
                    </div>

                    <div class="item__content__description">
                        <p class="item__content__description__title">Description :</p>
                        <p id="description">${canape.description}</p>
                    </div>

                    <div class="item__content__settings">
                        <div class="item__content__settings__color">
                        <label for="color-select">Choisir une couleur :</label>
                        <select name="color-select" id="colors">
                            <option value="">--SVP, choisissez une couleur --</option>`

    canape.colors.forEach(couleur => {
        html += `<option value="${couleur}">${couleur}</option>`
    });                      
                            
    html += `
                        </select>
                        </div>

                        <div class="item__content__settings__quantity">
                        <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                        <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                        </div>
                    </div>

                    <div class="item__content__addButton">
                        <button id="addToCart">Ajouter au panier</button>
                    </div>

                    </div>
                </article>
                `
    document.getElementById("items").innerHTML += html;
}

// Tout est ok on peut lancer le script

window.addEventListener("load", async () => {
    
    const productId = recuperationProduitParId();

    if(productId === null)
        location.replace("index.html");

    const canape = await chargerCanape(productId);

    chargementProduit(canape);
});  
