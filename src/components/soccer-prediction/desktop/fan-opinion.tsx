'use client';
import React, { useState } from 'react';

const FanOpinion = () => {
  const [prediction, setPrediction] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Prediction:', prediction);
    console.log('Comment:', comment);
    setPrediction('');
    setComment('');
  };

  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Fan Opinions</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Join the Conversation
          </h3>

          <div className="flex items-center mb-4">
            <div className="w-full md:w-auto flex items-center">
              <div className="mr-4 text-center">
                <div className="text-2xl font-bold">78%</div>
                <div className="text-xs text-gray-500">
                  of fans predict a Barcelona win
                </div>
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: '78%' }}
                ></div>
              </div>
              <div className="ml-4 text-center">
                <div className="text-2xl font-bold">22%</div>
                <div className="text-xs text-gray-500">
                  of fans predict a Real Madrid win
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="prediction"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Prediction
              </label>
              <select
                id="prediction"
                name="prediction"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select your prediction</option>
                <option value="barcelona">Barcelona Win</option>
                <option value="draw">Draw</option>
                <option value="real-madrid">Real Madrid Win</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-md border placeholder:text-gray-400 border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Share your thoughts on the match..."
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Submit Your Prediction
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Fan Comments
          </h3>

          <div className="space-y-4">
            {/* Comment 1 */}
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Marc87</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Barcelona Fan
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Barcelona&apos;s midfield dominance will be the key factor.
                Pedri and De Jong will control the tempo, and Lewandowski will
                find the net at least once. Prediction: 2-1 to Barça!
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Posted 2 hours ago
              </div>
            </div>

            {/* Comment 2 */}
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">MadridLegend</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Real Madrid Fan
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Real Madrid&apos;s counter-attacking ability will be too much
                for Barcelona&apos;s high defensive line. Vinícius will have a
                field day on the break. Expect a classic Real Madrid away
                performance, 1-2 to Los Blancos.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Posted 3 hours ago
              </div>
            </div>

            {/* Comment 3 */}
            <div className="border-l-4 border-gray-500 pl-4 py-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">FootballExpert23</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  Neutral
                </span>
              </div>
              <p className="text-sm text-gray-700">
                This one has draw written all over it. Both teams are in good
                form but will be cautious not to lose. The midfield battle
                between Pedri and Bellingham will be fascinating to watch.
                I&apos;m predicting a 1-1 draw.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Posted 5 hours ago
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Load More Comments
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanOpinion;
