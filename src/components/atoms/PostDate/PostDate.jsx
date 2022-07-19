import React from "react";
import styles from "./postDate.module.css";

function PostDate({date}) {
  // 더미 데이터로 오늘 날짜가 찍히게 만들었습니다.
  date = new Date();

  // date를 xxxx년 x월 x일의 형태로 출력되게끔 string을 만듭니다.
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const DATE_STRING = `${year}년 ${month}월 ${day}일`;

  return (
    <span className={styles["date"]}>
      {DATE_STRING}
    </span>
  )
}

export default PostDate;
