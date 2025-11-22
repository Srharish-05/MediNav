// MediNav Core Logic (Simulation - No Backend Required)

const MediNav = {
    // --- Data Management (LocalStorage Simulation) ---

    _getUsers: () => JSON.parse(localStorage.getItem('medinav_users')) || [],
    _saveUser: (user) => {
        const users = MediNav._getUsers();
        users.push(user);
        localStorage.setItem('medinav_users', JSON.stringify(users));
    },

    _getDrivers: () => JSON.parse(localStorage.getItem('medinav_drivers')) || [],
    _saveDriver: (driver) => {
        const drivers = MediNav._getDrivers();
        drivers.push(driver);
        localStorage.setItem('medinav_drivers', JSON.stringify(drivers));
    },

    _getRequests: () => JSON.parse(localStorage.getItem('medinav_requests')) || [],
    _saveRequest: (request) => {
        const requests = MediNav._getRequests();
        requests.push(request);
        localStorage.setItem('medinav_requests', JSON.stringify(requests));
    },
    _updateRequest: (id, status, driverId) => {
        const requests = MediNav._getRequests();
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
            requests[index].status = status;
            if (driverId) requests[index].driverId = driverId;
            localStorage.setItem('medinav_requests', JSON.stringify(requests));
        }
    },

    // --- Auth & Session ---

    getCurrentUser: () => JSON.parse(sessionStorage.getItem('medinav_current_user')),
    setCurrentUser: (user) => sessionStorage.setItem('medinav_current_user', JSON.stringify(user)),
    logout: () => {
        sessionStorage.removeItem('medinav_current_user');
        window.location.href = 'index.html';
    },

    // --- Async Methods (Mimicking Backend API) ---

    registerUser: async (name, email, phone, password) => {
        await new Promise(r => setTimeout(r, 500)); // Simulate network delay
        const users = MediNav._getUsers();
        if (users.find(u => u.email === email)) {
            alert('Email already registered!');
            return false;
        }
        const newUser = { id: Date.now(), name, email, phone, password, role: 'user' };
        MediNav._saveUser(newUser);
        MediNav.setCurrentUser(newUser);
        return true;
    },

    registerDriver: async (name, email, phone, password, vehicleNumber) => {
        await new Promise(r => setTimeout(r, 500));
        const drivers = MediNav._getDrivers();
        if (drivers.find(d => d.email === email)) {
            alert('Email already registered!');
            return false;
        }
        const newDriver = {
            id: Date.now(),
            name,
            email,
            phone,
            password,
            vehicleNumber,
            role: 'driver',
            lat: 12.9716 + (Math.random() * 0.01), // Random start pos
            lng: 77.5946 + (Math.random() * 0.01)
        };
        MediNav._saveDriver(newDriver);
        MediNav.setCurrentUser(newDriver);
        return true;
    },

    loginUser: async (email, password) => {
        await new Promise(r => setTimeout(r, 500));
        const users = MediNav._getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            MediNav.setCurrentUser(user);
            return true;
        }
        return false;
    },

    loginDriver: async (email, password) => {
        await new Promise(r => setTimeout(r, 500));
        const drivers = MediNav._getDrivers();
        const driver = drivers.find(d => d.email === email && d.password === password);
        if (driver) {
            MediNav.setCurrentUser(driver);
            return true;
        }
        return false;
    },

    requestAmbulance: async (userId, lat, lng) => {
        await new Promise(r => setTimeout(r, 500));
        const request = {
            id: Date.now(),
            userId,
            userLat: lat,
            userLng: lng,
            status: 'Pending', // Pending, Accepted, Arriving
            driverId: null,
            timestamp: new Date().toISOString()
        };
        MediNav._saveRequest(request);
        return request;
    },

    getRequests: async () => {
        await new Promise(r => setTimeout(r, 300));
        return MediNav._getRequests();
    },

    updateRequest: async (id, status, driverId = null) => {
        await new Promise(r => setTimeout(r, 300));
        MediNav._updateRequest(id, status, driverId);
    },

    getUsers: async () => {
        await new Promise(r => setTimeout(r, 300));
        return MediNav._getUsers();
    },

    getDrivers: async () => {
        await new Promise(r => setTimeout(r, 300));
        return MediNav._getDrivers();
    },

    // --- Map Utils ---

    initMap: (elementId, lat, lng) => {
        if (!window.L) return null;
        const container = L.DomUtil.get(elementId);
        if (container != null) {
            container._leaflet_id = null;
        }
        const map = L.map(elementId).setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        return map;
    }
};

// Initialize Dummy Data if empty
if (MediNav._getDrivers().length === 0) {
    MediNav._saveDriver({
        id: 101,
        name: "John Doe (Driver)",
        email: "driver@demo.com",
        phone: "1234567890",
        password: "123",
        vehicleNumber: "KA-01-AB-1234",
        role: 'driver',
        lat: 12.9716,
        lng: 77.5946
    });
}
if (MediNav._getUsers().length === 0) {
    MediNav._saveUser({
        id: 201,
        name: "Jane Smith (User)",
        email: "user@demo.com",
        phone: "0987654321",
        password: "123",
        role: 'user'
    });
}
