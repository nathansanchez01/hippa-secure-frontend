export function setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  export function isLoggedIn() {
    return !!getUser();
  }
  
  export function logout() {
    localStorage.removeItem('user');
  }