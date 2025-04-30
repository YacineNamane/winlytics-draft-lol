import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import disc from "../assets/discord.png";
import tw from "../assets/twitch.png";
import x from "../assets/x.png";

const AnimatedLink = () => {
  return (
    <span className="inline-block relative group data-span">
      <NavLink
        to="/data"
        className="text-blue-600 dark:text-blue-400 font-semibold"
      >
        <motion.div
          whileHover={{ y: -2, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block will-change-transform"
        >
          <span>Data</span>
        </motion.div>
      </NavLink>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
    </span>
  );
};

const AboutMe = () => {
  return (
    <motion.div
      className="about-container p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-2">About Me</h2>
        <p>
          Hi, I’m a freelance developer and a passionate League of Legends
          player.
        </p>
      </motion.div>
      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="socials-section"
      >
        <h2 className="text-2xl font-bold mb-2">Socials</h2>
        <div className="flex space-x-6 social-links">
          <motion.a
            href="https://discord.gg/VWxeANH3"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="social-icon"
          >
            <img src={disc} alt="Discord" className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://www.twitch.tv/ireliaa_1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="social-icon"
          >
            <img src={tw} alt="Twitch" className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://x.com/YACINN4"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="social-icon"
          >
            <img src={x} alt="X" className="w-8 h-8" />
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-2">About This Project</h2>
        <p>
          This project is something I’ve always wanted to build. A tool inspired
          by the drafting phase in League of Legends. It’s a personal and
          evolving project, built for the community. It simulates team drafts
          and calculates the average winrate based on champions selected.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-2">What's Next?</h2>
        <p>
          While it started as a simple idea, I plan to expand it into something
          more advanced and complete in the future. For now, the{" "}
          <span> Data</span> is static, but my next step is to integrate the
          Riot API to make the winrate stats more realistic and update them in
          real time. This will bring more accuracy and value to the experience,
          especially for LoL players looking to draft smarter.
        </p>
      </motion.div>

      <motion.div>
        <div style={{ fontSize: "1.6em" }}>
          {" "}
          <AnimatedLink />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
