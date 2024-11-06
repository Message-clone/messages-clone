import getCurrentUser from "@/app/actions/getCurrentUser";
import {  NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { pusherClient, pusherSever } from "@/app/libs/pusher";


interface IParams{
    conversationId?: string;
};

export async function POST(
    request :Request,
    {params}: {params:IParams}
){
try {
    const currentUser = await getCurrentUser();
    const {
        conversationId
    }= params;
    
    if(!currentUser?.id || !currentUser?.email){
        return new NextResponse('Unauthorized', {status:401});
    }

    const conversation = await prisma?.conversation.findUnique({
        where:{
            id:conversationId
        },
        include:{
            messages: {
                include:{
                    Seen:true
                }
            },
            users:true,
        }
    })

    if(!conversation){
        return new NextResponse('invalid ID', {status:400})
    }
    

    const lastMessage = conversation.messages[conversation.messages.length -1];
    if(!lastMessage){
        return NextResponse.json(conversation)
    }

    const updatedMessage = await prisma?.message.update({
        where: {
            id:lastMessage.id
        },
        include:{
            sender:true,
            Seen:true
        },
        data:{
            Seen:{
                connect:{
                    id:currentUser.id
                }
            }
        }
    });


    await pusherSever.trigger(currentUser.email,'conversation:update',{
        id: conversationId,
        messages:[updatedMessage]
    });

    if(lastMessage.seenIds.indexOf(currentUser.id) !== -1){
        return NextResponse.json(conversation)
    }

    await pusherSever.trigger(conversationId!,'message:update',updatedMessage)
    
    return NextResponse.json(updatedMessage)

} catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse("Internal Error", {status:500});
}
}
