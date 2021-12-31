import React from "react";
import Link from "next/link";

interface UserDropdownProps {
  name: string;
  id: string;
}

const UserDropdown = ({ name, id }: UserDropdownProps) => {
  return (
    <>
      <Link href={`/user/${id}`}>
        <p className="bg-red-100 font-bold py-3">{name}</p>
      </Link>
    </>
  );
};

export default UserDropdown;
