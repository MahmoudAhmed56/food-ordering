import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions = {
  providers: [Credentials({
    name:"credentials",
    credentials:{
      email:{
        label:"Email",
        type:"email",
        placeholder:"hello@example.com"
      },
      password:{
        label:"Password",
        type:"password"
      }
    },authorize:(credentials)=>{
      const user = credentials
      return {
        id:crypto.randomUUID(),
        ...user
      }
    }
  })],
};
