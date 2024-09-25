export let isAuthorized: boolean = true;

export const db = {
  login: "",
  password: "",
  role: "",
  port: 5433,
  name: "kashtan",
};

export const setIsAuthorized = (value: boolean) => {
  isAuthorized = value;
};
