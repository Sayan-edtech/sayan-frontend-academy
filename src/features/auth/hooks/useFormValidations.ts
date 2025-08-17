import * as z from "zod";
import { signinSchema, signupSchema } from "@/validations/auth";
import type { IFormFieldsVariables } from "@/types/app";
import { Pages } from "@/constants/enums";

const useFormValidations = (props: IFormFieldsVariables) => {
  const { slug } = props;

  const getValidationSchema = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinSchema;
      case Pages.SIGNUP:
        return signupSchema;

      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
