import { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
};

const EmptyState = ({
  icon,
  title,
  description,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 text-center ${className ?? ""}`}
    >
      {icon && (
        <div className="bg-gray-200 text-primary grid size-14 shrink-0 place-items-center rounded-full">
          <span className="flex size-6 items-center justify-center leading-none [&_svg]:block [&_svg]:size-6">
            {icon}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-primary text-base font-bold">{title}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
