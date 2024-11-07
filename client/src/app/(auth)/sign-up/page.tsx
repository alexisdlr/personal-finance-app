import { MotionDiv } from "@/components/animated/motion-div"
import Button from "@/components/auth/button"
import Link from "next/link"

type Props = {}

const SignUp = (props: Props) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white p-8 rounded-xl">
      <div className="flex flex-col items-start gap-8">
        <div>
          <h1 className="text-2xl text-grey-900 font-bold">Sign Up</h1>
        </div>
        <form className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="font-bold text-xs text-grey-500">Name</label>
            <input type="text" name="name" className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="last" className="font-bold text-xs text-grey-500">Last Name</label>
            <input type="text" name="last" className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="font-bold text-xs text-grey-500">Email</label>
            <input type="text" name="email" className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="font-bold text-xs text-grey-500">Create password</label>
            <input type="text" name="password" className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
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