import React, { useState } from 'react';

const complianceQuestions = [
  {
    id: 1,
    question: 'Have you completed all required regulatory filings?',
    category: 'Regulatory',
    importance: 'Critical'
  },
  {
    id: 2,
    question: 'Do you maintain records of client communications and transactions?',
    category: 'Documentation',
    importance: 'High'
  },
  {
    id: 3,
    question: 'Is your Form ADV up to date and accurate?',
    category: 'Regulatory',
    importance: 'Critical'
  },
  {
    id: 4,
    question: 'Do you have a written compliance manual?',
    category: 'Documentation',
    importance: 'High'
  },
  {
    id: 5,
    question: 'Have you conducted annual compliance training?',
    category: 'Training',
    importance: 'Medium'
  }
];

function App() {
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no' | undefined>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, answer: 'yes' | 'no') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = () => {
    const totalQuestions = complianceQuestions.length;
    const answeredYes = Object.values(answers).filter(answer => answer === 'yes').length;
    return {
      score: (answeredYes / totalQuestions) * 100,
      compliant: answeredYes,
      nonCompliant: totalQuestions - answeredYes,
      total: totalQuestions
    };
  };

  const renderQuestion = (question: typeof complianceQuestions[0]) => (
    <div key={question.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="mb-2">
        <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
        <div className="text-sm text-gray-500">
          {question.category} • {question.importance}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => handleAnswer(question.id, 'yes')}
          className={`px-4 py-2 rounded-md transition-colors ${
            answers[question.id] === 'yes'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(question.id, 'no')}
          className={`px-4 py-2 rounded-md transition-colors ${
            answers[question.id] === 'no'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Cartwright Compliance Assessment
        </h1>
        
        {showResults ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Compliance Results</h2>
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900">
                {calculateResults().score.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Overall Compliance Score</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-xl font-semibold text-green-700">
                  {calculateResults().compliant}
                </div>
                <div className="text-sm text-green-600">Compliant Items</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-xl font-semibold text-red-700">
                  {calculateResults().nonCompliant}
                </div>
                <div className="text-sm text-red-600">Non-Compliant Items</div>
              </div>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Review Answers
            </button>
          </div>
        ) : (
          <div>
            {complianceQuestions.map(renderQuestion)}
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(answers).length !== complianceQuestions.length}
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;