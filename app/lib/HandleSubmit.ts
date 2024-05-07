"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

//    export async function handleSubmit(e) {
//     e.preventDefault()
//     const formData = new FormData(e.currentTarget)

//     const response = await fetch('/api/createUser', {
//         method: 'POST',
//         body: JSON.stringify({
//             firstname: 12,
//             lastname:  formData.get('lastname'),
//             username:  formData.get('username'),
//             password:  formData.get('password')
//         }),
// })
// }


 export const createAccount = async(formData: FormData)=>{

        const firstname = formData.get("firstname")
        const lastname = formData.get("lastname")
        const password = formData.get("password")
        const username = formData.get("username")
        const response = await fetch('http://localhost:3000/api/createUser', {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname:  lastname,
            username:  username,
            password: password ,
        }),
    })
    if (response){
        revalidatePath('/auth/sign-up')
        redirect('/patients')
    }
}