const API_URL = "http://localhost:8000/events"; 

// Create a new event DUVAN VIVAS
async function createEvent() {
    const title = document.getElementById("event-name").value;
    const date = document.getElementById("event-date").value;
    const pla = document.getElementById("place").value;

    if (!title || !date || !place) {
        prompt("Please fill in all fields.");
        return;
    }
    try {
        const response = await fetch(API_URL + "/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, date, place})
        });

        const data = await response.json();
        if (response.ok) {
            prompt("Event created successfully!");
            getEvents();
        } else {
            prompt("Error: " + data.detail);
        }
    } catch (error) {
        console.error("Error creating event:", error);
        prompt("An error occurred while creating the event.");
    }
}

async function getEvents() {
    try {
        const response = await fetch(API_URL + "/");
        const events = await response.json();
        const eventsList = document.getElementById("events-list");
        eventsList.innerHTML = ""; 
        events.forEach(event => {
            const eventItem = document.createElement("div");
            eventItem.classList.add("event-item");
            eventItem.innerHTML = `
                <strong>${event.title}</strong><br>
                <p>${event.date} - ${event.place}</p><br>
                <button onclick="updateEvent('${event._id}')">Edit</button>
                <button onclick="deleteEvent('${event._id}')">Delete</button>
            `;
            eventsList.appendChild(eventItem);
        });

    } catch (error) {
        console.error("Error loading events:", error);
    }
}



function logout() {
    prompt("Logged out!");
}

async function deleteEvent(eventId) {
    try {
        const response = await fetch(`${API_URL}/${eventId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (response.ok) {
            prompt("Event deleted successfully.");
            getEvents();
        } else {
            prompt("Error deleting event: " + result.detail);
        }
    } catch (error) {
        console.error("Delete failed:", error);
    }
}


async function updateEvent(eventId) {
    const title = prompt("Enter new event name:");
    const date = prompt("Enter new event date:");
    const place = prompt("Enter new event place:");
   

    if (!title || !date || !place) {
        prompt("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, date, place})
        });

        const result = await response.json();

        if (response.ok) {
            prompt("Event updated successfully!");
            getEvents();
        } else {
            prompt("Error updating event: " + result.detail);
        }
    } catch (error) {
        console.error("Error updating event:", error);
        prompt("An error occurred while updating the event.");
    }
}
