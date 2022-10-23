import DatePlaceholder from "./DatePlaceholder";
import DateItems from "./DateItems";
import { getStartDayOfMonth } from "../../../utils/functions";

type Props = {
  date: Date;
  pickedStartDate: Date;
  pickedEndDate: Date;
  handlePickDates: (date: Date) => void;
};

const Calendar = ({
  date,
  pickedStartDate,
  pickedEndDate,
  handlePickDates,
}: Props) => {
  return (
    <div className="calendar">
      <div className="calendar__header">{`${
        date.getMonth() + 1
      } Month ${date.getFullYear()}`}</div>
      <div className="calendar__table">
        <DatePlaceholder count={getStartDayOfMonth(date)} />
        <DateItems
          date={date}
          pickedStartDate={pickedStartDate}
          pickedEndDate={pickedEndDate}
          handlePickDates={handlePickDates}
        />
      </div>
    </div>
  );
};

export default Calendar;
