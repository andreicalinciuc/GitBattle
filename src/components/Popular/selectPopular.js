import React from "react";
import languages from "../../utility/constants";
import { Tab, Tabs } from "@material-ui/core";
import "./popular.css";
export default class SelectedLanguage extends React.Component {
  render() {
    const { click } = this.props;
    return (
      <Tabs>
        <div className="navigationLink">
          {languages.map((lang, key) => {
            return (
              <Tab
                label={lang.label}
                value={lang.value}
                key={key}
                onClick={() => click(lang.value)}
                onSelect={lang.value}
                className={this.props.selectItem == lang.value?"selectedItem":null}
                
              />
            );
          })}
        </div>
      </Tabs>
    );
  }
}
