export default {
  fetchRepo: function (language) {
    return fetch(
      "https://api.github.com/search/repositories? q=stars:>5+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    )
      .then((response) => response.json())
      .then((data) => data["items"]);
  },
};
