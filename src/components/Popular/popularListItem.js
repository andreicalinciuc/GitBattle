import React,{PureComponent} from "react";

export default class PopularListRender extends PureComponent {
 
  render() {
    return (
      <div className="popular-item" >
        <p>Project: <a href={this.props.popularItem.html_url}>{this.props.popularItem.name}</a></p>
        <p>Position: {this.props.index}</p>
        <p>Watchers: {this.props.popularItem.watchers}</p>
        <img src={this.props.popularItem.owner.avatar_url} width="110px"></img>
      </div>
    );
  }
}
