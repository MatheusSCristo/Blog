'use server'
 
import { revalidatePath } from 'next/cache'
 
export default async function revalidatePostsData() {
  revalidatePath('/home', 'page')
}