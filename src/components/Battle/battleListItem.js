import React, { PureComponent } from "react";
import "./battle.css";
class BattleResult extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    function days_between(date1, date2) {
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(date1 - date2);
      return Math.round(differenceMs / ONE_DAY);
    }

    return (
      <div className="user-container-search">
        {user.message != null ? (
          <p className="error">{user.message}!</p>
        ) : (
          <div className="user-find">
            <img src={user.avatar_url} width="80px"></img>
            <p>@{user.login}</p>
            <p>Public repos:{user.public_repos}</p>
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
