// User credentials for authentication
const users = [
    { username: 'admin', password: 'amandacute50' },
    { username: 'manager', password: 'cuteamanda05' }
];

// Bus information (3 buses with 30 seats each)
const buses = {
    "Cubao": Array(30).fill("AVAILABLE"),
    "Baguio": Array(30).fill("AVAILABLE"),
    "Pasay": Array(30).fill("AVAILABLE"),
    "Manila": Array(30).fill("NOT AVAILABLE"),
    "Nueva Ecija": Array(30).fill("NOT AVAILABLE")
};

// Global variable to store the logged-in user
let currentUser = null;

// Function to authenticate the user
function loginUser(username, password) {
    for (let user of users) {
        if (user.username === username && user.password === password) {
            currentUser = user;
            console.log("Login successful!");
            return true;
        }
    }
    console.log("Incorrect username or password.");
    return false;
}

// Function to view the available seats on a bus
function showBusSeats(busName) {
    console.log(`Viewing bus: ${busName}`);
    buses[busName].forEach((seat, index) => {
        console.log(`Seat ${index + 1}: ${seat}`);
    });
    let action = prompt("Enter 'C' to cancel or any other key to go back: ");
    if (action.toUpperCase() === 'C') {
        return;
    }
}

// Function to add a reservation to a bus
function reserveSeat(busName) {
    const availableSeats = buses[busName].map((seat, index) => seat === "AVAILABLE" ? index + 1 : null).filter(x => x);
    if (availableSeats.length > 0) {
        console.log("Available seats: " + availableSeats.join(", "));
        let seatNumber = parseInt(prompt("Select a seat number: "));
        if (buses[busName][seatNumber - 1] === "AVAILABLE") {
            let customerName = prompt("Enter the customer's name: ");
            buses[busName][seatNumber - 1] = customerName;
            console.log(`Reservation successful for ${customerName} on seat ${seatNumber}.`);
        } else {
            console.log("The seat is already taken!");
        }
    } else {
        console.log("The bus is fully booked.");
    }
}

// Function to remove a reservation from a bus
function cancelReservation(busName) {
    const bookedSeats = buses[busName].map((seat, index) => seat !== "AVAILABLE" ? { seat: index + 1, customer: seat } : null).filter(x => x);
    if (bookedSeats.length > 0) {
        console.log("Booked seats: ");
        bookedSeats.forEach(seat => console.log(`Seat ${seat.seat}: ${seat.customer}`));
        let seatNumber = parseInt(prompt("Select a seat number to cancel: "));
        if (buses[busName][seatNumber - 1] !== "AVAILABLE") {
            let customerName = prompt("Enter the customer's name: ");
            if (buses[busName][seatNumber - 1] === customerName) {
                buses[busName][seatNumber - 1] = "AVAILABLE";
                console.log(`Reservation canceled for ${customerName} on seat ${seatNumber}.`);
            } else {
                console.log("The customer name doesn't match the reservation.");
            }
        } else {
            console.log("The seat is not booked.");
        }
    } else {
        console.log("There are no booked seats to cancel.");
    }
}

// Function to sort and display the bus passengers alphabetically
function sortPassengers(busName) {
    let passengers = buses[busName].map((seat, index) => seat !== "AVAILABLE" ? { seat: index + 1, customer: seat } : null).filter(x => x);
    
    // Bubble sort to sort passengers alphabetically by name
    for (let i = 0; i < passengers.length; i++) {
        for (let j = 0; j < passengers.length - i - 1; j++) {
            if (passengers[j].customer > passengers[j + 1].customer) {
                [passengers[j], passengers[j + 1]] = [passengers[j + 1], passengers[j]];
            }
        }
    }

    console.log("Sorted Passengers: ");
    passengers.forEach(p => console.log(`Seat ${p.seat}: ${p.customer}`));
}

// Menu for ticket personnel actions
function ticketPersonnelMenu() {
    while (true) {
        let action = prompt("Choose an action: 1. VIEW 2. MANAGE 3. LOGOUT");
        
        if (action === "1") {
            let busName = prompt("Enter bus name (Cubao, Baguio, Pasay): ");
            showBusSeats(busName);
        } else if (action === "2") {
            let busName = prompt("Enter bus name to manage (Cubao, Baguio, Pasay): ");
            let manageAction = prompt("Choose an action: 1. ADD Reservation 2. REMOVE Reservation");
            if (manageAction === "1") {
                reserveSeat(busName);
            } else if (manageAction === "2") {
                cancelReservation(busName);
            }
        } else if (action === "3") {
            currentUser = null;
            console.log("Logged out.");
            break;
        } else {
            console.log("Invalid option.");
        }
    }
}

// Menu for customer actions
function customerMenu() {
    while (true) {
        let action = prompt("Choose an action: 1. RESERVE 2. CANCEL Reservation 3. EXIT");
        
        if (action === "1") {
            let busName = prompt("Choose a bus to reserve (Cubao, Baguio, Pasay): ");
            showBusSeats(busName); // View available seats
            let seatNum = parseInt(prompt("Enter seat number to reserve: "));
            let customerName = prompt("Enter your name: ");
            if (buses[busName][seatNum - 1] === "AVAILABLE") {
                buses[busName][seatNum - 1] = customerName;
                console.log(`Reservation successful for ${customerName} on seat ${seatNum}.`);
            } else {
                console.log("Seat is already taken.");
            }
        } else if (action === "2") {
            let busName = prompt("Enter the bus name where you reserved: ");
            let customerName = prompt("Enter your name: ");
            if (buses[busName].includes(customerName)) {
                let seatNum = buses[busName].indexOf(customerName) + 1;
                let confirm = prompt(`Are you sure you want to cancel reservation for ${customerName} on seat ${seatNum}? (Y/N)`);
                if (confirm.toUpperCase() === "Y") {
                    buses[busName][seatNum - 1] = "AVAILABLE";
                    console.log(`Reservation canceled for ${customerName}.`);
                }
            } else {
                console.log("No reservation found for this customer.");
            }
        } else if (action === "3") {
            break;
        } else {
            console.log("Invalid option.");
        }
    }
}

// Function to start the program and choose user type
function startSystem() {
    let userType = prompt("Are you a 1. TICKET PERSON or 2. CUSTOMER?");
    
    if (userType === "1") {
        let username = prompt("Enter username: ");
        let password = prompt("Enter password: ");
        if (loginUser(username, password)) {
            ticketPersonnelMenu();
        }
    } else if (userType === "2") {
        customerMenu();
    } else {
        console.log("Invalid user type.");
    }
}

startSystem();
