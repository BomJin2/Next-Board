import styles from "@/app/board/[id]/page.module.scss";
import Image from "next/image";

const NonBoardCard = () => {
  const createBoard = () => {};
  return (
    <>
      <div className={styles.body__noData}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
        <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
        <button onClick={createBoard}>
          <Image src="/assets/images/button.svg" width={74} height={74} alt="rounded-button" />
        </button>
      </div>
    </>
  );
};
export { NonBoardCard };
