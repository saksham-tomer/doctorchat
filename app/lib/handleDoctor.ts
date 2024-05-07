import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const apiHandler = async({phone,name,image,email,dob,lastname,address,sex,doctorid,specialization,about})=>{

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