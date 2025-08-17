import FAQs from "../features/home/components/faqs";
import Features from "../features/home/components/Features";
import Hero from "../features/home/components/Hero";
import Testimonials from "../features/home/components/Testimonials";
import { motion } from "framer-motion";
import Courses from "../features/home/components/Courses";
import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "@/components/shared/Layout";
import "swiper/css";
import "swiper/css/navigation";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Home() {
  const { academyInfo } = useOutletContext<OutletContext>();
  return (
    <main className="bg-[rgb(249_250_251)]">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Hero hero={academyInfo?.data.hero} />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Features about={academyInfo.data.about} />
      </motion.div>
      {academyInfo.data.courses.length > 0 && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Courses />
        </motion.div>
      )}
      {academyInfo.data.faqs.length > 0 && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Testimonials opinions={academyInfo.data.opinions} />
        </motion.div>
      )}
      {academyInfo.data.faqs.length > 0 && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQs faqs={academyInfo.data.faqs} />
        </motion.div>
      )}
    </main>
  );
}

export default Home;
