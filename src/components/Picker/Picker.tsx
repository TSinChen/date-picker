import { useState, useEffect } from "react";

import {
  dateFormatter,
  getDateOfPrevMonth,
  getEndTime,
} from "../../utils/functions";
import ARROW_RIGHT from "../../images/arrow-right.png";
import CLOSE from "../../images/close.png";
import Calendar from "./Calendar/Calendar";

type Props = {
  currentDate: Date;
  isPickerOpen: boolean;
  closePicker: () => void;
  startDate: Date;
  endDate: Date;
  onSubmit: (pickedStartDate: Date, pickedEndDate: Date) => void;
};

const HEADER = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];

const Picker = ({
  currentDate,
  isPickerOpen,
  closePicker,
  startDate,
  endDate,
  onSubmit,
}: Props) => {
  const [pickedStartDate, setPickedStartDate] = useState(new Date());
  const [pickedEndDate, setPickedEndDate] = useState(new Date());
  const [pickTimes, setPickTimes] = useState(0);

  const handlePickDates = (date: Date) => {
    setPickTimes((prev) => prev + 1);
    switch (pickTimes) {
      case 0:
        setPickedStartDate(date);
        setPickedEndDate(date);
        return;
      case 1:
        // 先選後再選前
        if (pickedStartDate.getTime() > date.getTime()) {
          setPickedEndDate(getEndTime(pickedStartDate));
          setPickedStartDate(date);
        } else {
          setPickedEndDate(getEndTime(date));
        }
        setPickTimes(0);
        return;
    }
  };

  const handleClosePicker = () => {
    closePicker();
    setPickedStartDate(startDate);
    setPickedEndDate(endDate);
  };

  useEffect(() => {
    setPickedStartDate(startDate);
    setPickedEndDate(endDate);
  }, [startDate, endDate]);

  return (
    <div className={`picker${isPickerOpen ? " active" : ""}`}>
      <img
        className="picker__close"
        src={CLOSE}
        alt=""
        onClick={handleClosePicker}
      />
      <div className="result">
        <div>
          <div className="result__label">Start Time</div>
          <div className="result__value">{dateFormatter(pickedStartDate)}</div>
        </div>
        <img className="result__arrow" src={ARROW_RIGHT} alt="" />
        <div>
          <div className="result__label">End Time</div>
          <div className="result__value">{dateFormatter(pickedEndDate)}</div>
        </div>
      </div>
      <div className="picker__header">
        {HEADER.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="picker__calendars">
        {/* prev month */}
        <Calendar
          date={getDateOfPrevMonth(currentDate)}
          pickedStartDate={pickedStartDate}
          pickedEndDate={pickedEndDate}
          handlePickDates={handlePickDates}
        />
        {/* this month */}
        <Calendar
          date={currentDate}
          pickedStartDate={pickedStartDate}
          pickedEndDate={pickedEndDate}
          handlePickDates={handlePickDates}
        />
      </div>
      <div
        className="picker__submit"
        onClick={() => onSubmit(pickedStartDate, pickedEndDate)}
      >
        Confirm
      </div>
    </div>
  );
};

export default Picker;
