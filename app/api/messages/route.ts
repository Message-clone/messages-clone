import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'


export async function POST(request : Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            message,
            image,
            conversationId
        }= body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized',{status:401})
        }

        const newMessage = await prisma.message.create({
            data:{
                body: message,
                images:image,
                conversation: {
                    connect:{
                        id: conversationId
                    }
                },
                sender:{
                    connect:{
                        id: currentUser.id
                    }
                },
                Seen:{
                    connect:{
                        id: currentUser.id
                    }
                }
            },
            include:{
                Seen: true,
                sender:true,
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messages :{
                    connect :{
                        id :newMessage.id
                    }
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        Seen: true
                    }
                }
            }
        })

        return NextResponse.json(newMessage);
    } catch (error:any) {
        console.log(error,'ERROR_MESSAGES');
        return new NextResponse('InternalError', {status:500})
    }
}

