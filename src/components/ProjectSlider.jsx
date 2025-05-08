import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UtopiaPreview from "../assets/UtopiaPreview.png";
import x from "../assets/x.png";
import website from "../assets/web.png";
import tiktok from "../assets/tiktok.png";
import { p } from "framer-motion/client";

const slides = [
  {
    id: 0,
    content: (
      <motion.div>
        <img
          src={UtopiaPreview}
          alt="Preview"
          className="rounded-xl mx-auto w-full max-w-xs"
        />{" "}
        <h3 style={{ height: "10%" }}> Discover UtopiaDreams</h3>
      </motion.div>
    ),
  },
  {
    id: 1,
    title: "What is UtopiaDreams?",
    content: (
      <p className="text-gray-700 dark:text-gray-300">
        A unique collection of high-quality phone wallpapers inspired by anime,
        cats, and utopian worlds. Free, handcrafted, and made with passion.
      </p>
    ),
  },
  {
    id: 2,
    title: "Follow me",
    content: (
      <div className="flex space-x-6 social-links-ud justify-center mt-4">
        <motion.p
          className="text-center text-gray-700 dark:text-gray-300 max-w-md"
          style={{ gridArea: "text" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          If you like the idea and want to stay updated, feel free to follow me
          on socials!
        </motion.p>

        <motion.a
          href="https://utopiadreams.art/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="social-icon"
          style={{ gridArea: "a1" }}
        >
          <img src={website} alt="Website" className="w-8 h-8" />
        </motion.a>

        <motion.a
          href="https://www.tiktok.com/@utopiadreams1"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="social-icon"
          style={{ gridArea: "a2" }}
        >
          <img src={tiktok} alt="Tiktok" className="w-8 h-8" />
        </motion.a>

        <motion.a
          href="https://x.com/UtopiaDrea42952"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="social-icon"
          style={{ gridArea: "a3" }}
        >
          <img src={x} alt="X" className="w-8 h-8" />
        </motion.a>
      </div>
    ),
  },
];

const ProjectSlider = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full max-w-xl mx-auto text-center py-10 single-slide">
      <div
        className="relative h-64 flex items-center justify-center overflow-hidden"
        style={{ height: "98%" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full px-4"
          >
            <h3
              className="text-xl font-bold mb-4 project-title"
              style={{ margin: "0" }}
            >
              {slides[current].title}
            </h3>
            <div className="project-content">{slides[current].content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="flex justify-center align-center gap-3 mt-6"
        style={{ height: "2%" }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index
                ? "bg-black dark:bg-white scale-125"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;
