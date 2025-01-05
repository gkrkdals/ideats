import {ReactNode} from "react";

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <div className="px-5 py-2">
      {children}
    </div>
  );
}