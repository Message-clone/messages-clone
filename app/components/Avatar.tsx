"use client";

import useActiveList from "@/app/hooks/userActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  console.log("is active", isActive);

  return (
    <div className="relative">
      <div
        className="
      relative
      inline-block
      rounded-full
      overflow-hidden
      w-9
      h-9
      md:h-11
      md:w-11
      "
      >
        <Image
          src={user?.image || "/image/placeholder.jpg"}
          alt="Avatar"
          fill
        />
      </div>
      {isActive && (
        <span
          className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-white
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
            "
        />
      )}
    </div>
  );
};

export default Avatar;
