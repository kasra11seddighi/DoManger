let draggedElement = null;

function touchStartHandler(event) {
  draggedElement = event.currentTarget;
  draggedElement.style.position = "absolute";
  draggedElement.style.zIndex = 1000;
}

function touchMoveHandler(event) {
  if (!draggedElement) return;
  const touch = event.touches[0];
  draggedElement.style.left = touch.pageX - draggedElement.offsetWidth / 2 + "px";
  draggedElement.style.top = touch.pageY - draggedElement.offsetHeight / 2 + "px";
}

function touchEndHandler(event) {
  if (!draggedElement) return;

  // پیدا کردن ستون زیر انگشت
  const touch = event.changedTouches[0];
  const droppedColumn = document.elementFromPoint(touch.clientX, touch.clientY).closest(".status-section");

  if (droppedColumn) {
    droppedColumn.appendChild(draggedElement);
  }

  // ریست کردن استایل
  draggedElement.style.position = "static";
  draggedElement.style.zIndex = "auto";
  draggedElement = null;
}

// اضافه کردن به همه تودوها
function enableMobileDrag() {
  document.querySelectorAll(".todo").forEach(todo => {
    todo.addEventListener("touchstart", touchStartHandler);
    todo.addEventListener("touchmove", touchMoveHandler);
    todo.addEventListener("touchend", touchEndHandler);
  });
}

// هر بار تودوی جدید اضافه شد، اینو صدا بزن
function addTodo() {
  const newId = `todo-${Math.floor(Math.random() * 900) + 100}`;
  todoSection.insertAdjacentHTML("beforeend", `
    <article class="todo" draggable="true" id="${newId}">
      <p>${todoInput.value}</p>
    </article>
  `);
  enableMobileDrag(); // فعال کردن کشیدن موبایل برای تودوی جدید
  hideAddTodoModal();
}