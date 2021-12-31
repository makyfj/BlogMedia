import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, HomeIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import UserDropdown from "./userDropdown";
import Spinner from "./spinner";
import ErrorMutation from "./errorMutation";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

interface User {
  name: string;
  id: string;
}

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User>();

  const { data, refetch } = useQuery(ME_QUERY);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const onLogoutHandler = () => {};

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
    if (data) {
      setUser(data.me);
    }
    refetch();
  }, [data, refetch]);

  if (!mounted) return null;

  return (
    <div className="sticky top-0 z-50">
      <ul className="flex flex-row p-2 justify-evenly">
        <li>
          <Link href="/">
            <a>
              <HomeIcon className="w-10 h-10" />
            </a>
          </Link>
        </li>
        {user ? (
          <li>
            <UserDropdown name={user.name as string} id={user?.id} />
          </li>
        ) : (
          <li>
            <Link href="/signup">
              <a>
                <UserIcon className="w-10 h-10" />
              </a>
            </Link>
          </li>
        )}
        {theme === "dark" ? (
          <li>
            <button onClick={toggleTheme}>
              <MoonIcon className="w-10 h-10" />
            </button>
          </li>
        ) : (
          <li>
            <button onClick={toggleTheme}>
              <SunIcon className="w-10 h-10" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
