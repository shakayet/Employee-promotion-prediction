import React from 'react';
import { NavLink } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Add the carousel styles
import { Carousel } from 'react-responsive-carousel'; // Importing carousel from react-responsive-carousel
import howWork from '../assets/howWork.jpg';
import input from '../assets/input.jpg'
import predict from '../assets/predict.jpg';
import vdoFlow from '../assets/vdoFlow.mp4'

const Home = () => {

  return (
    <div>
      {/* Header Section */}
      <header className="bg-green-300 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Employee Promotion Predictor</h1>
        <p className="text-lg mt-2 text-gray-600">
          Predict the likelihood of employee promotions using advanced machine learning algorithms.
        </p>
        <NavLink to="/predict">
          <button className="mt-5 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition">
            Try Now
          </button>
        </NavLink>
      </header>

      {/* Carousel Section */}
      <section className="my-10 mx-auto max-w-6xl bg-green-100 h">
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} showArrows={true}>
          <div>
            <img src={howWork} alt="How Model Works" className="h-96 w-full object-contain" />
            {/* <p className="legend w-10">How the Model Works</p> */}
          </div>
          <div>
            <img src={input} alt="Data Input" className="h-96 w-full object-contain" />
            {/* <p className="legend">Input Your Data</p> */}
          </div>
          <div>
            <img src={predict} alt="Prediction Results" className="h-96 w-full object-contain" />
            {/* <p className="legend">See Prediction Results</p> */}
          </div>
        </Carousel>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">How Our Model Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <video className="w-full h-auto rounded-lg shadow-lg" autoPlay loop muted>
                <source src={vdoFlow} type="video/mp4" />
              </video>
            </div>
            <div>
              <p className="text-lg text-gray-600">
                Our machine learning model takes several features like the number of trainings, age, KPIs met, awards won,
                and more to predict the chances of employee promotion. The model is trained on real-world datasets and
                employs advanced classification algorithms such as Random Forest, Decision Trees, and XGBoost to generate
                accurate predictions.
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-600">
                <li>Input key employee data points.</li>
                <li>Run the prediction through our machine learning model.</li>
                <li>Get results that help HR decision-making for promotions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="my-12 mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-600">Feature 1</h3>
            <p className="mt-2 text-gray-600">
              Automatically analyzes employee data to predict promotion chances based on historical trends.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-600">Feature 2</h3>
            <p className="mt-2 text-gray-600">
              Employs robust machine learning algorithms like Random Forest and Gradient Boosting.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-600">Feature 3</h3>
            <p className="mt-2 text-gray-600">
              Provides actionable insights to HR managers for making data-driven promotion decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-300 py-10 text-center text-white">
        <h2 className="text-3xl font-bold text-black">Ready to Predict Promotions?</h2>
        <p className="mt-2 text-lg text-black">
          Get started today and see how accurate our model is for your organization's data.
        </p>
        <NavLink to="/predict">
          <button className="mt-5 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition">
            Get Started
          </button>
        </NavLink>
      </section>
    </div>
  );
};

export default Home;
