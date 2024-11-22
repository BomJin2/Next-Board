import styles from "@/app/board/[id]/page.module.scss";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import logo from "@/public/assets/images/logo.svg";
const NonBoardCard = () => {
  const date = new Date();
  const createBoard = async () => {
    const { data, status, error } = await supabase
      .from("boards")
      .insert({ border_id: null, created_at: date, title: "", start_date: null, end_date: null, description: "", ischecked: false })
      .select();

    console.log(data);
    console.log(status);

    if (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles.body__noData}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
        <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
        <button onClick={createBoard}>
          <Image src={logo} width={74} height={74} alt="rounded-button" />
        </button>
      </div>
    </>
  );
};
export { NonBoardCard };
