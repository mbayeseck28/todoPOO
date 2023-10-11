// Déclaration des Variables
let form = document.querySelector('.formulaire'); // Sélectionne le formulaire par sa classe CSS
const listTache = document.querySelector('#taskList'); // Sélectionne la liste des tâches par son ID
let input = document.querySelector('.entree'); // Sélectionne le champ de texte d'entrée par sa classe

// Local Storage
class Storage {
  // Méthode statique pour ajouter des éléments dans le stockage local
  static addtoLocalStorage(todoArr) {
    let storage = localStorage.setItem('todo', JSON.stringify(todoArr));
    return storage;
  }
  // Méthode statique pour récupérer les éléments du stockage local
  static getStorage() {
    let storage;
    if (localStorage.getItem('todo') === null) {
      storage = [];
    } else {
      storage = JSON.parse(localStorage.getItem('todo'));
    }
    return storage;
  }
}

// Tableau Tache
let todoArr = Storage.getStorage(); // Initialise le tableau de tâches à partir du stockage local

// Instanciation de Class
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Empêche la soumission par défaut du formulaire
  let id = Math.random() * 1000000; // Génère un ID aléatoire (pas recommandé en production)
  const todo = new Todo(id, input.value); // Crée un nouvel objet Todo
  todoArr = [...todoArr, todo]; // Ajoute la tâche à todoArr
  AffichageTodo.afficher(); // Affiche la liste mise à jour
  AffichageTodo.effacerEntree(); // Efface le champ de texte d'entrée
  AffichageTodo.supprimerTache(); // Active la suppression de tâche
  AffichageTodo.modifierTache(); // Active la modification de tâche
  Storage.addtoLocalStorage(todoArr); // Enregistre les tâches dans le stockage local
});

// Création des class
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

// Afficher le toDo dans le DOM
class AffichageTodo {
  static afficher() {
    let afficher = todoArr.map((item) => {
      return `
        <li class="list-group-item" id="${item.id}">
            <span>${item.todo}</span>
            <div class="btn-group float-right">
                <button class="btn btn-warning edit" data-id="${item.id}" type="button">Modifier</i></button>
                <button class="btn btn-danger remove" data-id="${item.id}" type="button">Supprimer</button>
            </div>
        </li>
        `;
    });
    listTache.innerHTML = afficher.join(' '); // Affiche les éléments dans la liste
  }

  static effacerEntree() {
    input.value = ''; // Efface le champ de texte d'entrée
  }

  static supprimerTache() {
    listTache.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove(); // Supprime l'élément du DOM
      }
      let btnId = e.target.dataset.id;
      // Efface dans le tableau
      AffichageTodo.effacerTacheDansTab(btnId);
    });
  }

  static effacerTacheDansTab(id) {
    todoArr = todoArr.filter((item) => item.id !== +id); // Supprime l'élément du tableau
    Storage.addtoLocalStorage(todoArr); // Met à jour le stockage local
  }

  static modifierTache() {
    listTache.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit')) {
        document.querySelector('.entree').value =
          e.target.parentElement.parentElement.children[0].textContent; // Place le texte dans le champ de texte d'entrée pour modification
        e.target.parentElement.parentElement.remove(); // Supprime l'élément du DOM
        let btnId = e.target.dataset.id;
        // Efface dans le tableau
        AffichageTodo.effacerTacheDansTab(btnId);
      }
    });
  }
}

// Événement lors du chargement de la page
addEventListener('DOMContentLoaded', () => {
  AffichageTodo.afficher(); // Affiche la liste au chargement de la page
  AffichageTodo.supprimerTache(); // Active la suppression de tâche
});
