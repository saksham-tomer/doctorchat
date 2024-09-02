import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const apiHandler = async({phone,name,image,email,dob,lastname,address,sex,doctorid,specialization,about}: {
    phone: string,
    name: string,
    image: string,
    email: string,
    dob: string,
    lastname: string,
    address: string,
    sex: string,
    doctorid: string,
    specialization: string,
    about: string
})=>{

    const res = await fetch('http://localhost:3000/api/addDoctor',{
        method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        dob: dob,
        image: image,
        lastname: lastname,
        address: address,
        sex: sex,
        specialization: specialization,
        about: about,
        doctorid: doctorid,
        phone: phone,
    })
})
if (res){
    redirect('/doctor')
}
}