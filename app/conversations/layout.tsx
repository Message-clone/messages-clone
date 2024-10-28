import getConversation from "@/app/actions/getConversation";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversation();

  return (
    <Sidebar>
      <ConversationList initialItems={conversations} />
      <div className=" h-full">{children}</div>
    </Sidebar>
  );
}
