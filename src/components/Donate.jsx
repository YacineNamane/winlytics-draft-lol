import React from "react";
import { motion } from "framer-motion";
import Coffee from "../assets/Coffee.webp";
import ProjectSlider from "./ProjectSlider";

const Donate = () => {
  return (
    <motion.div className="contribute-pannel">
      <motion.div
        className="donate-container max-w-xl mx-auto px-4 py-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Support the Project
        </motion.h2>

        <motion.p
          className="text-gray-700 dark:text-gray-300 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          If you like what I do and want to support my work, you can contribute
          by offering me a coffee. Every little bit helps and is greatly
          appreciated!
        </motion.p>

        <motion.a
          href="https://www.buymeacoffee.com/utopiadreams"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <motion.img
            src={Coffee}
            alt="Donate"
            className="w-48 h-auto mx-auto drop-shadow-lg"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.a>
      </motion.div>

      <motion.div
        className="projects-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ProjectSlider />
      </motion.div>
    </motion.div>
  );
};

export default Donate;
