"use client";

import { Button, Progress, SearchBar, LabelDatePicker } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";
import { BoardCard, NonBoardCard } from "@/features";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Boards } from "@/types/database";
import { nanoid } from "nanoid";

const BoardPage = () => {
  const router = useRouter();
  const date = new Date();

  const [title, setTitle] = useState<string>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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

  // 내가 한거
  // const createBoard = async () => {
  //   const { data, status, error } = await supabase
  //     .from("boards")
  //     .insert({ border_id: null, created_at: date, title: "", start_date: null, end_date: null, description: "", ischecked: false })
  //     .select();

  //   if (error) {
  //     console.error(error);
  //   }
  // };

  const createBoard = () => {
    let newBoards: Boards[] = [];
    const boardContent = {
      border_id: nanoid(),
      created_at: date,
      title: "",
      start_date: "",
      end_date: "",
      description: "",
      ischecked: false,
    };

    /** Supabase에 만약 데이터가 있을 때 */
    if (boards.length) {
      newBoards = [...boards, boardContent];
      newBoards.push(boardContent);
    } else {
      /** Supabase에 만약 데이터가 없을 때 */
      newBoards.push(boardContent);
    }
  };

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
            <div className="flex items-center gap-2">
              <Button variant={"outline"} size={"icon"} onClick={() => router.push("/")}>
                <ChevronLeft />
              </Button>
              <Button variant={"secondary"}>저장</Button>
            </div>
            <div className={styles.header__top}>
              {/* 제목 입력 Input 섹션 */}
              <input type="text" placeholder="Enter Title Here!" className={styles.header__top__input} />
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
            {/* 데이터가 없을 때 */}
            {boards && boards.length > 0 ? boards.map((board, idx) => <BoardCard data={board} />) : <NonBoardCard />}
          </div>
        </main>
      </div>
    </>
  );
};

export default BoardPage;
