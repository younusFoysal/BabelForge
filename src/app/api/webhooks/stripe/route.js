import { stripe } from "@/lib/stripe";
import { ObjectId } from "mongodb";
import connectDb from "@/lib/ConnectDb";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await buffer(req);
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    const db = await connectDb();
    const usersCollection = db.collection("users");
    const subscriptionsCollection = db.collection("payment");

    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );

        const customerId = session.customer;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await usersCollection.findOne({
            email: customerDetails.email,
          });
          if (!user) throw new Error("User not found");

          if (!user.customerId) {
            await usersCollection.updateOne(
              { _id: user._id },
              { $set: { customerId } }
            );
          }

          const lineItems = session.line_items?.data || [];

          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";

            if (isSubscription) {
              let endDate = new Date();
              if (priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID) {
                endDate.setFullYear(endDate.getFullYear() + 1);
              } else if (
                priceId === process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
              ) {
                endDate.setMonth(endDate.getMonth() + 1);
              } else {
                throw new Error("Invalid priceId");
              }

              await subscriptionsCollection.updateOne(
                { userId: new ObjectId(user._id) },
                {
                  $set: {
                    email: customerDetails.email,
                    startDate: new Date(),
                    country: session.customer_details.address.country,
                    city: session.customer_details.address.city,
                    adress: session.customer_details.address.city,
                    zipCode: session.customer_details.address.postal_code,
                    endDate: endDate,
                    transactionId: session.invoice,
                    amount: session.amount_total / 100,
                    status: session.payment_status,
                    paymentMethod: session.payment_method_types[0],
                    plan:
                      priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
                        ? "Premium"
                        : "Standard",
                    period:
                      priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
                        ? "yearly"
                        : "monthly",
                  },
                },
                { upsert: true }
              );

              await usersCollection.updateOne(
                { _id: user._id },
                {
                  $set: {
                    plan:
                      priceId === process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
                        ? "Premium"
                        : "Standard",
                  },
                }
              );
            } else {
            }
          }
        }
        break;
      default:
      //console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}

const buffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};
