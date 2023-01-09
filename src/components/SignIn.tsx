import type { Auth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { classNames } from "../helpers";

export function SignIn({
  className,
  auth,
}: {
  className?: string;
  auth: Auth | null | undefined;
}) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth!); // TODO: fix
  const cn = classNames(
    `ml-5 rounded-md border-2 border-black p-2`,
    className || ""
  );

  if (loading) {
    return <div className={cn}>Loading..</div>;
  }
  if (error) {
    return <div className={cn}>{`${error.cause} | ${error.message}`}</div>;
  }
  if (user) {
    return <div className={cn}>Signed in user: {user.user.displayName}</div>;
  }
  return (
    <button onClick={() => signInWithGoogle()} className={cn}>
      Sign in with Google
    </button>
  );
}
