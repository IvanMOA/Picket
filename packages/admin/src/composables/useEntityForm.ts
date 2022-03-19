import { getCurrentInstance, reactive, ref } from "vue";
import { ValidationError } from "@/errors/ValidationError";
import { useI18n } from "vue-i18n";
import { ElNotification } from "element-plus";
import { useQueryClient } from "vue-query";
type UseEntityFormArgs<Form, Fn> = {
  initialValues: Form;
  onSubmit: (formValues: Form) => Promise<void>;
  successNotificationTitle: string;
  successNotificationMessage: string;
  queriesToInvalidate: string;
};
export const useEntityForm = <Form extends Record<string, any>, Fn>({
  initialValues,
  onSubmit,
  successNotificationTitle,
  successNotificationMessage,
  queriesToInvalidate,
}: UseEntityFormArgs<Form, Fn>) => {
  const isSubmitting = ref(false);
  const errorMessage = ref<string | null>(null);
  const errorBag = reactive({});
  const form = reactive<Form>({ ...initialValues });
  const { t } = useI18n();
  const { emit } = getCurrentInstance()!;
  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    try {
      await onSubmit(form);
      await queryClient.invalidateQueries([queriesToInvalidate]);
      emit("submitted");
      ElNotification({
        title: successNotificationTitle,
        message: successNotificationMessage,
        type: "success",
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        Object.assign(errorBag, e.errorBag);
        return;
      }
      errorMessage.value = t("errors.unknown");
    }
  };
  return {
    handleSubmit,
    isSubmitting,
    errorMessage,
    errorBag,
    form,
  };
};
