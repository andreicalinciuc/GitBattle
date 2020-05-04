function fetchUser(username) {
  return fetch("https://api.github.com/users/" + username).then((response) =>
    response.json()
  );
}

export default {
  battle: async function (users) {
    return Promise.all(
      users.map(async (user) => {
        return await fetchUser(user.value);
      })
    );
  },
  fetchUser: (user) => {
    return fetchUser(user);
  },

  fetchRepo: function (language) {
    return fetch(
      "https://api.github.com/search/repositories?q=stars:>5+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    )
      .then((response) => response.json())
      .then((data) => data["items"]);
  },
};
