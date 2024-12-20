import { authOptions } from "@/app/libs/auth";
import { getServerSession } from "next-auth";



export default async function getSession() {
    return await getServerSession(authOptions);
    
}