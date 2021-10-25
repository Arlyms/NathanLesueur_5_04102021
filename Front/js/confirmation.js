const params = new URL(document.location).searchParams;

    if(params.has("id")){
        document.getElementById("orderId").innerHTML = params.get("id");
        localStorage.removeItem("Produit");
    }


        

        