import { useAuthContext } from "@/context/AuthContext";
import { handleSignout } from "@/firebase/auth/signout";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-blue-500 underline dark:text-blue-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-600 transition-colors duration-200">
            Rep Recorder
          </h1>
        </Link>
        <h2 className="ml-4 text-2xl font-medium text-gray-600 dark:text-gray-300">
          A workout tracking website
        </h2>
      </div>
      {user && (
        <button
          className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 ease-in-out"
          onClick={handleLogout}
        >
          Sign out
        </button>
      )}
    </header>
  );
}
