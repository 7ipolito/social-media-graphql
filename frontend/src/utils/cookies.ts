import { cookies } from "next/headers";

export function getFormattedCookie(name:string){
  try{
    const cookieValue = cookies().get('qid');
    const encodedValue = encodeURIComponent(cookieValue!.value);
    return `${cookieValue?.name}=${encodedValue}`;
    
  }catch(err){
    return false
  }
 
}

