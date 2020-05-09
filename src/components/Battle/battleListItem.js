import React, { PureComponent } from "react";
import "./battle.css";
class BattleResult extends PureComponent {


  render() {
    const { user, winnerScore } = this.props;

    function days_between(date1, date2) {
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(date1 - date2);
      return Math.round(differenceMs / ONE_DAY);
    }
    function calculateScore(user) {
      var score = user.public_repos + user.followers + user.following;
      return score;
    }
    var score = calculateScore(user);
    return (
      <div className= {score === winnerScore ?"user-container-search winner":"user-container-search looser"}>
        {user.message != null ? (
          <p className="error">{user.message}!</p>
        ) : (
          <div className="user-find">
            {score === winnerScore ? <p className="winner-text">Winner</p> : null}
            <p>Score: {score}</p>
            <img src={user.avatar_url} width="80px" alt="User profile"></img>
            <p>@{user.login}</p>
            <p>Public repos: {user.public_repos}</p>
            <p>Public gists: {user.public_gists}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
            <p>Days:{days_between(new Date(user.created_at), new Date())}</p>
          </div>
        )}
      </div>
    );
  }
}

export default BattleResult;
