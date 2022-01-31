const createUser = async (userData) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something is wrong");
  }
  return data;
};

export default createUser;
