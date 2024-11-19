import { BasicdatePicker } from "./date-picker";

interface Props {
  label: string;
}

const LabelDatePicker = ({ label }: Props) => {
  return (
    <>
      <div className="max-w-64 flex items-center gap-3">
        <small className="text-sm font-medium leading-none text-[#6D6D6D] ">{label}</small>
        <BasicdatePicker />
      </div>
    </>
  );
};
export { LabelDatePicker };
