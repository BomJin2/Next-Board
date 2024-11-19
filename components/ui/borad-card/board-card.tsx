import { Button, LabelDatePicker, Separator, Checkbox } from "@/components/ui";

import { ChevronUp } from "lucide-react";

const BoardCard = () => {
  return (
    <>
      <div className="flex flex-col w-full border border-[#EDEDED] bg-white rounded-sm p-5 gap-[14px]">
        <div className="flex flex-col gap-[23px] ">
          {/* 타이틀 달력 */}
          <div className="flex items-center justify-between ">
            {/* 체크박스 input */}
            <div className="flex gap-4 items-center">
              <Checkbox id="terms" className="w-6 h-6 border-[#E4E4E4] hover:border-2 hover:border-[#C4C4C4]" />

              <input type="text" placeholder="Baord Title Here..." className="outline-none text-2xl" />
            </div>
            <Button variant={"ghost"} size={"icon"}>
              <ChevronUp />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            {/* 달력 */}
            <div className="flex gap-4">
              <LabelDatePicker label={"From"} />
              <LabelDatePicker label={"To"} />
            </div>
            <div className="flex gap-6px ">
              <Button className="bg-white text-[#6D6D6D] px-3 py-[6px] hover:text-[#6D6D6D] hover:bg-[#F6F6F6]">Duplicate</Button>
              <Button className="bg-white text-[#6D6D6D] px-3 py-[6px] hover:text-[#6D6D6D] hover:bg-[#F6F6F6]">Delete</Button>
            </div>
          </div>
        </div>
        <Separator />
        {/* Add Content 버튼 */}
        <Button className="bg-white text-[#6D6D6D] px-3 py-[6px] hover:text-[#6D6D6D] hover:bg-[#F6F6F6]">Add Contents</Button>
      </div>
    </>
  );
};
export { BoardCard };
