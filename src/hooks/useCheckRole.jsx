import { useEffect, useState } from "react";

const useCheckRole = (email) => {
  const [role, setRole] = useState("buyer");
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRole(data.role);
          setIsRoleLoading(false);
        });
    }
  }, [email]);
  
  return [role, isRoleLoading];
};

export default useCheckRole;
