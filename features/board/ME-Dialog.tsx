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
import MarkdownEditor from "@uiw/react-markdown-editor";

const MEDialog = () => {
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
                <input type="text" placeholder="Baord Title Here..." className="outline-none text-2xl" />
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 justify-start">
            <LabelDatePicker label={"From"} />
            <LabelDatePicker label={"To"} />
          </div>
          <Separator />
          <MarkdownEditor className="h-[480px]" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" variant={"outline"}>
                취소
              </Button>
            </DialogClose>
            <Button className=" text-white bg-[#E79057] hover:bg-[#E79057] border hover:border-[#E26F24]">등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export { MEDialog };
