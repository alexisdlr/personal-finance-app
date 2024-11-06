import Button from "@/components/auth/button"
import Link from "next/link"

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-xl">
      <div className="flex flex-col items-start gap-8">
        <div>
          <h1 className="text-2xl text-grey-900 font-bold">Login</h1>
        </div>
        <form className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2" />
          </div>
          <div>
            <Button type="submit" className="w-full bg-grey-900 text-white py-4 rounded-lg">Login</Button>
          </div>
        </form>
        <div className="text-sm w-full flex items-center justify-center text-grey-500">
          <p>Need to create an Account? <Link href="/sign-up" className="font-bold text-grey-900 underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage