import axios from "axios"; // http client
const API_URL = "http://localhost:40000/api"; //the API endpoint to communicate with the server

// handles the signup http request to add a new user to the database
const signup = ({firstName, lastName, username, email, password}) => {
    return axios.post(`${API_URL}/signup/`, {
        firstName,
        lastName,
        username,
        email,
        password,
    });
};

// Handles the verify email request.
const verify = (confirmationToken) => {
    return axios.get(`${API_URL}/verify/${confirmationToken}`);
  };

// handles the login http request to access  user profile
// tha data needed for each user is the username or email along with the password
const login = ({emailOrUsername, password}) => {
    return axios
    .post(`${API_URL}/login/`, {emailOrUsername, password})
    // if successfuly logged in, store the user data, including the token, in the localstorge
    .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
    })
};

// hamdles the logout
const logout = () => {
    localStorage.removeItem("user");
};

// get the user from the localstorge
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;