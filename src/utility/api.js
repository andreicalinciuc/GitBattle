async function fetchUser(username) {
  return await fetch(
    "https://api.github.com/users/" + username
  ).then((response) => response.json());
}

function getListByID(id) {
  return fetch("https://jsonblob.com/api/jsonBlob/" + id)
    .then((response) => response.json())
    .then((data) => data["users"]);
}
function saveList(id, data) {
  return fetch("https://jsonblob.com/api/jsonBlob/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return("Success");
    })
    .catch((error) => {
      return("Errora");
    });
}
export default {
  battle: async function (users) {
    return users.map(async (user) => {
      return await fetchUser(user.value);
    });
  },
  fetchUser: (user) => {
    return fetchUser(user);
  },
  getListByID: (id) => {
    return getListByID(id);
  },
  saveList: (id, data) => {
    return saveList(id, data);
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
