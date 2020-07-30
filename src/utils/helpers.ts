import { apiUrl } from "./constants";
import { Class, Homework } from "./interfaces";

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

export const joinClassByCode = async (code: string): Promise<string> => {
  const result = await (
    await fetch(`${apiUrl}/classes/joinClassByCode`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
  ).json();
  console.log(result);
  return result.message;
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

export const getUserData = async (userid?: string | number) => {
  const userID = localStorage.getItem("userid");
  if (userID === "undefined") {
    return {};
  }
  const userData = await fetch(`${apiUrl}/users/userData/${userid || userID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await userData.json();
};

export const getClassData = async (id: number | string): Promise<Class> => {
  if (!id) {
    return { id: -1, teacher: -1, name: "", code: "", students: [] };
  }
  const classData = await fetch(`${apiUrl}/classes/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await classData.json())[0];
};

export const getClassHWData = async (
  id: number | string
): Promise<Homework[]> => {
  if (!id) {
    return [{ id: -1, classid: -1, dueDate: -1, name: "", questions: [] }];
  }
  const classData = await fetch(`${apiUrl}/homework/hwForClass/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return classData.json();
};

export const hwDataById = async (id: number | string): Promise<Homework> => {
  if (!id) {
    return { id: -1, classid: -1, dueDate: -1, name: "", questions: [] };
  }
  const classData = await fetch(`${apiUrl}/homework/hwData/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return classData.json();
};

export const submitHwData = async (
  hwid: number,
  choices: string
): Promise<string> => {
  if (!hwid) {
    return "Homework ID is invalid";
  }
  const classData = await fetch(`${apiUrl}/homework/completeHW/${hwid}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ homeworkid: hwid, choices }),
  });
  return classData.json();
};
