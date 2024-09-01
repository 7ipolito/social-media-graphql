import { cookies } from "next/headers";

export function getFormattedCookie(name:string){
  try{
    const cookieValue = cookies().get('qid');
    console.log(cookieValue)
    if(cookieValue?.value){
      const encodedValue = encodeURIComponent(cookieValue?.value);
      return `${cookieValue?.name}=${encodedValue}`;
    }

    return false
    
    
  }catch(err){
    console.log(err)
    return false
  }
 
}

