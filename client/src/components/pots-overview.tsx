import { Pot } from '@/types/global'

type PotsProps = {
  pots: Pot[]
}

type PotItemProps = {
  cat: string,
  theme: string,
  value: number
}

const PotItem = ({ cat, value, theme }: PotItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-full rounded-xl`} style={{ backgroundColor: theme }} />
      <div className="flex flex-col items-start justify-center p-2 xl:px-6 xl:pl-1 rounded-lg">
        <span className="text-grey-500 text-xs">{cat}</span>
        <span className="text-base text-grey-900 font-bold">${value}</span>
      </div>
    </div>
  )
}
const Pots = ({ pots }: PotsProps) => {
  return (
    <div className="w-full lg:w-auto grid grid-cols-2 gap-4 max-w-md mx-auto">
      {pots.slice(0, 4).map((p) => (
        <PotItem cat={p.name} value={p.total} theme={p.theme} key={p.id} />
      ))}
    </div>

  )
}

export default Pots