const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector(".modal-screen");
const createTodoBtn = document.querySelector(".continue");
const modalCloseBtn = document.querySelector(".close");
const todoInput = document.querySelector(".todo-input");
const todoSection = document.querySelector(".status-section.default");
const doingSection = document.querySelector(".status-section.in-progress");
const completeSection = document.querySelector(".status-section.complete");
const trashSection = document.querySelector(".status-section.trash");
const closeXBtn = document.querySelector(".close-x-btn");

let draggedElement = null;

function showAddTodoModal() {
  modal.classList.remove("hidden");
}

function hideAddTodoModal() {
  modal.classList.add("hidden");
}

function addTodo() {
  const newId = `todo-${Math.floor(Math.random() * 900) + 100}`;
  todoSection.insertAdjacentHTML("beforeend", `
    <article class="todo" id="${newId}">
      <p>${todoInput.value}</p>
    </article>
  `);
  const newTodo = document.getElementById(newId);
  newTodo.addEventListener("touchstart", touchStartHandler);
  newTodo.addEventListener("touchmove", touchMoveHandler);
  newTodo.addEventListener("touchend", touchEndHandler);
  hideAddTodoModal();
}

// Touch event handlers
function touchStartHandler(event) {
  draggedElement = event.target;
  draggedElement.style.opacity = "0.5";
}

function touchMoveHandler(event) {
  event.preventDefault();
  const touch = event.touches[0];
  draggedElement.style.position = "absolute";
  draggedElement.style.left = touch.clientX - draggedElement.offsetWidth / 2 + "px";
  draggedElement.style.top = touch.clientY - draggedElement.offsetHeight / 2 + "px";
}

function touchEndHandler(event) {
  draggedElement.style.opacity = "1";
  draggedElement.style.position = "static";

  const sections = [todoSection, doingSection, completeSection, trashSection];
  const touch = event.changedTouches[0];
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (
      touch.clientX > rect.left &&
      touch.clientX < rect.right &&
      touch.clientY > rect.top &&
      touch.clientY < rect.bottom
    ) {
      section.appendChild(draggedElement);
    }
  });

  draggedElement = null;
}

openModalBtn.addEventListener("click", showAddTodoModal);
createTodoBtn.addEventListener("click", addTodo);
modalCloseBtn.addEventListener("click", hideAddTodoModal);
closeXBtn.addEventListener("click", hideAddTodoModal);

// اضافه کردن touch events برای تودوهای موجود
document.querySelectorAll(".todo").forEach(todo => {
  todo.addEventListener("touchstart", touchStartHandler);
  todo.addEventListener("touchmove", touchMoveHandler);
  todo.addEventListener("touchend", touchEndHandler);
});
