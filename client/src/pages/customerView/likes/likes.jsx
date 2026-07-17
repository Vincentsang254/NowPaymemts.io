import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesReceived, likeUser } from "@/redux/slices/matchingSlice";
import { AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const LikesPage = () => {
  const dispatch = useDispatch();
  const { likesReceived, likesReceivedLoading, likesReceivedError, loading } = useSelector(
    (state) => state.matching
  );

  useEffect(() => {
    dispatch(getLikesReceived());
  }, [dispatch]);

  const handleLike = (userId) => {
    dispatch(likeUser(userId));
  };

  if (likesReceivedLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Likes</h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading likes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (likesReceivedError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Likes</h1>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Error Loading Likes</h3>
                <p className="text-sm text-gray-600 mt-1">{likesReceivedError}</p>
              </div>
            </div>
            <Button
              onClick={() => dispatch(getLikesReceived())}
              className="w-full mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!likesReceived || likesReceived.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Likes</h1>
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Likes Yet</h2>
            <p className="text-gray-600">
              When someone likes you, they'll appear here. Keep an eye out!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Likes</h1>
          <p className="text-gray-600">
            {likesReceived.length} {likesReceived.length === 1 ? "person" : "people"} like{
              likesReceived.length === 1 ? "s" : ""
            } you
          </p>
        </div>

        {/* Likes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likesReceived.map((like) => {
            const liker = like.liker;
            return (
              <div
                key={like.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={liker?.profilePic || "/placeholder.png"}
                    alt={liker?.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  {/* Like Badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2 animate-bounce">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {liker?.name}
                    {liker?.age && `, ${liker.age}`}
                  </h3>
                  {liker?.location && (
                    <p className="text-sm text-gray-600 mt-1">{liker.location}</p>
                  )}

                  {/* Bio Preview */}
                  {liker?.bio && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                      {liker.bio}
                    </p>
                  )}

                  {/* Interests Preview */}
                  {liker?.interests && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                      <span className="font-semibold">Interests:</span> {liker.interests}
                    </p>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={() => handleLike(liker?.id)}
                    disabled={loading}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <Heart className="w-4 h-4" />
                    Like Back
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LikesPage;
