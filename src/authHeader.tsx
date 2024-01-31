export default function authHeader() {
    const userStr = localStorage.getItem("token");
    if (userStr) {    
        return { Authorization: 'Bearer ' + userStr };
    } else {        
        return { Authorization: '' };
    }
}