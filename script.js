const users = [
  {
    name: "aditya",
    pic: "https://images.unsplash.com/photo-1755324132725-ac63b25d7a46?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3Nnx8fGVufDB8fHx8fA%3D%3D",
    bio: "silent chaos in the loud world",
  },
  {
    name: "maya",
    pic: "https://images.unsplash.com/photo-1755463765678-f76f672fd84d?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4NXx8fGVufDB8fHx8fA%3D%3D",
    bio: "dreaming in colors the world forgot",
  },
  {
    name: "kiran",
    pic: "https://images.unsplash.com/photo-1754951433192-cf5d42c3d3c9?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzl8fHxlbnwwfHx8fHw%3D",
    bio: "finding poetry in parking lots",
  },
  {
    name: "zara",
    pic: "https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDN8fHxlbnwwfHx8fHw%3D",
    bio: "midnight thoughts at 3pm",
  },
  {
    name: "dev",
    pic: "https://images.unsplash.com/photo-1754731665074-1e500aa03710?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDB8fHxlbnwwfHx8fHw%3D",
    bio: "collecting moments like vintage postcards",
  },
  {
    name: "luna",
    pic: "https://images.unsplash.com/photo-1753549839629-2eb4f552e0e6?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDd8fHxlbnwwfHx8fHw%3D",
    bio: "dancing with shadows on empty streets",
  },
  {
    name: "avi",
    pic: "https://images.unsplash.com/photo-1732492211688-b1984227af93?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOTN8fHxlbnwwfHx8fHw%3D",
    bio: "whispering secrets to city lights",
  },
];

// Cache DOM elements for better performance
const cardsContainer = document.querySelector(".cards");
const searchInput = document.querySelector(".inp");

// Create a single user card element
function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "card";
  
  // Use template literal for better performance and readability
  card.innerHTML = `
    <img src="${user.pic}" class="bg-img" alt="${user.name}">
    <div class="blurred-layer" style="background-image: url(${user.pic})"></div>
    <div class="content">
      <h3>${user.name}</h3>
      <p>${user.bio}</p>
    </div>
  `;
  
  return card;
}

// Optimized showUsers function
function showUsers(userArray) {
  // Clear existing content
  cardsContainer.innerHTML = "";
  
  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();
  
  userArray.forEach(user => {
    fragment.appendChild(createUserCard(user));
  });
  
  // Single DOM append operation
  cardsContainer.appendChild(fragment);
}

// Debounce function to limit search frequency
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Create "No users found" message
function createNoUsersMessage() {
  const messageDiv = document.createElement("div");
  messageDiv.className = "no-users-message";
  messageDiv.innerHTML = `
    <div style="text-align: center; padding: 40px; color: #666;">
      <h3>No users found</h3>
      <p>Try searching with a different name</p>
    </div>
  `;
  return messageDiv;
}

// Optimized search function
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  // If empty search, show all users
  if (!searchTerm) {
    showUsers(users);
    return;
  }
  
  // Filter users (case-insensitive search)
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().startsWith(searchTerm)
  );
  
  // Check if any users were found
  if (filteredUsers.length === 0) {
    // Clear existing content and show "no users found" message
    cardsContainer.innerHTML = "";
    cardsContainer.appendChild(createNoUsersMessage());
  } else {
    showUsers(filteredUsers);
  }
}

// Initialize the page
showUsers(users);

// Add debounced event listener for better performance
searchInput.addEventListener("input", debounce(handleSearch, 300));