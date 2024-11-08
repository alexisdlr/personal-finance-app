import Image from "next/image"

type TotalSavedProps = {
  total: number
}

const TotalSaved = ({ total }: TotalSavedProps) => {
  return (
    <div className="py-4 px-8 w-full md:w-[320px] rounded-lg bg-beige-100 flex items-center gap-6 ">
      <div>
        <Image src='/images/icon-pot.svg' alt="pot" width={50} height={50} />
      </div>
      <div className="flex flex-col items-start justify-center gap-2 lg:gap-4">
        <span className="text-grey-500 md:text-base lg:text-xl">Total Saved</span>
        <span className="text-grey-900 md:text-3xl lg:text-5xl font-bold">${total}</span>
      </div>
    </div>
  )
}

export default TotalSaved