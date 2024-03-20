import { z } from "zod";

export const createUserFormSchema=z.object({
    username:z.string().min(3,"O nome de usuário precisa ter pelo menos 3 caracteres"),
    email:z.string().min(1,"É necessario informar um email.").email("Email inválido"),
    password:z.string().min(6,"A senha precisa ter no mínimo 6 caracteres"),
    displayName:z.string().min(1,'É necessario informar um nome de exibição.'),
    checkPass:z.string()
  }).refine((data)=>data.password===data.checkPass,{
    path:['checkPass'],
    message:"As senhas não são iguais"
  })