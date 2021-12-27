import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ul className="flex flex-row p-2 justify-evenly">
      <li>
        <Link href="/">
          <a>
            <HomeIcon className="w-10 h-10" />
          </a>
        </Link>
      </li>
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
  );
};

export default Header;
