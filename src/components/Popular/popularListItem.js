import React from "react";

export default class PopularListRender extends React.Component {
  render() {
    return (
      <div className="popular-item">
        {this.props.popularItem.name}
        <p>Position: {this.props.index}</p>
        <img src={this.props.popularItem.owner.avatar_url} width="110px"></img>
      </div>
    );
  }
}
