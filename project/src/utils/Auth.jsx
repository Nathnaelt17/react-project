export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const signupUser = (data) => {
  const users = getUsers();

  const exists = users.find(
    (u) =>
      u.email === data.email ||
      u.phone === data.phone ||
      u.username === data.username
  );

  if (exists) return { success: false, message: "User already exists" };

  users.push(data);
  saveUsers(users);

  return { success: true };
};

export const loginUser = ({ identifier, password }) => {
  const users = getUsers();

  const user = users.find(
    (u) =>
      (u.email === identifier ||
        u.phone === identifier ||
        u.username === identifier) &&
      u.password === password
  );

  if (!user) return { success: false, message: "Invalid credentials" };

  return { success: true, user };
};