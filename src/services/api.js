const API_BASE_URL = "http://localhost:5000/api" // Ensure this matches your backend port

// Helper to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Something went wrong")
  }
  return response.json()
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
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  return handleResponse(response)
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

export const updateUserAlerts = async (alertThresholds) => {
  const response = await fetch(`${API_BASE_URL}/users/alerts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ alertThresholds }),
  })
  return handleResponse(response)
}
