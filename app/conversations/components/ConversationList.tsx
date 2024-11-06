"use client";

import ConversationBox from "@/app/conversations/components/ConversationBox";
import GroupChatModal from "@/app/conversations/components/GroupChatModal";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

interface ConversationProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationProps> = ({
  initialItems,
  users,
}) => {
  const session = useSession();
  const [items, SetItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      SetItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      SetItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removerHandler = (conversation: FullConversationType) => {
      SetItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removerHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removerHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
      border-gray-400
      pl-
       `,
          isOpen ? "hidden " : "block w-full left-0"
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
            <div
              onClick={() => setIsModalOpen(true)}
              className="
            rounded-full
            p-2
            bg-gray-100
            text-gray-600
            cursor-pointer
            hover:opacity-75
            transition
            "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </aside>
    </>
  );
};

export default ConversationList;
