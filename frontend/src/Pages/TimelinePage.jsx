import React, { useEffect, useState } from "react";
import { UseCapsuleStore } from "../Store/UseCapsuleStore";
import { UseAuthStore } from "../Store/UseAuthStore";
import Timeline from "../Components/Timeline"; // ✅ Import the Timeline Component

const TimelinePage = () => {
  const { capsules, getUserCapsules, loading } = UseCapsuleStore();
  const { authUser } = UseAuthStore();
  const [selectedCapsule, setSelectedCapsule] = useState(null); // ✅ State for selected capsule

  // ✅ Fetch user capsules on page load
  useEffect(() => {
    if (authUser) {
      getUserCapsules();
    }
  }, [authUser, getUserCapsules]);

  return (
    <div className="flex flex-col min-h-screen"> {/* ✅ Flex container with min-h-screen */}
      {/* ✅ Hero Section with Background Image */}
      <div
        className="relative w-full h-[400px] flex items-center justify-center bg-top"
        style={{
          backgroundImage: "url('/Timeline_BG.jpg')",
          backgroundSize: "100%", // Zoom out by increasing the size
          backgroundPosition: "bottom centre", // Keep the top part visible
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div> {/* ✅ Dark Overlay for contrast */}
        <h1 className="text-white text-8xl font-bold relative z-10">
          Your Time Capsules
        </h1>
      </div>

      {/* ✅ Content Wrapper (flex-grow makes sure it fills available space) */}
      <main className="flex-grow pt-12 bg-gradient-to-b from-blue-200 to-orange-200">
        {/* ✅ Show loading state while fetching capsules */}
        {loading ? (
          <p className="text-center text-indigo-300 mt-12">Loading capsules...</p>
        ) : (
          <>
            {/* ✅ Show message if no capsules exist */}
            {capsules.length === 0 ? (
              <p className="text-center text-gray-400 mt-12">No capsules found.</p>
            ) : (
              <Timeline
                capsules={capsules} // ✅ Pass capsules data
                showPublic={false} // ✅ Show private capsules by default
                setSelectedCapsule={setSelectedCapsule} // ✅ Handle selection
                show={false} // ✅ Hides Public/Private Vault heading
              />
            )}
          </>
        )}
      </main>

    </div>
  );
};

export default TimelinePage;
