"use client"
import Button from "@/components/auth/button"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserSchemaLogin } from "@/lib/validator";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MotionDiv } from "@/components/animated/motion-div";

type Props = {}

const LoginPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchemaLogin>>({
    resolver: zodResolver(UserSchemaLogin),
  });
  const router = useRouter();
  const { mutateAsync: login } = useLogin(); // Uso del hook `useLogin`

  const onSubmit = async (data: z.infer<typeof UserSchemaLogin>) => {
    try {
      const res = await login(data); // Utiliza `login` con `mutateAsync`
      if (res.error) {
        toast.error(res.error)
        return
      }
      const mss = res.message ? res.message : ''
      toast.success(mss)
      router.push("/overview");
    } catch (error: any) {
      console.error("Login failed:", error); // Manejo de error
      toast.error(error.message);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white p-8 rounded-xl">
      <div className="flex flex-col items-start gap-8">
        <div>
          <h1 className="text-2xl text-grey-900 font-bold">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6" >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="font-bold text-xs text-grey-500">Email</label>
            <input type="text" {...register("email")} className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
            {errors.email && <p className="text-red-500 text-xs transition-all">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="font-bold text-xs text-grey-500" >Password</label>
            <input type="password" {...register("password")} className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
            {errors.password && <p className="text-red-500 text-xs transition-all">{errors.password.message}</p>}
          </div>
          <div>
            <Button type="submit" className="w-full font-semibold text-sm">Login</Button>
          </div>
        </form>
        <div className="text-sm w-full flex items-center justify-center text-grey-500">
          <p>Need to create an Account? <Link href="/sign-up" className="font-bold text-grey-900 underline">Login</Link></p>
        </div>
      </div>
    </MotionDiv>
  )
}

export default LoginPage