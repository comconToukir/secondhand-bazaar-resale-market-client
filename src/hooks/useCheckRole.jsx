import { useEffect, useState } from "react";

const useCheckRole = (email) => {
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`https://secondhand-bazaar-server.vercel.app/users/role/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setRole(data.role);
          setIsRoleLoading(false);
        });
    }
  }, [email]);

  return [role, isRoleLoading];
};

export default useCheckRole;
