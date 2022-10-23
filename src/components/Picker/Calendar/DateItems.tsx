import { getDaysInMonth } from "../../../utils/functions";

type Props = {
  date: Date;
  pickedStartDate: Date;
  pickedEndDate: Date;
  handlePickDates: (date: Date) => void;
};

const DateItems = ({
  date,
  pickedStartDate,
  pickedEndDate,
  handlePickDates,
}: Props) => {
  return (
    <>
      {Array.from(
        {
          length: getDaysInMonth(date),
        },
        (_, i) => {
          const month = date.getMonth();
          const isSelected =
            (pickedStartDate.getMonth() === month &&
              pickedStartDate.getDate() === i + 1) ||
            (pickedEndDate.getMonth() === month &&
              pickedEndDate.getDate() === i + 1);
          // 這格的 Date
          const thisDay = new Date(date.getFullYear(), date.getMonth(), i + 1);
          const isInRange =
            thisDay.getTime() > pickedStartDate.getTime() &&
            thisDay.getTime() < pickedEndDate.getTime();
          const isThisDayStart =
            thisDay.getMonth() === pickedStartDate.getMonth() &&
            thisDay.getDate() === pickedStartDate.getDate();
          const isThisDayEnd =
            thisDay.getMonth() === pickedEndDate.getMonth() &&
            thisDay.getDate() === pickedEndDate.getDate();
          const isToday =
            thisDay.getMonth() === new Date().getMonth() &&
            thisDay.getDate() === new Date().getDate();

          return (
            <div
              className={`calendar__date${isInRange ? " inRange" : ""}${
                isThisDayStart ? " start" : ""
              }${isThisDayEnd ? " end" : ""}`}
              key={"date-" + i}
              onClick={() => handlePickDates(thisDay)}
            >
              {isToday && <div className="calendar__date--today"></div>}
              {isSelected && (
                <div className="calendar__date--selected">{i + 1}</div>
              )}
              {i + 1}
            </div>
          );
        }
      )}
    </>
  );
};

export default DateItems;
