import { boot } from "quasar/wrappers";
import { Notify } from "quasar"; // Notify 를 vue 파일이 아닌 곳에서 다를 때 이렇게 작성
import { getErrorMessage } from "src/utils/firebase/error-message";

export default boot(async ({ app }) => {
  app.config.errorHandler = (err, instance, info) => {
    console.log("err : ", err);
    console.log("instance : ", instance);
    console.log("info : ", info);
    Notify.create(getErrorMessage(err.code));
  };
});
