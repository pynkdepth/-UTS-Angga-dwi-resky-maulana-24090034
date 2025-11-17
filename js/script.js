// File: script.js

// --- DATA DUMMY ---

const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

const products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];


// --- FUNGSI UMUM ---

function formatRupiah(number) {
    if (!document.getElementById('summaryContainer') && !document.getElementById('productTableBody')) return number;
    
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}


// --- LOGIKA HALAMAN LOGIN (index.html) ---

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const messageArea = document.getElementById('message');

    messageArea.style.display = 'none';
    messageArea.className = 'message-area';
    messageArea.innerHTML = '';

    if (emailInput === '' || passwordInput === '') {
        messageArea.classList.add('message-error');
        messageArea.innerHTML = 'Email Address dan Password (NIM) tidak boleh kosong!';
        messageArea.style.display = 'block';
        return;
    }

    messageArea.classList.add('message-success');
    messageArea.innerHTML = 'Login berhasil! Anda akan dialihkan ke Dashboard...';
    messageArea.style.display = 'block';

    setTimeout(function() {
        window.location.href = "dashboard.html"; 
    }, 2000);
});


// --- LOGIKA HALAMAN DASHBOARD (dashboard.html) ---

function renderSummaryCards() {
    const container = document.getElementById('summaryContainer');
    if (!container) return; 
    
    const cardData = [
        { title: "Total Produk", value: summary.totalProducts, icon: "fas fa-shopping-bag" },
        { title: "Total Penjualan", value: summary.totalSales, icon: "fas fa-shopping-bag" },
        { title: "Total Revenue", value: formatRupiah(summary.totalRevenue), icon: "fas fa-dollar-sign" }
    ];

    let html = '';
    cardData.forEach(card => {
        html += `
            <div class="summary-card">
                <div class="icon-box">
                    <i class="${card.icon}"></i>
                </div>
                <p class="title">${card.title}</p>
                <p class="value">${card.value}</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function setupProductButton() {
    const button = document.getElementById('viewProductsButton');
    if (button) {
        button.addEventListener('click', function() {
            window.location.href = "products.html";
        });
    }
}

// FUNGSI LOGOUT/KEMBALI YANG MENYESUAIKAN HALAMAN
function setupLogoutButton() {
    const button = document.getElementById('logoutButton');
    if (button) {
        button.addEventListener('click', function() {
            
            // Cek apakah elemen summaryContainer ada (berarti kita di Dashboard)
            const isDashboard = !!document.getElementById('summaryContainer');
            
            // Tentukan tujuan berdasarkan halaman: Dashboard -> Login, Products -> Dashboard
            const targetPage = isDashboard ? "index.html" : "dashboard.html";
            
            // Tentukan pesan konfirmasi
            const message = isDashboard ? "Apakah Anda yakin ingin Logout dan kembali ke Halaman Login?" : "Apakah Anda yakin ingin kembali ke Dashboard?";

            if (confirm(message)) {
                window.location.href = targetPage; 
            }
        });
    }
}


// --- LOGIKA HALAMAN PRODUCTS (products.html) ---

// Variabel global untuk menyimpan baris yang akan dihapus
let rowToDelete = null; 

function renderProductTable() {
    const tableBody = document.getElementById('productTableBody');
    if (!tableBody) return;

    let rowsHtml = '';
    products.forEach((product, index) => {
        rowsHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${formatRupiah(product.price)}</td>
                <td>${product.stock}</td>
                <td class="action-buttons">
                    <button class="edit-button" onclick="editProduct('${product.name}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-button" onclick="deleteProduct(this)">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHtml;
}

function editProduct(productName) {
    alert('Edit produk: ' + productName + ' (Simulasi)');
}

// 🟢 FUNGSI DELETE BARU: Menampilkan Modal Konfirmasi Kustom
function deleteProduct(buttonElement) {
    const modal = document.getElementById('customConfirmModal');
    
    // Simpan referensi baris (<tr>) yang akan dihapus
    rowToDelete = buttonElement.closest('tr'); 
    
    // Tampilkan modal di tengah layar
    modal.style.display = 'flex'; // INI YANG MEMICU NOTIFIKASI MUNCUL
}

// 🟢 FUNGSI BARU: Mengatur Event Listener untuk tombol modal
function setupModalListeners() {
    const modal = document.getElementById('customConfirmModal');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');

    if (!modal) return;

    // Aksi YA (Hapus)
    confirmYes.addEventListener('click', () => {
        if (rowToDelete) {
            rowToDelete.remove(); // Hapus baris dari DOM
            console.log('Produk berhasil dihapus.');
        }
        rowToDelete = null; // Reset
        modal.style.display = 'none'; // Sembunyikan modal
    });

    // Aksi BATAL
    confirmNo.addEventListener('click', () => {
        rowToDelete = null; // Reset
        modal.style.display = 'none'; // Sembunyikan modal
    });
}


// --- INISIALISASI ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi logika dashboard
    if (document.getElementById('summaryContainer')) {
        renderSummaryCards();
        setupProductButton();
        setupLogoutButton(); 
    }
    
    // Inisialisasi logika produk
    if (document.getElementById('productTableBody')) {
        renderProductTable();
        setupModalListeners(); // HARUS ADA UNTUK MODAL
        setupLogoutButton(); 
    }
});