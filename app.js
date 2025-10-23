const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector(".modal-screen");
const createTodoBtn = document.querySelector(".continue");
const modalCloseBtn = document.querySelector(".close");
const todoInput = document.querySelector(".todo-input");
const todoSection = document.querySelector(".status-section.default");
const doingSection = document.querySelector(".status-section.in-progress");
const completeSection = document.querySelector(".status-section.complete");
const spanSection = document.querySelector(".status-section.trash");
const closeXBtn =document.querySelector(".close-x-btn")
function showAddTodoModal() {
  modal.classList.remove("hidden")
}

function hideAddTodoModal() {
  modal.classList.add("hidden")
}

function addTodo() {
  todoSection.insertAdjacentHTML("beforeend", `
    <article class="todo" draggable="true" ondragstart="dragStartHandler(event)" id="todo-${Math.floor(Math.random() * 900) + 100}">
      <p>${todoInput.value}</p>
    </article>
  `);
  hideAddTodoModal()
}
function dragStartHandler(event) {
  event.dataTransfer.setData("elementId", event.target.id);
}

function dragOverHandler(event) {
  event.preventDefault(); // باید باشه تا drop کار کنه
}

function dropHandler(event) {
  event.preventDefault();
  const elementId = event.dataTransfer.getData("elementId");
  const targetElement = document.getElementById(elementId);
  event.target.closest(".status-section").append(targetElement);
}


openModalBtn.addEventListener("click", showAddTodoModal);
createTodoBtn.addEventListener("click", addTodo);
modalCloseBtn.addEventListener("click", hideAddTodoModal);
closeXBtn.addEventListener("click", hideAddTodoModal);

todoSection.addEventListener("dragover", dragOverHandler);
doingSection.addEventListener("dragover", dragOverHandler);
completeSection.addEventListener("dragover", dragOverHandler);
spanSection.addEventListener("dragover", dragOverHandler);

todoSection.addEventListener("drop", dropHandler);
doingSection.addEventListener("drop", dropHandler);
completeSection.addEventListener("drop", dropHandler);
spanSection.addEventListener("drop", dropHandler);
