import getConversationById from "@/app/actions/getConversationById";
import getMessage from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Body from "@/app/conversations/[conversationId]/components/Body";
import Form from "@/app/conversations/[conversationId]/components/Form";
import Header from "@/app/conversations/[conversationId]/components/Heared";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessage(params.conversationId);

  const message = await getMessage(params.conversationId);

  if (!conversation) {
    return (
      <div className=" lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className=" lg:pl-80 h-full">
      <div className=" h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
