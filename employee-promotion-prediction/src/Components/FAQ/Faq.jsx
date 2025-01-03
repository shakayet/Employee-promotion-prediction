import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: 'What is the purpose of this website?',
      answer:
        'This website provides a model to predict employee promotions based on various factors like performance, training, and more.',
    },
    {
      question: 'How does the prediction model work?',
      answer:
        'The model analyzes employee data and applies machine learning algorithms to predict the likelihood of promotion.',
    },
    {
      question: 'What data is required for the prediction?',
      answer:
        'We require employee data such as department, education, performance KPIs, age, awards won, and other work-related information.',
    },
    {
      question: 'Is my data secure on this platform?',
      answer:
        'Yes, we follow industry standards to ensure that all data is securely stored and processed.',
    },
  ];

  return (
    <div className="bg-white py-10 px-5 md:px-20">
      <h2 className="text-3xl font-bold text-center text-green-400 mb-10">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-lg">
            <div
              className={`flex justify-between items-center p-5 cursor-pointer ${
                activeIndex === index ? 'bg-green-300 text-white' : 'bg-gray-100'
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            <div
              className={`px-5 pt-3 pb-5 text-gray-600 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-40' : 'max-h-0 overflow-hidden'
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
