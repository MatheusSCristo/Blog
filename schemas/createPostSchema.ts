import { z } from "zod";

export const createPostSchema=z.object({
    title:z.string().min(1,'É preciso informar um título para o post'),
    content:z.string().min(1,'É preciso descrever um conteúdo para o post'),
    category:z.string().min(1,'É preciso informar uma categoria para o post')
  })