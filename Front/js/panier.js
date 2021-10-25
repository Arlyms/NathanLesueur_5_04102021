function chargerPanier()
{
  // Recuperation du panier dans le local storage 
  const panierData = localStorage.getItem("Produit");
  let panier = [];
  
  if(panierData)
    panier = JSON.parse(panierData);

  return panier;
}

async function chargerCanape(id)
{
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const canape = await response.json();

    return canape;
}

// calculer la somme total du panier + boutons suppression 

async function totalPanier(panier)
{
  let nombreDeCanape = 0;
  let total = 0;
  //Pour chaque produit du panier
  for (i = 0; i < panier.length; i++){
    const produit = panier[i];
    //  Charger les informations du canapé en cours de traitement
    const canape = await chargerCanape(produit.id);
    //  Total <- Total + (Prix du canapé * Nombre de ce canapé)
    total = total + (canape.price * produit.nombre);
    nombreDeCanape = nombreDeCanape +produit.nombre;
   
  }

  document.getElementById("totalQuantity").innerHTML = nombreDeCanape;
  document.getElementById("totalPrice").innerHTML = total;
}

// Afficher Le panier

async function afficherPanier(panier)
{
    let html = "";
    let index = 0;
    for(const produit of panier)
    {
      const canape = await chargerCanape(produit.id);

      html +=`
            <article class="cart__item" data-index="${index}" data-id="${canape._id}"">
                <div class="cart__item__img">
                  <img src="${canape.imageUrl}" alt="${canape.AltTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${canape.name}</h2>
                    <p>${(canape.price * produit.nombre)} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.nombre}">
                    </div>
                    <div class="cart__item__content__settings__color">
                      <p>Couleur :</p>
                      <input type="string" class="itemColor" name="itemColor" value="${produit.couleur}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <button class="deleteItem">Supprimer</button>
                    </div>
                  </div>
                </div>
            </article>
            `   
           ++index;

     }

    document.getElementById("cart__items").innerHTML = html;

    // supprimer un produit 
     let boutons = document.querySelectorAll(".deleteItem");
     for (let i = 0; i < boutons.length; ++i){
      boutons[i].addEventListener("click", (event)=> {
        const boutonClique = event.target;
        const article = boutonClique.closest(".cart__item");

        console.log(article.dataset.index + " , " + article.dataset.id);
        panier.splice(article.dataset.index, 1);
        localStorage.setItem("Produit",JSON.stringify(panier));
        afficherPanier(panier);
        totalPanier(panier);
      });
     }
} 


window.addEventListener("load", () => {
  const panier = chargerPanier();  
  afficherPanier(panier);   
  totalPanier(panier);   
});

