import { useState, useEffect } from "react";

import "./style/style.scss";
import ARROW_RIGHT from "./images/arrow-right.png";
import Picker from "./components/Picker/Picker";
import { dateFormatter, getStartTime, getEndTime } from "./utils/functions";

type Tabs = "Today" | "Seven Day" | "Fourteen Day";

const TABS: Tabs[] = ["Today", "Seven Day", "Fourteen Day"];

function App() {
  const currentDate = new Date();
  const [currentTab, setCurrentTab] = useState<Tabs | null>("Today");
  const [startDate, setStartDate] = useState(getStartTime(currentDate));
  const [endDate, setEndDate] = useState(getEndTime(currentDate));
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const closePicker = () => setIsPickerOpen(false);

  const setTab = (tab: Tabs) => {
    setCurrentTab(tab);
    switch (tab) {
      case "Today":
        setStartDate(getStartTime(new Date()));
        break;
      case "Seven Day":
        setStartDate(
          getStartTime(new Date(new Date().setDate(currentDate.getDate() - 7)))
        );
        break;
      case "Fourteen Day":
        setStartDate(
          getStartTime(new Date(new Date().setDate(currentDate.getDate() - 14)))
        );
        break;
    }
    setEndDate(getEndTime(new Date()));
  };

  const onSubmit = (pickedStartDate: Date, pickedEndDate: Date) => {
    setStartDate(getStartTime(pickedStartDate));
    setEndDate(getEndTime(pickedEndDate));
    closePicker();
  };

  useEffect(() => {
    switch (
      Math.trunc(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
      )
    ) {
      case 0:
        setCurrentTab("Today");
        return;
      case 7:
        setCurrentTab("Seven Day");
        return;
      case 14:
        setCurrentTab("Fourteen Day");
        return;
      default:
        setCurrentTab(null);
        return;
    }
  }, [startDate, endDate]);

  return (
    <div>
      <div className="container">
        <div className="result" onClick={() => setIsPickerOpen(true)}>
          <div>
            <div className="result__label">Start Time</div>
            <div className="result__value">{dateFormatter(startDate)}</div>
          </div>
          <img className="result__arrow" src={ARROW_RIGHT} alt="" />
          <div>
            <div className="result__label">End Time</div>
            <div className="result__value">{dateFormatter(endDate)}</div>
          </div>
        </div>
        <div className="tabs">
          {TABS.map((tab) => (
            <div
              key={tab}
              className={`tabs__tab${currentTab === tab ? " active" : ""}`}
              onClick={() => setTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <Picker
        currentDate={currentDate}
        isPickerOpen={isPickerOpen}
        closePicker={closePicker}
        startDate={startDate}
        endDate={endDate}
        onSubmit={onSubmit}
      />
      <div className="data">
        <div>Start Time: {startDate.toLocaleString()}</div>
        <div>｜</div>
        <div>End Time: {endDate.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default App;
