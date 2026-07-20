import React from "react";

const About = () => {
  return (
    <section className="min-h-screen bg-(--background-color) py-20 px-5">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-5xl font-bold text-(--primary-color)">About Us</h1>
        <p className="mt-8 text-lg text-(--text-light) max-w-3xl mx-auto leading-relaxed">
          Welcome to Craving! We are passionate about bringing the best local restaurants
          right to your doorstep. With hundreds of cuisines and dishes to choose from,
          our mission is to deliver fresh, delicious food quickly and reliably.
        </p>
      </div>
    </section>
  );
};

export default About;
