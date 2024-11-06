import getConversation from "@/app/actions/getConversation";
import getUsers from "@/app/actions/getUser";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversation();
  const users = await getUsers();
  return (
    <Sidebar>
      <ConversationList users={users} initialItems={conversations} />
      <div className=" h-full">{children}</div>
    </Sidebar>
  );
}
