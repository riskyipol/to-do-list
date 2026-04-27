// 1. Inisialisasi Elemen
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 2. Fungsi untuk Menampilkan Tugas ke Layar (DOM)
function renderTugas(text, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Hapus</button>
    `;

    // Event Klik Teks (Tandai Selesai)
    li.querySelector('span').addEventListener('click', function() {
        this.parentElement.classList.toggle('completed');
        simpanData();
    });

    // Event Klik Tombol Hapus
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        simpanData();
    });

    taskList.appendChild(li);
}

// 3. Fungsi untuk Simpan ke LocalStorage
function simpanData() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// 4. Fungsi untuk Mengambil data saat Refresh
function muatData() {
    const dataSimpanan = localStorage.getItem('myTasks');
    if (dataSimpanan) {
        const tasks = JSON.parse(dataSimpanan);
        tasks.forEach(task => {
            renderTugas(task.text, task.completed);
        });
    }
}

// 5. Jalankan Muat Data Pertama Kali
muatData();

// 6. Event Listeners
addBtn.addEventListener('click', () => {
    if (taskInput.value.trim() === "") return; // .trim() agar tidak bisa input spasi kosong
    renderTugas(taskInput.value);
    simpanData();
    taskInput.value = "";
});

taskInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") addBtn.click();
});