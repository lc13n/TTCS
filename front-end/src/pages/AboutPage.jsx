import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AboutPage = () => {
  const statistics = [
    { number: "10.5k", label: "Sellers active our site", icon: "📊" },
    { number: "33k", label: "Monthly Productuct Sale", icon: "💰" },
    { number: "45.5k", label: "Customer active in our site", icon: "👥" },
    { number: "25k", label: "Anual gross sale in our site", icon: "📈" },
  ];

  const teamMembers = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
      image: "src/assets/images/tom-cruise.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Emma Watson",
      position: "Managing Director",
      image: "src/assets/images/emma-watson.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Will Smith",
      position: "Product Designer",
      image: "src/assets/images/will-smith.png",
      socials: { twitter: "#", instagram: "#", linkedin: "#" },
    },
  ];

  const services = [
    {
      icon: "🚚",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "🎧",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "💰",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">About</span>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Our Story</h1>
            <p className="text-gray-600">
              Launched in 2015, Exclusive is South Asia's premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 millions customers across the region.
            </p>
            <p className="text-gray-600">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assortment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="relative">
            <img
              src="src/assets/images/shopping-women.jpg"
              alt="Happy shoppers"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 mx-auto rounded-full mb-4 object-cover object-top"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.socials.twitter}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href={member.socials.instagram}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href={member.socials.linkedin}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
