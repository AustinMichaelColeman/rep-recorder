import { useAuthContext } from "@/context/AuthContext";
import { handleSignout } from "@/firebase/auth/signout";

import { useRouter } from "next/navigation";

export default function HeaderBar() {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await handleSignout();
      router.push("/");
    } catch (error) {
      console.log("An error occurred during sign out", error);
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold text-light-heading dark:text-dark-heading">
          Rep Recorder
        </h1>
        <h2 className="ml-4 text-2xl font-medium text-light-heading dark:text-dark-heading">
          A workout tracking website
        </h2>
      </div>
      {user && (
        <button
          className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-colors duration-200 ease-in-out"
          onClick={handleLogout}
        >
          Sign out
        </button>
      )}
    </header>
  );
}
