"use client";

import ConversationBox from "@/app/conversations/components/ConversationBox";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

interface ConversationProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationProps> = ({ initialItems }) => {
  const [items, SetItems] = useState(initialItems);

  const router = useRouter();

  const { conversationID, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
      fixed
      inset-y-0
      pb-20
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
      pl-
       `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5 ">
        <div className=" flex justify-between mb-4 pt-4">
          <div
            className="
          text-2xl
          font-bold
          text-neutral-800
          "
          >
            Message
          </div>
          <MdOutlineGroupAdd size={20} />
        </div>
      </div>
      {items.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationID === item.id}
        />
      ))}
    </aside>
  );
};

export default ConversationList;
