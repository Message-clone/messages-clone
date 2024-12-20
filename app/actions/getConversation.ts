import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

const getConversation = async ()=>{
    const currentUser = await getCurrentUser();
    
    if(!currentUser?.id){
        return[];
    }

    try{
        const conversations = await prisma.conversation.findMany({
            orderBy:{
                lastMessageAt:'desc'
            },
            where:{
                userIds:{
                    has: currentUser.id
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        sender:true,
                        Seen: true
                    }
                }
            }
        })
        return conversations;
    }catch(error:any){
        return[];
    }
}
export default getConversation;