"use client"
import * as z from "zod";

import useRegister from "@/hooks/use-register"

import Link from "next/link"
import Button from "@/components/auth/button"
import { MotionDiv } from "@/components/animated/motion-div"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchemaSignUp } from "@/lib/validator"

import toast from "react-hot-toast";

import { useRouter } from "next/navigation"
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<z.infer<typeof UserSchemaSignUp>>({
    resolver: zodResolver(UserSchemaSignUp),
  });
  const router = useRouter();

  const { mutateAsync: signUp } = useRegister(); 

  
  const onSubmit = async (data: z.infer<typeof UserSchemaSignUp>) => {
    try {
      const res = await signUp(data); // Utiliza `login` con `mutateAsync`
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
          <h1 className="text-2xl text-grey-900 font-bold">Sign Up</h1>
        </div>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="font-bold text-xs text-grey-500">Name</label>
            <input type="text" {...register("name")} className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
            {errors.name && <p className="text-red-500 text-xs transition-all">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="lastName" className="font-bold text-xs text-grey-500">Last Name</label>
            <input type="text"{...register("lastName")} className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
            {errors.lastName && <p className="text-red-500 text-xs transition-all">{errors.lastName.message}</p>}

          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="font-bold text-xs text-grey-500">Email</label>
            <input type="text" {...register("email")} className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
            {errors.email && <p className="text-red-500 text-xs transition-all">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="font-bold text-xs text-grey-500">Create password</label>
            <input type="password" {...register("password")} className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
            {errors.password && <p className="text-red-500 text-xs transition-all">{errors.password.message}</p>}
          </div>
          <div>
            <Button type="submit" className="w-full font-semibold text-sm">Create Account</Button>
          </div>
        </form>
        <div className="text-sm w-full flex items-center justify-center text-grey-500">
          <p>Already have an account? <Link href="/login" className="font-bold text-grey-900 underline">Login</Link></p>
        </div>
      </div>
    </MotionDiv>
  )
}

export default SignUp