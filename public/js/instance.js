const baseUrl = "http://localhost:5000/api/v1/";

function apiRequest(endpoint, method = "GET", data = null) {
  return $.ajax({
    url: baseUrl + endpoint,
    method: method,
    contentType: "application/json",
    data: data ? JSON.stringify(data) : null,
    dataType: "json",
  });
}

function showToast(message, type = "info") {
  const iconMap = {
    success: "check-circle",
    error: "x-circle",
    info: "info"
  };

  const wrapper = document.createElement("div");
  wrapper.classList.add("toast-content");

  // Left: icon + message
  const left = document.createElement("div");
  left.classList.add("toast-left");

  const iconWrapper = document.createElement("i");
  iconWrapper.setAttribute("data-lucide", iconMap[type] || iconMap.info);

  const textNode = document.createElement("span");
  textNode.textContent = message;

  left.appendChild(iconWrapper);
  left.appendChild(textNode);

  // Right: close button
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("data-lucide", "x");
  closeBtn.classList.add("toast-close-btn");

  wrapper.appendChild(left);
  wrapper.appendChild(closeBtn);

  const toast = Toastify({
    node: wrapper,
    duration: 5000,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    offset: { x: 0, y: 16 },
    className: type // success | error | info
  });

  toast.showToast();

  // Render Lucide icons
  setTimeout(() => {
    lucide.createIcons({
      attrs: {
        width: "20",
        height: "20",
        "stroke-width": "2.2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
    });
  }, 0);

  closeBtn.addEventListener("click", () => toast.hideToast());
}
