import React from "react";
import {Input, Pagination, Spin, Tabs} from "antd"
export function Tabs1(props: {func: (key: string)=> void}){
  const tabOnChange = (key: string) => {
    props.func(key)
  };
  return(
    <div className="tabs">
      <Tabs onChange={tabOnChange}>
        <Tabs.TabPane tab="Search" key="1">
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rates" key="2">
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
