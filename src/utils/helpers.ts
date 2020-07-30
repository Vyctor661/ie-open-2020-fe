import { apiUrl } from "./constants";

export const logout = async () => {
  await fetch(`${apiUrl}/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  localStorage.setItem("userid", "undefined");
  setTimeout(() => {
    window.location.replace("/");
  }, 500);
};

export const getLoggedIn = async (): Promise<boolean> => {
  const result = await (
    await fetch(`${apiUrl}/auth/isloggedin`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  if (result.islogged === false) {
    localStorage.setItem("userid", "undefined");
  } else {
    localStorage.setItem("userid", result.userid);
  }
  return result.islogged;
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
    setTimeout(() => {
      window.location.replace("/");
    }, 500);

    return "";
  } else if (response.status === 401) {
    return "You are already logged in.";
  } else if (response.status === 400) {
    return "Invalid email or password.";
  } else {
    return "Oops, looks like something went wrong.";
  }
};

export const register = async (
  role: string,
  name: string,
  password: string
) => {
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
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
    return "";
  } else if (response.status === 401) {
    return "You are already logged in.";
  } else if (response.status === 400) {
    return "Looks like that username is already taken";
  } else {
    return "Oops, looks like something went wrong.";
  }
};

export const getUserData = async () => {
  const userID = localStorage.getItem("userid");
  if (userID === "undefined") {
    return {};
  }
  const userData = await fetch(`${apiUrl}/users/userData/${userID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await userData.json();
};
