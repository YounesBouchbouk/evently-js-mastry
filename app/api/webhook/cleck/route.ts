import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
 
export const config = {
  api: {
    bodyParser: false,
  }
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405)
  }
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;
 
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occured -- no svix headers' })
  }
 
  console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp)
  // Get the body
  const body = (await buffer(req)).toString()
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ 'Error': err })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

//   handle create user event on clerk
  if (eventType === "user.created") {
    const {id , email_addresses , image_url , first_name , last_name , username  } = evt.data

    const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName : first_name,
        lastName: last_name,
        photo: image_url
    }

    const newUser = await createUser(user)

    if (newUser) {
        await clerkClient.users.updateUserMetadata(id , {
            publicMetadata : {
                userId: newUser._id
            }
        })   
    }

    return NextResponse.json({
        message : "Ok", user : newUser
    })
    
  }

  if (eventType === 'user.updated') {
    const {id, image_url, first_name, last_name, username } = evt.data

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    }

    const updatedUser = await updateUser(id, user)

    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser(id!)

    return NextResponse.json({ message: 'OK', user: deletedUser })
  }


 
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)
 
  return res.status(200).json({ response: 'Success' })
}