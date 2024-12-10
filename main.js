const sortableList = document.getElementById("sortable");
let draggingElement = null;

// تنظیم event listeners برای هر آیتم
sortableList.addEventListener("dragstart", (e) => {
  draggingElement = e.target;
  draggingElement.classList.add("dragging");
});

sortableList.addEventListener("dragend", () => {
  draggingElement.classList.remove("dragging");
  draggingElement = null;
});

// تغییر موقعیت آیتم‌ها هنگام dragover
sortableList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(sortableList, e.clientY);
  const draggingElement = document.querySelector(".dragging");
  if (afterElement == null) {
    sortableList.appendChild(draggingElement);
  } else {
    sortableList.insertBefore(draggingElement, afterElement);
  }
});

// تابعی برای پیدا کردن آیتمی که در زیر موس قرار دارد
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".sortable-item:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
