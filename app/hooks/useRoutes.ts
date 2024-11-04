import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftEndOnRectangle, HiUser } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes =()=>{
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes =useMemo(() =>[
        {
            label:'Chat',
            href:'/conversations',
            icon: HiChat,
            active: pathname ==='conversations'||conversationId
        },
        {
            label: 'User',
            href:'/users',
            icon: HiUser,
            active:pathname ==='users'
        },
        {
            label:'Logout',
            href:'#',
            onClick:()=>signOut(),
            icon: HiArrowLeftEndOnRectangle
        }
    ],[ pathname,conversationId])

    return routes;
}

export default useRoutes;
