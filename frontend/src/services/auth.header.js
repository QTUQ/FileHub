export default function authHeader() {
    // get the current user stored in the localstorge and parse it as JSON -> to access the user object easily in javascript.
    const user = JSON.parse(localStorage.getItem("user"));

    // check if the user exists -> use that token in the authenticated request to the server
    // if there is no user, then return an empty object and the server should reject the request

    if (user & user.token) {
        return {"x-access-token": user.token};
    } else {
        return {};
    }
}