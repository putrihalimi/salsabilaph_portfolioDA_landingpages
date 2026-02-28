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

const searchInput = document.getElementById('project-search');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // 1. Logika Filter Tampilan Proyek
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const tech = card.querySelector('.tech').innerText.toLowerCase();
        
        if (title.includes(searchTerm) || tech.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });

    // 2. Update URL untuk GA4 (Parameter q)
    // Ini yang akan ditangkap oleh "Penelusuran Situs" di gambar Anda
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + encodeURIComponent(searchTerm);
    window.history.replaceState({path:newurl}, '', newurl);
});
