// src/lib/apiClient.ts

const BASE_URL = "http://localhost:5000/api";

export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  // 1. Safely get the token (ensuring we are in the browser)
  let token = null;
  
  if (typeof window !== "undefined") {
    token = localStorage.getItem("velocix_token");
  }

  // 2. Set up default headers
  const headers = new Headers(options.headers);
  
  // Set default content type if not uploading a file
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // 3. Attach the Auth Token
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 4. Make the network request
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 5. Global Error Handling (e.g., Token expired)
  if (response.status === 401) {
    console.error("Unauthorized! Token is missing or expired.");
    
    if (typeof window !== "undefined") {
      // Automatically log the user out if the token dies
      localStorage.removeItem("velocix_token"); 
      // document.cookie = "velocix_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      window.location.href = "/login"; // Redirect to login
    }
  }

  return response;
}