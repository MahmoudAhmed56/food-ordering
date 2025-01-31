import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";

interface Props extends IFormFieldsVariables {
  translations: any;
}
const useFormFields = ({ slug, translation }: Props) => {
  const loginFields = (): IFormField[] => [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "enter your email",
      autoFocus: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "enter your password",
    },
  ];
  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
