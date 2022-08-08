export function useAuth() {
  const token = localStorage.getItem("Token");
  return {
    isAuth: !!token,
    token
  };
}
