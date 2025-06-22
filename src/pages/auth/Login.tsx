import FormInput from "@/components/shared/form/FormInput";
import FormInputPassword from "@/components/shared/form/FormInputPassword";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { ERoutePath } from "@/router/path.enum";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface ILoginForm {
  userName: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const formMethods = useForm<ILoginForm>({
    mode: "onChange",
    defaultValues: {
      userName: "",
      password: ""
    }
  });

  const { onLogin, setProfile } = useAuthContext();

  const onSubmit = (data: ILoginForm) => {
    const res = onLogin(data);
    if (res.code === 200) {
      setProfile({ userName: res.data?.userName || "" });
      navigate(ERoutePath.TeamList)
    } else {
      toast.warning("Bad Request", {
        description: res.message || "N/A"
      });
    }
  };

  return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <h1 className="mb-2 text-3xl font-semibold">Welcome</h1>
      <FormProvider {...formMethods}>
        <form
          noValidate
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="border shadow rounded-md p-6 w-2/3 lg:w-2/6"
        >
          <div className="flex flex-col gap-4 mb-8">
            <FormInput<ILoginForm>
              fieldName={"userName"}
              label="User Name"
              validation={{ required: "User name is required." }}
            />
            <FormInputPassword<ILoginForm>
              fieldName={"password"}
              label="Password"
              validation={{ required: "Password is required." }}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
