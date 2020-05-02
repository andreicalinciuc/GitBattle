import React from "react";
import languages from "../../languages";
import { Tab, Tabs } from "@material-ui/core";
import './popular.css'
export default class SelectedLanguage extends React.Component {
  render() {
    const { click } = this.props;
    return (
      <Tabs>
        {languages.map((lang,key) => {
          return (
            <Tab
              label={lang.label}
              value={lang.value}
              key={lang.label}
              activeKey={key}
              onClick={() => click(lang.value)}
              onSelect={() => click(lang.value)}
              className='tab-selected'
              
            />
          );
        })}
      </Tabs>
    );
  }
}
