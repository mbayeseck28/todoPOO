// Déclaration des Variables
form = document.querySelector('.formulaire');
const listTache = document.querySelector('#taskList');
let input = document.querySelector('.entree');

// Tableau Tache
let todoArr = [];

// Instanciation de Class
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  const todo = new Todo(id, input.value);
  todoArr = [...todoArr, todo];
  AffichageTodo.afficher();
  AffichageTodo.effacerEntree();
  AffichageTodo.supprimerTache();
  AffichageTodo.modifierTache();
  console.log(todoArr);
});

//  // Création des class
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
                <button class="btn btn-warning edit" type="button">Modifier</i></button>
                <button class="btn btn-danger remove" data-id="${item.id}" type="button">Supprimer</button>
            </div>
        </li>
        `;
    });
    listTache.innerHTML = afficher.join(' ');
  }
  static effacerEntree() {
    input.value = '';
  }
  static supprimerTache() {
    listTache.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      //Effacer dans le tableau
      AffichageTodo.effacerTacheDansTab(btnId);
    });
  }
  static effacerTacheDansTab() {
    todoArr = todoArr.filter((item) => item.id !== +id);
  }
  static modifierTache() {
    listTache.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit')) {
        document.querySelector('.entree').value =
          e.target.parentElement.parentElement.children[0].textContent;
        e.target.parentElement.parentElement.remove();
      }
    });
  }
}
