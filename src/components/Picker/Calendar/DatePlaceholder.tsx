type Props = {
  count: number;
};

const DatePlaceholder = ({ count }: Props) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div className="calendar__date" key={"placeholder-" + i}></div>
      ))}
    </>
  );
};

export default DatePlaceholder;
