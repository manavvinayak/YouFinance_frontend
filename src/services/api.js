const API_BASE_URL = "https://you-finance-backend.vercel.app/api" // Ensure this matches your backend port

// Helper to handle fetch responses
const handleResponse = async (response) => {
  // First check if response is valid
  if (!response) {
    throw new Error("No response received from server")
  }
  
  let data
  try {
    // Try to parse JSON
    data = await response.json()
  } catch (e) {
    console.error("Failed to parse JSON response:", e)
    throw new Error(`Invalid response format: ${e.message}`)
  }
  
  if (!response.ok) {
    // Better error handling
    const errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`
    console.error('API Error:', errorMessage, data)
    throw new Error(errorMessage)
  }
  
  return data
}

// Auth API Calls
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  })
  return handleResponse(response)
}

export const loginUser = async (email, password) => {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId) // Clear the timeout
    
    // Process the response
    const data = await handleResponse(response)
    
    // Validate the response contains a user object
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format')
    }
    
    // Normalize response structure
    if (!data.user && !data._id) {
      throw new Error('Invalid credentials')
    }
    
    return data
  } catch (error) {
    // Handle different error types
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your internet connection.')
    }
    throw error
  }
}

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return handleResponse(response)
}

export const checkAuthStatus = async () => {
  // This endpoint would typically return user info if authenticated, or an error if not.
  // For simplicity, we'll just try to fetch profile, which is protected.
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    if (response.ok) {
      const user = await response.json()
      return { user }
    } else {
      return { user: null }
    }
  } catch (error) {
    console.error("Error checking auth status:", error)
    return { user: null }
  }
}

// Accounts API Calls
export const getAccounts = async () => {
  const response = await fetch(`${API_BASE_URL}/accounts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return handleResponse(response)
}

export const createAccount = async (accountData) => {
  const response = await fetch(`${API_BASE_URL}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(accountData),
  })
  return handleResponse(response)
}

export const updateAccount = async (id, accountData) => {
  const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(accountData),
  })
  return handleResponse(response)
}

export const deleteAccount = async (id) => {
  const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return handleResponse(response)
}

// Transactions API Calls
export const getTransactions = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString()
  const response = await fetch(`${API_BASE_URL}/transactions?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return handleResponse(response)
}

export const createTransaction = async (transactionData) => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(transactionData),
  })
  return handleResponse(response)
}

export const updateTransaction = async (id, transactionData) => {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(transactionData),
  })
  return handleResponse(response)
}

export const deleteTransaction = async (id) => {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return handleResponse(response)
}

// User Profile API Calls
export const getUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  return handleResponse(response)
}

export const updateUserProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profileData),
  })
  return handleResponse(response)
}

export const updateUserBudgets = async (budgets) => {
  const response = await fetch(`${API_BASE_URL}/users/budgets`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ budgets }),
  })
  return handleResponse(response)
}

// export const updateUserAlerts = async (alertThresholds) => {
//   const response = await fetch(`${API_BASE_URL}/users/alerts`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ alertThresholds }),
//   })
//   return handleResponse(response)
// }

export const updateUserAlerts = async (alertThresholds) => {
  const response = await fetch(`${API_BASE_URL}/users/alerts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Add this line
    body: JSON.stringify({ alertThresholds }),
  })
  return handleResponse(response)
}
