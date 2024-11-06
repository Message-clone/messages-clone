import { useSession } from "next-auth/react";
import { FullMessageType } from "../../../types/index";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "@/app/conversations/[conversationId]/components/ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const { data: session } = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.user?.email === data?.sender?.email;

  const seenList = (data.Seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");

  return (
    <div className={clsx("flex gap-3 p-4", isOwn && "justify-end")}>
      <div className={clsx(isOwn && "order-2")}>
        <Avatar user={data.sender} />
      </div>
      <div className={clsx("flex flex-col gap-2", isOwn && "items-end")}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {data.createdAt ? format(new Date(data.createdAt), "p") : ""}
          </div>
        </div>
        <div
          className={clsx(
            "text-sm w-fit overflow-hidden",
            isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
            data.images ? "rounded-md p-0" : "rounded-full py-2 px-3"
          )}
        >
          <ImageModal
            src={data.images}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />

          {data.images ? (
            <Image
              onClick={() => setImageModalOpen}
              src={data.images}
              alt="Image"
              width="288"
              height="288"
              className="object-cover 
              cursor-pointer
               hover:scale-110 
               transition 
               transform"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>

        {isLast && isOwn && seenList && (
          <div className="text-sm font-light text-gray-500">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
