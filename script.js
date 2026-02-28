// Tambahkan di baris paling atas script
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === 'true') {
    localStorage.setItem('is_owner', 'true');
    console.log("Mode Admin Aktif: Aktivitas Anda tidak akan dilacak.");
}

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

// Copy dan paste kode ini di bagian paling bawah script Anda
const downloadBtn = document.getElementById('download-cv');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        // Logika agar klik Anda (owner) tidak terhitung jika ada parameter ?admin=true
        if (localStorage.getItem('is_owner') !== 'true') {
            gtag('event', 'generate_lead', {
                'event_category': 'Engagement',
                'event_label': 'Download CV PDF',
                'file_name': 'File_CV_Salsabila.pdf',
                'value': 1.0 
            });
            console.log('Insight: Seseorang baru saja mendownload CV Anda!');
        }
    });
}

function loadVisits() {
  const visitsDisplay = document.getElementById('visits');
  
  // Gunakan namespace unik, misal: salsabila_ph_portfolio_2026
  fetch('https://api.countapi.xyz/hit/salsabila_ph_portfolio_2026/visits')
    .then(res => res.json())
    .then(data => {
      visitsDisplay.innerText = data.value;
    })
    .catch(err => {
      console.log("API Error, showing fallback");
      visitsDisplay.innerText = "128"; // Angka manual jika server sibuk
    });
}

// Jalankan fungsi
loadVisits();

function loadVisits() {
  const visitsDisplay = document.getElementById('visits');
  
  // Menggunakan CounterAPI yang lebih stabil
  fetch('https://api.counterapi.dev/v1/salsabila-ph-2026/visits/up')
    .then(res => res.json())
    .then(data => {
      // API ini mengembalikan properti 'count'
      visitsDisplay.innerText = data.count || "0";
    })
    .catch(err => {
      console.log("API Error, fallback aktif");
      visitsDisplay.innerText = "17"; // Angka dari GA4 Anda
    });
}
loadVisits();
