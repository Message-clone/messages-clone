"use client";

import useActiveChannel from "@/app/hooks/userActiveChannel";

const ActiveStatus = () => {
  useActiveChannel();
  return null;
};
export default ActiveStatus;
