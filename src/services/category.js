const categories = [
  { label: "Q&A", value: "qna" },
  { label: "커뮤니티", value: "community" },
  { label: "공지사항", value: "notice" },
  { label: "강의", value: "lecture" },
];

// 호출하면 categories를 내보낼 수 있는 내보내기 함수
export function getCategories() {
  return categories;
}
