import React, { Component, PropTypes } from "react";
import languages from "../../utility/constants";
import { Tab, Tabs, Input } from "@material-ui/core";
import "./popular.css";
import { debounce } from "debounce";

export default class SelectedLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: " " };
    this.timeout = null;
  }
  onChangeSearchInput = (evt) => {
    this.debouncedSearch(evt.target.value);
  };

  debouncedSearch = debounce(function (query) {
    this.props.click(query);
  }, 1000);

  render() {
    const { click } = this.props;
    return (
      <Tabs value={false}>
        <div className="navigationLink">
          {languages.map((lang, key) => {
            return (
              <Tab
                label={lang.label}
                value={lang.value}
                key={key}
                onClick={() => click(lang.value)}
                className={
                  this.props.selectItem === lang.value ? "selectedItem" : null
                }
              />
            );
          })}
          <Input
            placeholder={`Search your favorite language`}
            type="text"
            className="popular-input"
            onChange={this.onChangeSearchInput}
          />
        </div>
      </Tabs>
    );
  }
}
