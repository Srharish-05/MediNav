document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("user-form");
  const driverForm = document.getElementById("driver-form");
  const loginForm = document.getElementById("login-form");
  const forgotForm = document.getElementById("forgot-form");

  // 🧍‍♂️ User Registration
  if (userForm) {
    userForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.getElementById("user-name")?.value;
      const email = document.getElementById("user-email")?.value;
      const phone = document.getElementById("user-phone")?.value;
      const password = document.getElementById("user-password")?.value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, password, role: "user" }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("User registered successfully");
          window.location.href = "login.html";
        } else {
          alert(`Registration failed: ${data.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("Server error during registration");
        console.error(error);
      }
    });
  }

  // 🚑 Driver Registration
  if (driverForm) {
    driverForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.getElementById("driver-name")?.value;
      const email = document.getElementById("driver-email")?.value;
      const phone = document.getElementById("driver-phone")?.value;
      const vehicleNumber = document.getElementById("vehicle-number")?.value;
      const password = document.getElementById("driver-password")?.value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/driver/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, vehicleNumber, password }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Driver registered successfully");
          window.location.href = "login.html";
        } else {
          alert(`Registration failed: ${data.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("Server error during registration");
        console.error(error);
      }
    });
  }

  // 🔐 Login
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("login-email")?.value;
      const password = document.getElementById("login-password")?.value;
      const role = email.includes("driver") ? "driver" : "user";

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Login successful");
          window.location.href = role === "driver" ? "driver_dashboard.html" : "user_dashboard.html";
        } else {
          alert(`Login failed: ${data.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("Server error during login");
        console.error(error);
      }
    });
  }

  // 🔑 Forgot Password
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Reset link sent to your email");
    });
  }

  // 📍 User: Request Ambulance
  const requestBtn = document.getElementById("request-ambulance");
  const userLocationDiv = document.getElementById("user-location-display");

  if (requestBtn && navigator.geolocation) {
    requestBtn.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        userLocationDiv.innerText = `Your Location: Lat ${latitude.toFixed(5)}, Lon ${longitude.toFixed(5)}`;

        const userEmail = prompt("Enter your email to confirm identity:");
        if (userEmail) {
          try {
            const res = await fetch("http://localhost:5000/api/request/ambulance", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: userEmail, lat: latitude, lon: longitude }),
            });

            const data = await res.json();
            if (res.ok) {
              alert("Request sent successfully!");
            } else {
              alert(`Failed to send request: ${data.error}`);
            }
          } catch (err) {
            alert("Server error while sending request.");
            console.error(err);
          }
        }
      });
    });
  }

  // 🚑 Driver: Accept/Reject Request
  const acceptBtn = document.getElementById("accept-request");
  const rejectBtn = document.getElementById("reject-request");
  const driverLocationDiv = document.getElementById("driver-location-display");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      alert("Request Accepted");
      simulateDriverTracking();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      alert("Request Rejected");
    });
  }

  function simulateDriverTracking() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        driverLocationDiv.innerText = `Ambulance GPS: Lat ${latitude.toFixed(5)}, Lon ${longitude.toFixed(5)}`;

        const email = prompt("Enter your email to send location to server:");
        if (email) {
          await fetch("http://localhost:5000/api/location/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, lat: latitude, lon: longitude }),
          });
        }
      });
    } else {
      driverLocationDiv.innerText = "Geolocation not supported";
    }
  }
});
