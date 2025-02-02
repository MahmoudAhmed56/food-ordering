"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Pages } from "@/constants/enums";
import { toast } from "@/hooks/use-toast";
import useFormFields from "@/hooks/useFormfields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

const Form = ({translations}:{translations:Translations}) => {
  const [error,setError]= useState({})
  const [isLoading,setIsLoading]= useState(false)
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations: translations,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      setIsLoading(true)
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError =JSON.parse(res?.error).validationError
        setError(validationError)
        const responseError =JSON.parse(res?.error).responseError;
        if (responseError) {
          toast({
            title:responseError,
            className:"text-destructive"
          })
        }
      }
      if (res?.ok) {
        toast({
          title: translations.messages.loginSuccessful,
          className:"text-green-400"
        })
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => {
        return (
          <div className="mb-3" key={field.id}>
            <FormFields error={error} {...field} />
          </div>
        );
      })}
      <Button disabled={isLoading} type="submit" className="w-full">
        {isLoading ? <Loader/> : translations.auth.login.submit}
      </Button>
    </form>
  );
};

export default Form;
