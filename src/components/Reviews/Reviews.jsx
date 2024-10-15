"use client"; // Specify that this is a client component

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosCommon from "@/lib/axiosCommon";

const Reviews = () => {
  // Setting default user name
  const [name, setName] = useState("Test User");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null); // Rating will be set via emojis or other inputs
  const axiones = useAxiosCommon();

  // Mock emojis for rating
  const emojis = ["😃", "😊", "😐", "😞", "😡"];

  // useMutation for handling the form submission
  const { mutate } = useMutation({
    mutationFn: async (newReview) => {
      const response = await axiones.post(`/api/reviews/add`, newReview);
      console.log(response.data);
      return await response.data; // Assuming your API returns the created review
    },
    onSuccess: () => {
      toast.success("Review Added Successfully!");
      setReviewText(""); // Clear the form after success
      setRating(null); // Reset rating
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add review.");
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please enter your review.");
      return;
    }

    // Mutate (submit) the review
    mutate({
      name,
      reviewText,
      rating,
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <form role="form" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>

        <div className="mb-4">
          <p className="text-lg">Your Rating:</p>
          <div className="flex space-x-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                data-testid="emoji-button"
                onClick={() => setRating(index + 1)} // Rating is 1-based
                className={`text-3xl focus:outline-none ${
                  rating === index + 1 ? "bg-gray-300" : "bg-transparent"
                } rounded`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Review:</label>
          <textarea
            placeholder="please share your thoughts..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 border rounded h-24"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reviews;
