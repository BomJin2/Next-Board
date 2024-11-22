import { Button, LabelDatePicker, Separator, Checkbox } from "@/components/ui";

import { ChevronUp } from "lucide-react";
import { MEDialog } from "./ME-Dialog";
import { BoardContent, Boards, Task } from "@/types/database";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Props {
  data: BoardContent;
  onBoards: (data: Task) => void;
}

const BoardCard = ({ data, onBoards }: Props) => {
  const { id } = useParams();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date()); // 필수 값 처리 예정
  const [endDate, setEndDate] = useState<Date | undefined>(new Date()); // 필수 값 처리

  /** TODO-LIST의 개별 TODO-BOARD 삭제 */
  const handleDelete = async (selected: string | number) => {
    try {
      const { data } = await supabase.from("todos").select("*").eq("id", Number(id));

      if (data !== null) {
        const { status } = await supabase
          .from("todos")
          .update({
            boards: data[0].boards.filter((board: BoardContent) => board.boardId !== selected),
          })
          .eq("id", Number(id));
        if (status === 204) {
          toast({
            title: "선택하신 TODO-BOARD가 삭제되었습니다.",
            description: "새로운 TODO-BOARD를 생성하려면 'Add New Board' 버튼을 눌러주세요!",
          });
          getData(); // 데이터 갱신
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  /** Supabase 데이터베이스의(기존에 생성한 페이지에) 데이터 유무 체크 */
  const getData = async () => {
    const { data } = await supabase.from("todos").select("*").eq("id", id); // 전체 조회

    if (data !== null) {
      onBoards(data[0]);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full border border-[#EDEDED] bg-white rounded-sm p-5 gap-[14px]">
        <div className="flex flex-col gap-[23px] ">
          {/* 타이틀 달력 */}
          <div className="flex items-center justify-between ">
            {/* 체크박스 input */}
            <div className="flex gap-4 items-center">
              <Checkbox id="terms" className="w-6 h-6 border-[#E4E4E4] hover:border-2 hover:border-[#C4C4C4] data-[state=checked]:bg-green-400" />

              <input type="text" placeholder="Baord Title Here..." className="outline-none text-2xl" disabled={true} />
            </div>
            <Button variant={"ghost"} size={"icon"}>
              <ChevronUp />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            {/* 달력 */}
            <div className="flex gap-4">
              <LabelDatePicker label={"From"} isReadOnly={true} onSetDate={setStartDate} />
              <LabelDatePicker label={"To"} isReadOnly={true} onSetDate={setEndDate} />
            </div>
            <div className="flex gap-6px ">
              <Button className="bg-white text-[#6D6D6D] px-3 py-[6px] hover:text-[#6D6D6D] hover:bg-[#F6F6F6]">Duplicate</Button>
              <Button
                className="bg-white text-[#6D6D6D] px-3 py-[6px] hover:text-[#6D6D6D] hover:bg-[#F6F6F6]"
                onClick={() => handleDelete(data.boardId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        {/* Add Content 버튼 */}
        <MEDialog data={data} />
      </div>
    </>
  );
};
export { BoardCard };
