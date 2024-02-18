import clsx from "clsx";
import { Loader2 } from "lucide-react";

type LoaderProps = {
  size?: number;
  className?: string;
};

export const Loader = ({ size, className }: LoaderProps) => {
  return <Loader2 size={size} className={clsx("animate-spin", className)} />;
};
