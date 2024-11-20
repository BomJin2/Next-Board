"use client";

import { Button, Progress, SearchBar, LabelDatePicker } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";
import { BoardCard, NonBoardCard } from "@/features";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BoardContent, Task } from "@/types/database";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const BoardPage = () => {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const date = new Date();

  /** Supabase 'todos' 테이블에서 사용될 각 ROW 데이터 COLUMN */
  const [title, setTitle] = useState<string>(); // 필수 값 처리 예정
  const [startDate, setStartDate] = useState<Date>(new Date()); // 필수 값 처리 예정
  const [endDate, setEndDate] = useState<Date>(new Date()); // 필수 값 처리 예정
  const [task, setTask] = useState<Task | null>(null); // 필수 값으로 처리할 지 안할 지 추후 고민

  /**내가 한거
  const [boards, setBoards] = useState<Boards[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data: boards } = await supabase.from("boards").select();
      if (boards !== null) console.log(boards);
      if (boards!.length > 1) {
        setBoards(boards!);
      }
    }
    getTodos();
  }, []);

  const createBoard = async () => {
    const { data, status, error } = await supabase
      .from("boards")
      .insert({ border_id: null, created_at: date, title: "", start_date: null, end_date: null, description: "", ischecked: false })
      .select();

    if (error) {
      console.error(error);
    }
  };
*/
  /** 저장 버튼 클릭 시 */
  const onSave = async () => {
    const { status } = await supabase
      .from("todos")
      .update({ title: title })
      .eq("id", Number(pathname.split("/")[2]));

    if (status === 204) {
      toast({
        title: "TODO-LIST 수정을 완료하였습니다.",
        description: "수정한 TODO-LIST의 마감일을 꼭 지켜주세요!",
      });
      getData(); // 데이터 갱신
    }
  };

  /** 전체 삭제 버튼 클릭 시 */
  const onDeleteAll = () => {};

  /** Add New Board 버튼을 클릭 시 */
  const createBoard = () => {
    let newBoards: BoardContent[] = [];
    const boardContent = {
      boardId: nanoid(),
      isCompleted: false,
      title: "",
      startDate: "",
      endDate: "",
      content: "",
    };

    /** Supabase에 만약 데이터가 있을 때 */
    if (task !== null && task.boards.length > 0) {
      newBoards = [...task.boards];
      newBoards.push(boardContent);
      updateBoards(newBoards);
    } else if (task !== null && task?.boards.length === 0) {
      /** Supabase에 만약 데이터가 없을 때 */
      newBoards.push(boardContent);
      updateBoards(newBoards);
    }
  };

  const updateBoards = async (newBoards: BoardContent[]) => {
    console.log(newBoards);
    const { status, error } = await supabase
      .from("todos")
      .update({ boards: newBoards })
      .eq("id", Number(pathname.split("/")[2]));

    if (status === 204) {
      toast({
        title: "새로운 TODO-BOARD가 생성되었습니다.",
        description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
      });
      getData(); // 데이터 갱신
    }

    if (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "에러가 발생했습니다.",
        description: "개발자 도구창을 확인하세요.",
      });
    }
  };

  /** Supabase 데이터베이스의(기존에 생성한 페이지에) 데이터 유무 체크*/
  const getData = async () => {
    const { data } = await supabase.from("todos").select("*"); // 전체 조회

    if (data !== null) {
      data.forEach((task: Task) => {
        if (task.id === Number(pathname.split("/")[2])) {
          setTask(task);
          setTitle(task.title);
        }
      });
    }
  };

  const deleteBoard = async () => {
    const { status, error } = await supabase.from("todos").delete({}).eq("id", pathname.split("/")[2]);

    if (status === 204) {
      toast({
        variant: "distruct",
        title: "데이터가 전체 삭제되었습니다.",
        description: "새로운 페이지를 만드세요",
      });
    }
    router.push("/");
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="page">
        <aside className="page__aside">
          {/* 검색창 UI */}
          <SearchBar placeholder="검색어를 입력하세요." />
          {/* ADD New Page 버튼 UI */}
          <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]">Add New Page</Button>
          {/* TODO 목록 UI */}
          <div className="flex flex-col mt-4 gap-2">
            <small className="text-sm font-medium leading-none text-[#A6A6A6] ">BomJin's</small>
            <ul className="flex flex-col ">
              <li className="px-2 py-2.5 bg-[#F5F5F5] rounded-sm flex gap-2 items-center text-sm">
                <div className="w-[6px] h-[6px] bg-[#00F38D] rounded-full"></div>Enter Title
              </li>
              <li className="px-2 py-2.5 bg-[#F5F5F5] rounded-sm flex gap-2 items-center text-sm">
                <div className="w-[6px] h-[6px] bg-[#00F38D] rounded-full"></div>Enter Title
              </li>
            </ul>
          </div>
        </aside>
        <main className="page__main">
          <div className={styles.header}>
            <div className="flex items-center gap-2 justify-between">
              <Button variant={"outline"} size={"icon"} onClick={() => router.push("/")}>
                <ChevronLeft />
              </Button>
              <div className="flex items-center gap-2">
                <Button variant={"secondary"} onClick={onSave}>
                  저장
                </Button>
                <Button className="text-rose-600 bg-red-50 hover:bg-rose-50" onClick={deleteBoard}>
                  삭제
                </Button>
              </div>
            </div>
            <div className={styles.header__top}>
              {/* 제목 입력 Input 섹션 */}
              <input
                type="text"
                placeholder="Enter Title Here!"
                className={styles.header__top__input}
                onChange={(e) => setTitle(e.target.value)} /**타이틀 상태값 갱신 */
                value={title}
              />
              {/* 진행상황 척도 그래프 섹션 */}
              <div className="flex items-center justify-start gap-4">
                <small className="text-sm font-medium leading-none text-[#6D6D6D] ">0/0 Completed</small>
                <Progress className="w-[238px] h-[10px]" value={33} />
              </div>
            </div>
            <div className={styles.header__bottom}>
              {/* 캘린더 + Add New Board 버튼 섹션 */}
              <div className="flex items-center gap-5">
                <LabelDatePicker label={"From"} />
                <LabelDatePicker label={"To"} />
              </div>
              <Button className=" text-white bg-[#E79057] hover:bg-[#E79057] border hover:border-[#E26F24]" onClick={createBoard}>
                Add New Button
              </Button>
            </div>
          </div>
          <div className={styles.body}>
            {/* {내가 만든 카드 데이터가 없을 때 
            
            {boards && boards.length > 0 ? boards.map((board, idx) => <BoardCard data={board} />) : <NonBoardCard />}*/}
            {task?.boards.length === 0 ? (
              <div className={styles.body__noData}>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
                <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
                <button onClick={createBoard}>
                  <Image src="/assets/images/button.svg" width={74} height={74} alt="rounded-button" />
                </button>
              </div>
            ) : (
              task?.boards.map((board: BoardContent) => {
                return <BoardCard key={board.boardId} />;
              })
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default BoardPage;
