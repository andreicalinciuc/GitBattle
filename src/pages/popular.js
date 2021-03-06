import React, { PureComponent } from "react";
import SelectLanguage from "../components/Popular/selectPopular";
import { BoxLoading } from "react-loadingg";
import PopularListRender from "../components/Popular/popularListItem";
import api from "../utility/api";
import "../components/Popular/popular.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Popular extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      language: "All",
      isLoading: false,
      data: null,
    };
  }
  componentDidMount = async () => {
    this.setState({
      isLoading: false,
    });
    const response = await api.fetchRepo("all");
    this.setState({ isLoading: true, data: response });
  };
  activeLabel = async (lang) => {
    console.log(lang);
    this.setState({
      language: lang,
      isLoading: false,
    });

    const response = await api.fetchRepo(lang);
    if(response!==undefined)
    this.setState({ isLoading: true, data: response });
  };

  render() {
    return (
      <div>
        <SelectLanguage
          click={this.activeLabel}
          selectItem={
            this.state.language != "" ? this.state.language.toLowerCase() : null
          }
        ></SelectLanguage>

        <div className="popular-container">
          {this.state.isLoading === true ? (
            this.state.data.map((item, key) => {
              return (
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={2000}
                  transitionLeaveTimeout={1000}
                  transitionAppear={true}
                  transitionAppearTimeout={1000}
                >
                  <PopularListRender
                    popularItem={item}
                    key={key}
                    index={key + 1}
                  ></PopularListRender>
                </ReactCSSTransitionGroup>
              );
            })
          ) : (
            <BoxLoading />
          )}
        </div>
      </div>
    );
  }
}

export default Popular;
