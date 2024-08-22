import { decode as jwtDecode } from 'jwt-decode';

export const GetUserIDFromToken = () => {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

    if (cookie) {
        const token = cookie.split('=')[1]; // Extract the token from 'token=value'
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.id; // Return the user ID from the decoded token
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }
    console.log("Couldn't return the user ID, no token found.");
    return null;
}
