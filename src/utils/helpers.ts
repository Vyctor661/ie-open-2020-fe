import { apiUrl } from "./constants";

export const getLoggedIn = (): boolean => {
  // for checking if the user is logged in I need it for dsiplaying stuff on the navbar.

  return false;
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 200) {
    localStorage.setItem("userid", (await response.json()).user.id);
    window.location.replace("#/profile");
    return "";
  } else if (response.status === 401) {
    return "You are already logged in.";
  } else if (response.status === 400) {
    return "Invalid email or password.";
  } else {
    return "Oops, looks like something went wrong.";
  }
};


export const register = async (role: string, name: string, password: string) => {
  const response = await fetch(`${apiUrl}/users/createUser`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, name, password }),
  });

  if (response.status === 201) {
    localStorage.setItem("userid", (await response.json()).id);
    window.location.replace("#/profile");
    return "";
  } else if (response.status === 401) {
    return "You are already logged in.";
  } else if (response.status === 400) {
    return "Invalid email or password.";
  } else {
    return "Oops, looks like something went wrong.";
  }
};
