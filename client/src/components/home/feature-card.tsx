import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  color: string;
  Icon: LucideIcon;
};

export const FeatureCard = ({
  title,
  description,
  color,
  Icon,
}: FeatureCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl p-1 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-beige-50  hover:-translate-y-1">
      <div className="bg-chart-1 absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />

      <div className="h-full rounded-[22px] py-8 px-12">
        <div
          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}
        >
          <Icon className="size-6 text-beige-100" />
        </div>

        <h3 className="mt-8 text-3xl font-bold text-primary">{title}</h3>

        <p className="mt-4 text-grey-500 text-sm leading-relaxed">
          {description}
        </p>

        {/* <div className="mt-10 rounded-2xl bg-white/10 backdrop-blur-sm p-4">
          <div className="bg-beige-100 rounded-xl p-5">
            <div className="h-4 bg-grey-100 rounded w-2/3 mb-3" />
            <div className="h-4 bg-grey-100 rounded w-full mb-3" />
            <div className="h-4 bg-grey-100 rounded w-4/5" />
          </div>
        </div> */}
      </div>
    </div>
  );
};
