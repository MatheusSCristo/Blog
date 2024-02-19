import { z } from "zod";

export const createUserFormSchema=z.object({
    username:z.string().min(3,"O username necessita ter pelo menos 3 caracteres"),
    email:z.string().min(1).email("Email inválido"),
    password:z.string().min(6,"Precisa ter no mínimo 6 caracteres"),
    checkPass:z.string()
  }).refine((data)=>data.password===data.checkPass,{
    path:['checkPass'],
    message:"As senhas não são iguais"
  })