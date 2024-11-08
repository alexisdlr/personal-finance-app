import { Pot } from '@/types/global'

type PotsProps = {
  pots: Pot[]
}

const Pots = ({pots}: PotsProps) => {
  console.log(pots, 'pots')
  return (
    <div>

    </div>
  )
}

export default Pots