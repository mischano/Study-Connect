export function fetchUser() {
    if (JSON.parse(localStorage.getItem('profile'))) {
       return (JSON.parse(localStorage.getItem('profile'))).result;

    } else {
       return null;
    }
 }