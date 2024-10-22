import { Webhook } from "svix";
import { headers } from "next/headers";
import connectDb from "@/lib/ConnectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or ..env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;
    try {
      const db = await connectDb();
      const userCollection = db.collection("users");

      const updatedUser = await userCollection.findOneAndUpdate(
        { clerkId: id },
        {
          $set: {
            firstName: first_name,
            lastName: last_name,
            image_url: image_url,
            email: email_addresses[0].email_address,
            username: username,
          },
        },
        { returnDocument: "after", upsert: true }
      );

      return NextResponse.json(
        { message: "User created or updated successfully" },
        { status: 200 }
      );
    } catch (e) {
      console.error("Error creating or updating user:", e);
      return NextResponse.json(
        { error: "Error creating or updating user" },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.deleted") {
    try {
      const db = await connectDb();
      const userCollection = db.collection("users");

      const deletedUser = await userCollection.findOneAndDelete({
        clerkId: id,
      });

      return NextResponse.json("User is deleted", {
        status: 200,
      });
    } catch (error) {
      console.log("Error deleting user:", error);
      return NextResponse.json("Error occured", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}
