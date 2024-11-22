import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { BoardContent } from "@/types/database";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  data: BoardContent;
}

const MEDialog = ({ data }: Props) => {
  const { id } = useParams();
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [content, setContent] = useState<string>("**Hello, World!!**");

  const handleInsert = async (selected: string | number) => {
    try {
      /** 생성한 페이지의 전체 데이터를 조회: 특정 TODO-LIST의 id 값을 기준으로 조회 */
      const { data } = await supabase.from("todos").select("*").eq("id", id);

      if (data && data !== null) {
        data[0].boards.forEach((board: BoardContent) => {
          if (board.boardId === selected) {
            board.title = title;
            board.startDate = startDate as Date;
            board.endDate = endDate as Date;
            board.content = content;
          }
        });

        const { status } = await supabase
          .from("todos")
          .update({
            boards: data[0].boards,
          })
          .eq("id", id);

        if (status === 204) {
          toast({
            title: "TODO-BOARD 콘텐츠가 올바르게 등록되었습니다.",
            description: "등록한 TODO-BOARD의 마감일을 지켜 하루를 채워가세요!",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white text-[#6D6D6D] px-3 py-[6px] hover:text-[#6D6D6D] hover:bg-[#F6F6F6]">Add Contents</Button>
        </DialogTrigger>
        <DialogContent className=" w-full">
          <DialogHeader className="flex flex-col gap-5">
            <DialogTitle>
              <div className="flex gap-4 items-center">
                <Checkbox
                  id="terms"
                  className="w-6 h-6 min-w-5  border-[#E4E4E4] hover:border-2 hover:border-[#C4C4C4] data-[state=checked]:bg-green-400"
                />{" "}
                <input
                  type="text"
                  placeholder="Baord Title Here..."
                  className="w-full outline-none text-2xl"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 justify-start">
            <LabelDatePicker label={"From"} onSetDate={setStartDate} />
            <LabelDatePicker label={"To"} onSetDate={setEndDate} />
          </div>
          <Separator />
          <MarkdownEditor className="h-[480px]" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" variant={"outline"}>
                취소
              </Button>
            </DialogClose>
            <Button className=" text-white bg-[#E79057] hover:bg-[#E79057] border hover:border-[#E26F24]" onClick={() => handleInsert(data.boardId)}>
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export { MEDialog };
