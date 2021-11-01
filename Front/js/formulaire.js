// Formulaire (on peut forcement faire plus simple)

let formulaire = document.querySelector('.cart__order__form');

// Ecouter les modifications des differants champs

formulaire.lastName.addEventListener('change', function (){
  validationLastName(this);
});

formulaire.firstName.addEventListener('change', function (){
  validationFistName(this);
});

formulaire.address.addEventListener('change', function (){
  validationAddresse(this);
});

formulaire.city.addEventListener('change', function (){
  validationCity(this);
});

formulaire.email.addEventListener('change', function (){
  validationEmail(this);
})

// Ecouter la soumission du formulaire

formulaire.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(validationFistName(formulaire.firstName) 
  && validationLastName(formulaire.lastName)
  && validationAddresse(formulaire.address)
  && validationCity(formulaire.city)
  && validationEmail(formulaire.email)){
    const contact = {
      firstName : formulaire.firstName.value,
      lastName : formulaire.lastName.value,
      address : formulaire.address.value,
      city : formulaire.city.value,
      email : formulaire.email.value,
    }

    const panier = chargerPanier();

    if(panier.length === 0)
    {
      alert("Panier vide !");
      return;
    }

    //const products = panier.map((product) => { return product.id});
    // Identique à :
    const products = [];

    for(const product of panier)
    {
      products.push(product.id);
    }

    console.log(JSON.stringify({
      contact : contact,
      products : products})
      );
      
    const response = await fetch (
      `http://localhost:3000/api/products/order`,
      {
        method:"post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contact : contact,
          products : products})
      }
    );

    if(response.status === 201)
    {
      //formulaire.submit();
      const order = await response.json();
      location.replace(`confirmation.html?id=${order.orderId}`);
    }
    else
    {
      console.log(response);
      alert("Une erreur s'est produite lors de l'envoie de votre commande !");
    }
  }
});

// function de validation des champs 

function validationFistName(inputFirstName) {
  //creation de la reg exp pour validation name
  let firstNameRegExp = new RegExp(
    /^[a-zA-ZéèÉÈ]+$/, 'g' // mettre plus de d'accents pour les prénoms ? 
  );
  
  let testFirstName = firstNameRegExp.test(inputFirstName.value);
  let message = document.getElementById("firstNameErrorMsg")

  if(testFirstName){
    message.innerHTML = '✓'
    message.classList.remove("red");
    message.classList.add("green");
    return true;
  } else {
    message.innerHTML = 'Prénom Non Valide';
    message.classList.remove("green");
    message.classList.add("red");
    return false;
  }
};

function validationLastName(inputLastName) {
  
  let lastNameRegExp = new RegExp(
    /^[a-zA-ZéèÉÈ]+$/, 'g' // mettre plus de d'accents pour les Noms ? peut etre introduire les espaces ? 
  );
  
  let testLastName = lastNameRegExp.test(inputLastName.value);
  let message = document.getElementById("lastNameErrorMsg")

  if(testLastName){
    message.innerHTML = '✓';
    message.classList.remove("red");
    message.classList.add("green");
    return true;
  } else {
    message.innerHTML = 'Nom Non Valide';
    message.classList.remove("green");
    message.classList.add("red");
    return false;
  }
};

function validationAddresse(inputAdresse) {
  
  let addresseRegExp = new RegExp(
    /^[a-zA-Z0-9\s,'-]*$/, 'g' 
  );
  
  let testAddresse = addresseRegExp.test(inputAdresse.value);
  let message = document.getElementById("addressErrorMsg")

  if(testAddresse){
    message.innerHTML = '✓';
    message.classList.remove("red");
    message.classList.add("green");
    return true;
  } else {
    message.innerHTML = 'Adresse Non Valide';
    message.classList.remove("green");
    message.classList.add("red");
    return false;
  }
};

function validationCity(inputCity) {
  
  let cityRegExp = new RegExp(
     /^[a-zA-Z\s,'-]+$/, 'g'  
  );
  
  let testCity = cityRegExp.test(inputCity.value);
  let message = document.getElementById("cityErrorMsg")

  if(testCity){
    message.innerHTML = '✓';
    message.classList.remove("red");
    message.classList.add("green");
    return true;
  } else {
    message.innerHTML = 'Ville Non Valide';
    message.classList.remove("green");
    message.classList.add("red");
    return false;
  }
};

function validationEmail(inputEmail) {
  
  let emailRegExp = new RegExp(
    /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,})+)$/, 'g' 
  );
  
  let testEmail = emailRegExp.test(inputEmail.value);
  let message = document.getElementById("emailErrorMsg")

  if(testEmail){
    message.innerHTML = '✓';
    message.classList.remove("red");
    message.classList.add("green");
    return true;
  } else {
    message.innerHTML = 'Email Non Valide';
    message.classList.remove("green");
    message.classList.add("red");
    return false;
  }
};