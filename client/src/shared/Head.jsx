import React from 'react'
import { motion } from "framer-motion";
import { SlideUp } from '../animation/animate';

export const Head = ({title, desc, theme}) => {
  return (
    <div className="space-y-4 max-w-[550px] mb-8">
    <motion.h1
      variants={SlideUp(0.2)}
      initial="initial"
      whileInView="animate"
      className={`${
        theme == "light" ? "text-bg_grey" : "text-bg_lightest"
      } flex flex-col gap-8 h-full text-xl lg:text-4xl font-bold`}
    >
      {title}
    </motion.h1>
    <motion.p
      variants={SlideUp(0.4)}
      initial="initial"
      whileInView="animate"
      className={`${
        theme == "light" ? "text-bg_grey" : "text-bg_lightest"
      } text-gray-500 text-sm max-w-[350px]`}
    >
      {desc}
    </motion.p>
  </div>
  )
}
