import { z } from "zod";

export const LoginUserFormSchema=z.object({
    email:z.string().min(1,'É necessário informar o email').email("Email inválido"),
    password:z.string().min(1,'É necessário informar a senha')
  })