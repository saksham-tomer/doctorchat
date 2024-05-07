
import GoogleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from '@auth/prisma-adapter'
import prisma from '@/app/lib/prisma'
import  CredentialsProvider  from 'next-auth/providers/credentials'





export const authOptions: AuthOptions={
    debug: true,
    session:{
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
        // The session token is usually either a random UUID or string, however if you
       //   // need a more customized session token string, you can define your own generate function.
      //   generateSessionToken: () => {
    //     return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
    adapter:PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile){
                let userRole = 'patient'
                if(profile?.email == "sakshamtomar2014@gmail.com"){
                    userRole = "admin"
                }
                return({
                    id: profile.sub,
                    role: userRole,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                })
            }
        }),

        //custom provider
        CredentialsProvider ({
            name:"Sign in with credentials",

            credentials: {
                // firstname: {label: "Firstname",type: "text",placeholder: "Firstname"}, 
                // lastname: {label: "Lastname",type: "text",placeholder: "Lastname"},
                username: {label: "Username",type: "text",placeholder: "name"},
                password: {label: "Password",type: "password"}
            },
            async authorize(credentials,req){
                console.log(credentials);
                //handling the login and matching the crediential if exist in db
                try {
                 const user = await prisma.patient.findUnique({
                    where: {
                        username: credentials.username,
                        password: credentials.password,
                    }
                })
                if( user) {
                    return user 
                }
                } catch (error) {
                    console.log(error);    
                }
                               return null
            }

        }),
     ],
     //Callbacks are asynchronous functions you can use to control what happens when an action is performed.
     callbacks:{
        async jwt({token,user}){
            return{...token,...user};
        },
        async session({session, token}){
            session.user.role = token.role;
            return session;
        },
     },
    pages:{
        signIn: '/auth/log-in',
        newUser: '/auth/sign-up',
     }
}