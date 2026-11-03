export const fetchPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const postData = await response.json();
  return postData;
};

export const addPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Mukesh",
      username: "mukesh123",
      email: "mukesh@example.com",
    }),
  });

  const postData = await response.json();
  return postData;
};
