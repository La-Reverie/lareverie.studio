import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Contact() {
  const [name, setName] = useState("");
  const [Businessname, setBusinessname] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (website && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(website))
      newErrors.website = "Website is invalid";
    if (!message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (service) => {
    setServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionMessage("Sending...");

    try {
      const response = await fetch("/api/sendgrid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          Businessname,
          email,
          website,
          services,
          message,
        }),
      });

      if (response.ok) {
        setSubmissionMessage("Message sent successfully!");
        // Reset form after successful submission
        setName("");
        setBusinessname("");
        setEmail("");
        setWebsite("");
        setServices([]);
        setMessage("");
        setErrors({});
      } else {
        const errorData = await response.json();
        console.error("Sendgrid failed: ", errorData);
        setSubmissionMessage(
          `Error sending message: ${
            errorData.message || "Please try again later"
          }`
        );
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      setSubmissionMessage("Error sending message, please try again later");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmissionMessage("");
      }, 3000);
    }
  };

  return (
    <motion.section
      id="contact"
      className="bg-white relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="anchor absolute -top-24" aria-hidden="true"></div>
      <div className="container flex flex-col lg:flex-row items-center justify-center">
        {/* Contact form (left on desktop) */}
        <motion.div
          className="w-full lg:w-3/4 bg-purple-950 py-10 px-2 md:px-6"
          variants={itemVariants}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="p-6"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-white mb-1 text-base uppercase"
                >
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 rounded-sm bg-white text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-2xl ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Businessname"
                  className="block text-white mb-1 text-base uppercase"
                >
                  Business Name
                </label>
                <motion.input
                  type="text"
                  id="Businessname"
                  value={Businessname}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 rounded-sm bg-white text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-2xl ${
                    errors.Businessname ? "border-red-500" : ""
                  }`}
                />
                {errors.Businessname && (
                  <p className="text-red-500 text-sm mt-1">{errors.Businessname}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-white mb-1 text-base font-bold uppercase"
                >
                  Your Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 rounded-sm bg-white text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-2xl ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="website"
                  className="block text-white mb-1 text-base uppercase font-bold"
                >
                  Website (Optional)
                </label>
                <motion.input
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={`w-full p-3 rounded-sm bg-white text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-2xl ${
                    errors.website ? "border-red-500" : ""
                  }`}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                )}
              </div>


              <div className="mb-5 lg:col-span-2 -mt-5">
  <label className="block text-white text-base uppercase font-bold">
    What you need help with?
  </label>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
    <label className="flex items-center text-white text-base">
      <input
        type="checkbox"
        value="Development"
        checked={services.includes("Development")}
        onChange={() =>
          handleCheckboxChange("Development")
        }
        className="mr-1 text-blue-500 focus:ring-blue-500 rounded border-gray-300 bg-white"
      />
      Development
    </label>
    <label className="flex items-center text-white text-base">
      <input
        type="checkbox"
        value="Content Marketing"
        checked={services.includes("Content Marketing")}
        onChange={() => handleCheckboxChange("Content Marketing")}
        className="mr-1 text-blue-500 focus:ring-blue-500 rounded border-gray-300 bg-white"
      />
      Content Marketing
    </label>
    <label className="flex items-center text-white text-base">
      <input
        type="checkbox"
        value="Digital PR"
        checked={services.includes("Digital PR")}
        onChange={() => handleCheckboxChange("Digital PR")}
        className="mr-1 text-blue-500 focus:ring-blue-500 rounded border-gray-300 bg-white"
      />
      Digital PR
    </label>
    <label className="flex items-center text-white text-base">
      <input
        type="checkbox"
        value="Technical SEO"
        checked={services.includes("Technical SEO")}
        onChange={() => handleCheckboxChange("Technical SEO")}
        className="mr-1 text-blue-500 focus:ring-blue-500 rounded border-gray-300 bg-white"
      />
      Technical SEO
    </label>
    <label className="flex items-center text-white text-base">
      <input
        type="checkbox"
        value="Social Media"
        checked={services.includes("Social Media")}
        onChange={() => handleCheckboxChange("Social Media")}
        className="mr-1 text-blue-500 focus:ring-blue-500 rounded border-gray-300 bg-white"
      />
      Social Media
    </label>
  </div>
              </div>


              <div className="mb-3 lg:col-span-2 -mt-10">
                <label
                  htmlFor="message"
                  className="block text-white mb-1 text-base font-bold uppercase"
                >
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  value={message}
                  rows="6"
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full p-4 rounded-sm bg-white text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-xl ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <motion.div
                className="mt-4 flex justify-center lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-sm transition-all duration-200 focus:outline-none text-lg ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </motion.div>
              {submissionMessage && (
                <motion.p
                  className={`mt-4 text-center ${
                    submissionMessage.startsWith("Error")
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {submissionMessage}
                </motion.p>
              )}
            </div>
          </motion.form>
        </motion.div>
        {/* Contact info (right on desktop) */}
        <motion.div
          className="lg:w-1/2 lg:pl-10 mb-8 lg:mb-0 order-first lg:order-last m-5 md:m-0"
          variants={itemVariants}
        >
          <motion.h2
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 text-left lg:text-left"
            variants={itemVariants}
          >
            Let’s create something amazing together.
          </motion.h2>
          <div className="text-gray-800 text-base">
  {/* Email */}
  <a
    href="mailto:hello@lareverie.studio"
    className="font-bold hover:text-blue-500 transition-all duration-200 text-2xl md:text-2xl xl:text-4xl flex items-center mb-6"
  >
  [  hello@lareverie.studio ]
  </a>

  {/* Direcciones */}
  <div className="flex items-center">
    <FaMapMarkerAlt size={30} className="text-red-600 mr-4" />
    <div className="space-y-2 text-gray-900">
      <span className="block">152 Orchard St, New York, NY 10002</span>
      <span className="block">806 S Van Ness Ave, San Francisco, CA 94110</span>
      <span className="block">8447 Santa Monica Blvd, West Hollywood, CA 90069</span>
      <span className="block">Arévalo 2030, C1414CQP Cdad. Autónoma de Buenos Aires, Argentina</span>
    </div>
  </div>
</div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
