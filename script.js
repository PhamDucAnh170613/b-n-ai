// Tọa độ trường học (bạn có thể đổi)
let school = [21.0285, 105.8542]; // Hà Nội

// Dữ liệu đo PM2.5 (giả lập)
let sensors = [
    { name: "Cổng trường", lat: 21.0287, lon: 105.8545, pm25: 60 },
    { name: "Sân chơi", lat: 21.0283, lon: 105.8540, pm25: 25 },
    { name: "Khu lớp học", lat: 21.0286, lon: 105.8547, pm25: 80 }
];

// Tạo bản đồ
let map = L.map('map').setView(school, 17);

// Thêm nền bản đồ
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Hàm đổi màu theo mức PM2.5
function getColor(pm) {
    if (pm <= 25) return "green";
    if (pm <= 50) return "yellow";
    if (pm <= 100) return "orange";
    return "red";
}

// Hiển thị từng điểm
sensors.forEach(s => {
    L.circle([s.lat, s.lon], {
        color: getColor(s.pm25),
        radius: 20
    }).addTo(map)
      .bindPopup(`${s.name}<br>PM2.5: ${s.pm25}`);
});
