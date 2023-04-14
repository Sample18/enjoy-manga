const TOKEN_KEY = "jwt-token-em";
const REFRESH_KEY = "jwt-refresh-token-em";
const EXPIRES_KEY = "jwt-expires-em";
const USERID_KEY = "user-local-id-em";

export function setTokens({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(USERID_KEY, localId);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};

export default localStorageService;