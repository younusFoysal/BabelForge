import connectDb from "@/lib/ConnectDb";

export const createOrUpdateUser = async (
  clerkId,
  first_name,
  last_name,
  image_url,
  email,
  username
) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("users");
    const user = await userCollection.insertOne({
      firstName: first_name,
      lastName: last_name,
      avatar: image_url,
      email,
      username: username,
    });
    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("users");

    const result = await userCollection.findOneAndDelete({ clerkId: id });

    if (!result.value) {
      console.log("User not found");
      return null; // Return null if user not found
    }

    return result.value; // Return the deleted user data if needed
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Consider throwing the error to handle it properly in your calling function
  }
};
