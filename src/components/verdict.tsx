import React from 'react';

interface Prediction {
  label1: string;
  value1: string | number;
  label2: string;
  value2: string | number;
}

interface VerdictProps {
  title: string;
  paragraphs: string[];
  predictions: Prediction[];
}

const Verdict: React.FC<VerdictProps> = ({
  title,
  paragraphs,
  predictions,
}) => {
  return (
    <section id="expert-prediction" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        {title}
      </h2>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        {paragraphs.map((para, index) => (
          <p className="mb-4" key={index}>
            {para}
          </p>
        ))}
      </div>

      <div className="border-2 border-green-600 rounded-lg p-4">
        <h3 className="text-lg font-bold text-green-800 mb-3">
          Final Prediction
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {predictions.map((item, index) => (
            <div key={index}>
              <div className="bg-white p-3 rounded shadow mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.label1}</span>
                  <span className="text-xl font-bold text-green-700">
                    {item.value1}
                  </span>
                </div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.label2}</span>
                  <span className="text-xl font-bold text-green-700">
                    {item.value2}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Verdict;
