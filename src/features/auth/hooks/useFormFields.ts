import { Pages, UserType } from "@/constants/enums";
import type { IFormField, IFormFieldsVariables } from "@/types/app";

const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const signinFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      placeholder: "••••••••",
      type: "password",
    },
  ];

  const signupFields = (): IFormField[] => [
    {
      label: "نوع الحساب",
      name: "user_type",
      type: "select",
      placeholder: "اختر نوع حسابك",
      autoFocus: true,
      options: [
        { value: UserType.STUDENT, label: "طالب" },
        { value: UserType.ACADEMY, label: "أكاديمية" },
      ],
    },
    {
      label: "صورة الملف الشخصي",
      name: "profile_picture",
      type: "image",
      placeholder: "اختر صورة شخصية",
    },
    {
      label: "الاسم",
      name: "name",
      type: "text",
      placeholder: "أدخل اسمك الكامل",
    },
    {
      label: "رقم الهاتف",
      name: "phone",
      type: "phone",
      placeholder: "أدخل رقم هاتفك",
    },
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "email",
      placeholder: "أدخل بريدك الإلكتروني",
    },
    {
      label: "كلمة المرور",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
    {
      label: "تأكيد كلمة المرور",
      name: "confirm_password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  const forgotFields = (): IFormField[] => [
    {
      label: "البريد الإلكتروني",
      name: "email",
      type: "text",
      placeholder: "أدخل بريدك الإلكتروني",
      autoFocus: true,
    },
  ];

  const resetFields = (): IFormField[] => [
    {
      label: "كلمة المرور الجديدة",
      name: "password",
      type: "password",
      placeholder: "أدخل كلمة المرور الجديدة",
      autoFocus: true,
    },
    {
      label: "تأكيد كلمة المرور",
      name: "confirm_password",
      type: "password",
      placeholder: "أعد إدخال كلمة المرور",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinFields();
      case Pages.SIGNUP:
        return signupFields();
      case Pages.FORGOT_PASSWORD:
        return forgotFields();
      case Pages.RESET_PASSWORD:
        return resetFields();

      default:
        return [];
    }
  };

  return {
    getFormFields,
  };
};

export default useFormFields;
