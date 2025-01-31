"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormfields";
import { IFormField } from "@/types/app";

const Form = () => {
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations: {},
  });

  return (
    <form>
      {getFormFields().map((field:IFormField)=>{
        return(
          <FormFields  error={{}} {...field} />
        )
      })}
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default Form;
