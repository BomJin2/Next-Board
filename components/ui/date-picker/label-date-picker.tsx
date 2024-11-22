import { useEffect, useState } from "react";
import { BasicdatePicker } from "./date-picker";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Props {
  label: string;
  isReadOnly?: boolean;
  onSetDate: (date: Date) => void;
}

const LabelDatePicker = ({ label, isReadOnly, onSetDate }: Props) => {
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (onSetDate) {
      onSetDate(date!);
    }
  }, [date, onSetDate]);

  return (
    <>
      <div className="max-w-64 flex items-center gap-3">
        <small className="text-sm font-medium leading-none text-[#6D6D6D] ">{label}</small>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              disabled={isReadOnly} // "readOnly" 모드일 때 버튼 비활성화
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>날짜를 선택하세요.</span>}
            </Button>
          </PopoverTrigger>
          {!isReadOnly && (
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          )}
        </Popover>{" "}
      </div>
    </>
  );
};
export { LabelDatePicker };
