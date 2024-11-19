"use client";

import { Button, SearchBar } from "@/components/ui";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <>
      <div className="page">
        <aside className="page__aside">
          {/* 검색창 UI */}
          <SearchBar placeholder="검색어를 입력하세요." />
          {/* ADD New Page 버튼 UI */}
          <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={() => router.push("/board/1")}>
            Add New Page
          </Button>
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
          <div className="flex flex-col justify-center items-center gap-5 mb-5">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">How to start:</h3>
            <div className="flex flex-col items-center gap-4">
              <small className="text-sm  leading-none font-normal">1. Create a page</small>
              <small className="text-sm  leading-none font-normal ">2. Add boards to page</small>
            </div>
            <Button
              className="w-full text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] px-3 py-[6px] text-xs"
              onClick={() => router.push("/board/1")}
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
