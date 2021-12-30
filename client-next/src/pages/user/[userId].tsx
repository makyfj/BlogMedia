import React from "react";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();

  const { userId } = router.query;

  return (
    <div>
      <h1>{userId}</h1>
    </div>
  );
};

export default UserPage;
