// --- Fungsi Waktu & Lokasi ---
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  // Kamu bisa mengganti 'Bogor, Indonesia' secara manual atau dinamis
  const location = "Bogor, Indonesia";
  const formattedDate = now.toLocaleDateString("id-ID", options);

  document.getElementById("date-time").textContent = `${location} | ${formattedDate}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// --- Fungsi Dark Mode ---
const toggleBtn = document.getElementById("dark-mode-toggle");
const body = document.body;
const icon = toggleBtn.querySelector(".mode-icon");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Ganti ikon saat klik
  if (body.classList.contains("dark-mode")) {
    icon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    icon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// Cek preferensi user saat reload
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  icon.textContent = "☀️";
}
