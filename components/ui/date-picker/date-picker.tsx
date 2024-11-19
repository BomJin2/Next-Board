import { CalendarIcon } from "lucide-react";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BasicdatePicker = () => {
  const [date, setDate] = useState<Date>();
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-[140px] justify-end text-left font-normal", !date && "text-muted-foreground")}>
            {date ? format(date, "yyyy/MM/dd") : ""}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  );
};
export { BasicdatePicker };
