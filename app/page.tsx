"use client";

import { Button, SearchBar } from "@/components/ui";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { BoardContent } from "@/types/database";

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [todos, setTodos] = useState<BoardContent[] | null>([]);
  const [title, setTile] = useState();
  const date = new Date();

  useEffect(() => {
    async function getTodos() {
      const { data: todoList } = await supabase.from("todos").select();

      setTodos(todoList);
    }

    getTodos();
  }, []);

  const createPage = async () => {
    const { data, status, error } = await supabase
      .from("todos")
      .insert({ created_at: date, title: "", start_date: null, end_date: null, boards: [] })
      .select();

    if (status === 201 && data) {
      toast({
        title: "새로운 TODO-LIST가 생성되었습니다. ",
        description: "SupaBase에서 확인해보쇼",
      });
    }

    router.push(`/board/${data![0].id}`);
  };

  return (
    <>
      <div className="page">
        <aside className="page__aside">
          {/* 검색창 UI */}
          <SearchBar placeholder="검색어를 입력하세요." />
          {/* ADD New Page 버튼 UI */}
          <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={createPage}>
            Add New Page
          </Button>
          {/* TODO 목록 UI */}
          <div className="flex flex-col mt-4 gap-2">
            <small className="text-sm font-medium leading-none text-[#A6A6A6] ">BomJin's</small>
            <ul className="flex flex-col gap-2 ">
              {todos?.map((todo) => {
                return (
                  <button onClick={() => router.push(`/boarder/`)}>
                    <li className="px-2 py-2.5 bg-[#F5F5F5] rounded-sm flex gap-2 items-center text-sm">
                      <div className="w-[6px] h-[6px] bg-[#00F38D] rounded-full"></div> {todo.title}
                    </li>
                  </button>
                );
              })}
            </ul>
          </div>
        </aside>
        <main className="page__main">
          <div className="flex flex-col justify-center items-center gap-5 mb-5">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">How to start:</h3>
            <div className="flex flex-col items-center gap-4">
              <small className="text-sm  leading-none font-normal">1. Create a page</small>
              <small className="text-sm  leading-none font-normal ">2. Add boards to page</small>
            </div>
            <Button
              className="w-full text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] px-3 py-[6px] text-xs"
              onClick={createPage}
            >
              Add New Page
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};
export default page;
