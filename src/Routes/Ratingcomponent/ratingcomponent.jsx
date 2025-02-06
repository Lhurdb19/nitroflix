import { useState, useEffect } from "react";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjg4ZmY4OWRhNzc5ZGNkMWJhODY4MzRjZjljNDhkOSIsIm5iZiI6MTczNDQ3MTAxNC42MzUsInN1YiI6IjY3NjFlZDY2NDMyZDZjN2NiM2ZiNDIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3gyDXuSgVsGfNIo4EjHK4wxVXdDw7nyYAf-bU0d8S0c"; // Replace with your TMDb access token

const Ratingcomponent = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGuestSession = async () => {
      if (!localStorage.getItem("guestSessionId")) {
        const sessionId = await createGuestSession();
        localStorage.setItem("guestSessionId", sessionId);
      }
    };
    fetchGuestSession();
  }, []);

  const createGuestSession = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.guest_session_id;
    } catch (error) {
      console.error("Error creating guest session:", error);
      return null;
    }
  };

  const handleRatingSubmit = async () => {
    if (rating < 0.5 || rating > 10) {
      setMessage("Please enter a rating between 0.5 and 10.");
      return;
    }

    try {
      const guestSessionId = localStorage.getItem("guestSessionId");
      if (!guestSessionId) {
        setMessage("Error: Could not retrieve guest session.");
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ value: rating }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMessage("Rating submitted successfully!");
      } else {
        setMessage("Failed to submit rating.");
      }
    } catch (error) {
      setMessage("An error occurred while submitting the rating.");
    }
  };

  return (
    <div>
      <h3>Rate this movie</h3>
      <input
        type="number"
        min="0.5"
        max="10"
        step="0.5"
        value={rating}
        onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
      />
      <button onClick={handleRatingSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default Ratingcomponent;
