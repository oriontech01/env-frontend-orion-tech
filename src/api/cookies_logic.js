export var access_token;

    
export const getCookie = (name) => {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');

        if (cookieName === name) {
        return decodeURIComponent(cookieValue);
        }
    }
    return null;
};

export const handleGetCookie = () => {
    // Retrieve the value of the "exampleCookie" cookie
    access_token = getCookie('access_token');
};
