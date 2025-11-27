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
//Gợi ý của AI
function aiAdvice(pm) {
    if (pm <= 30) return "Không khí sạch – có thể ra chơi bình thường 🌿";
    if (pm <= 60) return "Hơi ô nhiễm – hạn chế chạy mạnh 🏃";
    if (pm <= 100) return "Ô nhiễm cao – học sinh nên ở trong lớp 🚪";
    return "Rất nguy hiểm – tuyệt đối không ra chơi, đóng cửa lớp ❌";
}

sensors.forEach(s => {
    console.log(s.name + ": " + aiAdvice(s.pm25));
});
//Bản đồ real-time
setInterval(() => {
    sensors.forEach(s => {
        s.pm25 = Math.floor(Math.random() * 120); // dữ liệu thay đổi
    });
    location.reload();
}, 5000);
//Hiển thị gợi ý
L.circle([s.lat, s.lon], {
    color: getColor(s.pm25),
    radius: 20
})
.addTo(map)
.bindPopup(`
    <b>${s.name}</b><br>
    PM2.5: ${s.pm25}<br>
    <span style="color:blue;">${aiAdvice(s.pm25)}</span>
`);
