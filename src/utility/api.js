import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const API = "https://api.github.com";
async function fetchUser(username) {
  return await fetch(`${API}/users/${username}`)
    .then((response) => response.json())
    .catch((error) => {
      toast.error(`Error: ${error} `.toUpperCase(), {
        autoClose: 3000,
        className: "dark-toast",
      });
    });
}

async function fetchRepos(username) {
  return await fetch(`${API}/users/${username}/repos`, {
    mode: "no-cors",
  }).then((response) =>
    response.json().catch((error) => {
      toast.error(`Error: ${error} `.toUpperCase(), {
        autoClose: 3000,
        className: "dark-toast",
      });
    })
  );
}

async function fetchStatsRepo(username, repo) {
  return await fetch(`  ${API}/repos/${username}/${repo}/stats/code_frequency`)
    .then((response) => response)
    .catch((error) => {
      toast.error(`Error: ${error} `.toUpperCase(), {
        autoClose: 3000,
        className: "dark-toast",
      });
    });
}

function getListByID(id) {
  return fetch("https://jsonblob.com/api/jsonBlob/" + id)
    .then((response) => response.json())
    .then((data) => data["users"])
    .catch((error) => {
      toast.error(`Error: ${error} `.toUpperCase(), {
        autoClose: 3000,
        className: "dark-toast",
      });
    });
}
function saveList(id, data, team) {
  return fetch("https://jsonblob.com/api/jsonBlob/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      toast.success(`Succes ${team}`.toUpperCase(), {
        autoClose: 3000,
        className: "dark-toast",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
}
export default {
  battle: async function (users) {
    return users.map(async (user) => {
      return await fetchUser(user.value);
    });
  },
  fetchUser: async (user) => {
    {
      const userRepo = fetchUser(user);
      // const repos = await fetchRepos(user);
      // const stats = repos.map(async (item) => {
      //   return await fetchStatsRepo(user, item.name);
      // });
      return userRepo;
    }
  },
  getListByID: (id) => {
    return getListByID(id);
  },
  saveList: (id, data, team) => {
    return saveList(id, data, team);
  },

  fetchRepo: function (language) {
    return fetch(
      `${API}/search/repositories?q=stars:>5+language:${language}&sort=stars&order=desc&type=Repositories`
    )
      .then((response) => response.json())
      .then((data) => data["items"])
      .catch((error) => {
        toast.error(`Error: ${error} `.toUpperCase(), {
          autoClose: 3000,
          className: "dark-toast",
        });
      });
  },
};
