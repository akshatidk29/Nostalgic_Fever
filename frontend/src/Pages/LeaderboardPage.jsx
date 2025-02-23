import React, { useEffect, useState } from "react";
import useLeaderboardStore from "../Store/useLeaderboardStore";

const Leaderboard = () => {
  const { leaderboard, loading, error, fetchLeaderboard } = useLeaderboardStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
    setTimeout(() => setIsVisible(true), 100);
  }, [fetchLeaderboard]);

  if (loading) return <div className="text-center p-5 text-white">Loading leaderboard...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <div
        className={`bg-opacity-80 backdrop-blur-xl  rounded-2xl  p-8 max-w-3xl w-full transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
      >
        {/* ✅ Title */}
        <h2 className="text-8xl font-bold text-center mb-32 text-blue-900">Leaderboard</h2>
      
        {/* ✅ Leaderboard List */}
        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-300">No users in the leaderboard yet.</p>
        ) : (
          leaderboard.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-white/10 hover:bg-white/20 transition-all duration-300  rounded-2xl px-6 py-4 mb-4 shadow-lg border border-black"
            >
              <div className="flex items-center  gap-4">
                <span className="text-2xl font-bold rounded-xl text-blue-900">#{index + 1}</span>
                <div className="relative">
                  <img
                    src={user.profilePic || "/Profile.png"}
                    alt={user.fullname}
                    className="w-12 h-12 rounded-full border-2 object-cover border-blue-500"
                  />
                  {index < 3 && (
                    <span className="absolute -top-2 -right-2 text-xl">
                      {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                    </span>
                  )}
                </div>
                <span className="text-xl font-semibold">{user.fullname}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">{user.totalScore}</p>
                <p className="text-sm text-blue-300"> {user.streak} Day Streak 🔥</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
