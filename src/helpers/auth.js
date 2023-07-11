export const AuthAdministrator = (jwt_decode) => {
    let token = localStorage.getItem("token");

    if (!token) window.location.replace("/login");

    var decodedToken = jwt_decode(token);

    if (!decodedToken || isTokenExpired(decodedToken)) logout();
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
};

const isTokenExpired = (decodedToken) => {
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decodedToken.exp < currentTime;
};
