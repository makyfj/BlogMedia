import Link from "next/link";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useQuery, gql } from "@apollo/client";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

import { apolloClient } from "../lib/apolloClient";
import Spinner from "./spinner";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

const UserDropdown = () => {
  const { data, loading, error } = useQuery(ME_QUERY);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  const router = useRouter();

  const { me } = data;

  const onLogoutHandler = () => {
    if (apolloClient) {
      apolloClient.resetStore();
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  return (
    <>
      {me ? (
        <li className="flex flex-col justify-center  text-brand-500 dark:text-brand-200 capitalize rounded bg-brand-900 dark:bg-brand-100">
          <Menu>
            <Menu.Button className="w-auto px-2 font-bold text-2xl capitalize flex justify-center items-center">
              {me.name} <ChevronDownIcon className="h-8 w-8" />
            </Menu.Button>
            <Menu.Items className="flex flex-col gap-1 justify-center items-center">
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/user/${me.id}`}>
                    <a className={`${active && "bg-blue-500"}`}>Profile</a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active && "bg-blue-500"}`}
                    onClick={onLogoutHandler}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
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
    </>
  );
};

export default UserDropdown;
