// 태그사용 관련 이벤트
const useTag = () => {
  const { tags, updateTags, maxLengthMessage } = options || {};

  // 태그추가 이벤트
  const addTag = (newTag) => {
    // newTag가 이벤트 핸들러로 동작하는지 확인 여부, 핸들러 요청을 받은 것만 필터 실행
    const isEventHandler = typeof newTag !== "string";
    const tagValue = isEventHandler
      ? newTag.target.value.replace(/ /g, "")
      : newTag.replace(/ /g, ""); // 공백 처리
    if (!tagValue) {
      return;
    }
    if (props.tags.length >= 10) {
      $q.notify("태그는 10개 이상 등록할 수 없습니다.");
      return;
    }
    if (props.tags.includes(tagValue) === false) {
      // 등록되어 있는, 중복 태그는 제거하고 등록
      // emit("update:tags", [...props.tags, tagValue]);
      updateTags([...tags.value, tagValue]);
    }
    // e.target.value = ""; // 초기화
    if (isEventHandler) {
      newTag.target.value = "";
    }
  };

  // 태그 삭제 이벤트
  // 삭제 버튼에 저장된 index 넘버로 데이터 찾아서 삭제
  const removeTag = (index) => {
    const model = [...tags.value];
    model.splice(index, 1);
    // emit("update:tags", model);
    updateTags(model);
  };
  return {
    addTag,
    removeTag,
  };
};
