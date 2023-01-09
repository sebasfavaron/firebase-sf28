import type { Auth } from "firebase/auth";
import { classNames } from "../helpers";

export function SignOut({
  className,
  auth,
}: {
  className?: string;
  auth: Auth | null | undefined;
}) {
  const cn = classNames(`w-full text-left`, className || "");

  return (
    <button onClick={() => auth?.signOut()} className={cn}>
      Sign out
    </button>
  );
}
