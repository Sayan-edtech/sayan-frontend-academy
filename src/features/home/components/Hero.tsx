import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RemoteImage from "@/components/shared/RemoteImage";
import type { Hero } from "@/types/academy";
import HtmlRenderer from "@/components/shared/HtmlRenderer";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

export default function Hero({ hero }: { hero: Hero }) {
  return (
    <section id="home" className="pt-32 md:pt-44 pb-16">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6 py-8 lg:py-16">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-foreground">
              <HtmlRenderer html={hero.title} />
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              <HtmlRenderer html={hero.description} />
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to={hero.first_link_url}
                className={`${buttonVariants({ size: "default" })} text-base`}
              >
                {hero.first_link_title}
              </Link>
              <Link
                to={hero.second_link_url}
                className={`${buttonVariants({
                  size: "default",
                  variant: "outline",
                })} text-base border border-border hover:border-primary hover:text-primary transition-colors`}
              >
                {hero.second_link_title}
              </Link>
            </div>
          </div>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <RemoteImage
              src={hero.image}
              alt={hero.title}
              loading="eager"
              className="w-full min-h-[350px] object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
