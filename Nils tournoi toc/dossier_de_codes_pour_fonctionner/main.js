let equipes = [];

let equipesRandom = equipes.slice(0);

let adversaires = equipesRandom.slice(0);

// test premiere team random nouveau tableau console.log(equipes[0]);

let numeroOrdreEquipe = 0;

let numeroMatch = 0;

let nombreTotalMatchPoules = 0;

let round = 1;

let roundTotal = 5;



let tableauDesAdversairesChoisis = [];                  // FAIRE CHOISIR UN NOMBRE DE ROUND POSSIBLE (entre 1 et le maximum sans que ca bug avec le nombre d'équipes)
                                                        // Système pour ajouter qui a gagné de manière sure sur les cartes matchs ewt afficher en temps réel qui a le plus de points (sur points possible ?);
                                                        // Voir comment sauvegarder les données dans localstorage

                                                        // Faire deux poules de 6 apparement ? Redemander au broloss
let nombreDeRound = 4;


document.querySelector('#debut_tournoi').addEventListener("click", function debutTournoi(e) {

    let validation = prompt(`Veuillez écrire "Commmencer" avec un C majuscule pour démarrer le Tournoi`)

    if(validation === "Commencer") {   
        //shuffle(equipesRandom);
        equipesRandom = equipes.slice(0);
        tirageAuSortPoules();
    } else {
        window.alert(`Début du tournoi annulé.`)
    }
});


// GESTION AJOUT EQUIPE VIA INPUT ET ENTER

document.addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {

        // On enlève les equipes du dom
        miseJourEquipesDom();
        
        // On ajoute l'équipe de l'input au tableau
        prendreInfosInput();

        // On ajoute les équipes au DOM après avoir ajouté la nouvelle equipe
        listeEquipesAffichees();

        // Supression de l'équipe via la croix
        mettreAddEventSurCroixSupprimer();

        // Affichage nombre d'équipes
        affichageNombreEquipe();

        affichageNombreMatch();

    }
});



// Activation matchs et de leur affichage dans le DOM + supression des paramètres de gestions des equipes

function tirageAuSortPoules() {

    function creationAdversaires(equipesRandom) {

        for (let e = 0; e <= nombreDeRound; e++) {

            const tableauDesAdversaires = [];

            for (let b = 0; b < equipesRandom.length; b++) {
                tableauDesAdversaires.push(equipesRandom[(b + e + 1) % equipesRandom.length])  // 1 .. 2 .. 3 ..
            }                             
            
            tableauDesAdversairesChoisis.push(tableauDesAdversaires);

        }
    }

    creationAdversaires(equipesRandom);



    function creationDesMatchs(equipesRandom, tableauDesAdversairesChoisis) {

        for (let elementTableau = 0; elementTableau < (tableauDesAdversairesChoisis.length); elementTableau++) {

            if (round > roundTotal) {
                break;
            }

            separationRound(round);
            

            let joueurDejaSortiRounds = [];
            let joueursRestants = [];
            let adversairesRestants = [];

            for (longueurSousTableau = 0; longueurSousTableau < equipesRandom.length; longueurSousTableau++) {

                // console.log(equipes[longueurSousTableau] + " vs " + tableauDesAdversairesChoisis[elementTableau][longueurSousTableau]);
                let equipe = equipesRandom[longueurSousTableau];
                let adversaire = tableauDesAdversairesChoisis[elementTableau][longueurSousTableau];
                
                //matchsDansLeDom(equipe, adversaire);


                
                if (!(joueurDejaSortiRounds.includes(equipe) || joueurDejaSortiRounds.includes(adversaire))) {

                    matchsDansLeDom(equipe, adversaire);
                    joueurDejaSortiRounds.push(equipe);
                    joueurDejaSortiRounds.push(adversaire);
                    /*
                    console.log(equipe + ", " + adversaire + "ont été ajoutés a tableau");
                    console.log("Après ajout il est");
                    console.log(joueurDejaSortiRounds);
                    */

                } else {

                    joueursRestants.push(equipe);
                    adversairesRestants.push(adversaire);

                    /*
                    console.log(equipe + ", " + adversaire + "ont été ajoutés a plus tard");
                    console.log("Après ajout il est:");
                    console.log(joueurDejaSortiRounds);
                    console.log(joueursRestants);
                    console.log(adversairesRestants);
                    */
                }
                            
            }

            round++
            
            if (round > roundTotal) {
                break;
            }

            separationRound(round);

            for (let match = 0; match < joueursRestants.length; match++) {

                let equipe = joueursRestants[match];
                let adversaire = adversairesRestants[match];
                matchsDansLeDom(equipe, adversaire);

            }

            round++
            
        }
    }

    creationDesMatchs(equipesRandom, tableauDesAdversairesChoisis);

    let lesmatchss = document.querySelectorAll(".match");

    for(match of lesmatchss) {

        match.addEventListener("click", function effacementDeLequipe(e) {

            if (this.classList.contains("match") && this.classList.contains("fonce")) {
                this.classList.remove("fonce")
            } else {
                this.classList.add("fonce")
            }

        });
    }

}



// Créations dans le DOM des Matchs

function matchsDansLeDom(equipe, adversaire) {

    // Création div container match
    let matchElementDom = document.createElement("div");
    matchElementDom.setAttribute("id", "match_round_" + ++numeroMatch);
    matchElementDom.setAttribute("class", "match");
    document.querySelector("#matchs").appendChild(matchElementDom);

    // Création titre h3 équipe
    let nomMatch = document.createElement("h3");
    nomMatch.setAttribute("class", "nom_match");
    matchElementDom.appendChild(nomMatch);
    nomMatch.innerText = "Match nº" + numeroMatch;

    let dueliste1 = document.createElement("p");
    dueliste1.setAttribute("class", "dueliste1");
    matchElementDom.appendChild(dueliste1);
    dueliste1.innerText = equipe;

    let vs = document.createElement("p");
    vs.setAttribute("class", "vs");
    matchElementDom.appendChild(vs);
    vs.innerText = "vs";

    let dueliste2 = document.createElement("p");
    dueliste2.setAttribute("class", "dueliste2");
    matchElementDom.appendChild(dueliste2);
    dueliste2.innerText = adversaire;

}


function separationRound(round) {

    let titreRound = document.createElement("h2");
    titreRound.setAttribute("id", "Round_" + round);
    titreRound.setAttribute("class", "titre_round");
    document.querySelector("#matchs").appendChild(titreRound);

    titreRound.innerText = "Round: " + round;
}



// Mélange aléatoire du tableau des équipes

function shuffle(array) {

    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}



// Ajout des équipes via l'Input

function prendreInfosInput() {

    // Sélectionner l'élément input et récupérer sa valeur
    let texteInput = document.getElementById("nom_equipe").value;

    let nomEquipeDejaPresent = equipes.includes(texteInput);

    if (texteInput === "") {
        let NomVide = window.alert("Le champ équipe ne peut pas être vide");
        return NomVide;
    } else if (nomEquipeDejaPresent === true) {
        window.alert("Le nom d'équipe est déjà utilisé");
    } else {
        //Incrément compteur nombre total de match
        ++nombreTotalMatchPoules;

        //Ajout de l'équipe dans le tableau équipes
        equipes.push(texteInput);
    }

    // Vider l'élément input après inscription équipe
    document.getElementById("nom_equipe").value = "";
}



// Mettre la supression des equipes via la croix dans le DOM

function mettreAddEventSurCroixSupprimer() {

    let lesCroix = document.querySelectorAll('.supression_equipe');
    
    for(croix of lesCroix) {

        croix.addEventListener("click", function effacementDeLequipe(e) {
    
            let ordreEmplacementEquipe = this.getAttribute('id');
            //console.log("Equipe numéro : " + ordreEmplacementEquipe);
            let ouSlice = ordreEmplacementEquipe -1;
            equipes.splice(ouSlice, 1);

            // Décrément compteur nombre total de match
            --nombreTotalMatchPoules;

            // On enlève les equipes du dom
            miseJourEquipesDom();

            // On ajoute les équipes au DOM après avoir ajouté la nouvelle equipe
            listeEquipesAffichees();

            // Supression de l'équipe via la croix
            mettreAddEventSurCroixSupprimer();

            // Affichage nombre d'équipes
            affichageNombreEquipe();

            affichageNombreMatch();
    
        });
    }
}



// GESTION AJOUT EQUIPE DANS LE DOM

function listeEquipesAffichees() {

    for (let equipe of equipes) {

        // Création div équipe
        let equipeElementDom = document.createElement("div");
        equipeElementDom.setAttribute("id", "equipe_" + ++numeroOrdreEquipe);
        equipeElementDom.setAttribute("class", "equipe");
        document.querySelector("#liste_equipes").appendChild(equipeElementDom);

        // Création titre h3 équipe
        let equipeNomDom = document.createElement("h3");
        equipeNomDom.setAttribute("class", "nom_equipe");
        equipeElementDom.appendChild(equipeNomDom);
        equipeNomDom.innerText = equipe;

        // Création image croix supression equipe
        let imageCroix = document.createElement("img");
        imageCroix.src = "dossier_de_codes_pour_fonctionner/img/close.png";
        imageCroix.setAttribute("class", "supression_equipe");
        imageCroix.setAttribute("id", numeroOrdreEquipe);
        equipeElementDom.appendChild(imageCroix);

    }

    numeroOrdreEquipe = 0;

}


// Supression de toute les équipes du DOM

function miseJourEquipesDom() {

    let lesEquipes = document.querySelectorAll(".equipe");
    //console.log(lesEquipes);

    // Si il y a des equipes, les supprimer avant de remettre les nouvelles
    if(!(equipes.length === 0)) {

        for(let equipe = 0; equipe < lesEquipes.length; ++equipe) {
            document.querySelector("#equipe_" + (equipe + 1)).remove();
        }

    }

        numeroOrdreEquipe = 0;
}



// Comptage du nombre d'équipes dans le DOM

function affichageNombreEquipe() {

    document.querySelector("#nombre_equipes").innerText = equipes.length;

}



// Comptage du nombre de matchs dans le DOM

function affichageNombreMatch() {

    let nombre;
    nombre = equipes.length;

    if(nombre%2 === 0)
    {
        document.querySelector("#nombre_matchs_total").innerText = roundTotal * equipes.length / 2;
    }
    else
    {
        document.querySelector("#nombre_matchs_total").innerText = roundTotal * Math.round(equipes.length / 2);
    }

}


