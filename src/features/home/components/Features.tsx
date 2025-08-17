import HtmlRenderer from "@/components/shared/HtmlRenderer";
import RemoteImage from "@/components/shared/RemoteImage";
import type { About } from "@/types/about";
import { GraduationCap, Award } from "lucide-react";

function Features({ about }: { about: About }) {
  return (
    <section id="features" className="py-16 relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Section - Left */}
          <div className="order-last md:order-none">
            <RemoteImage
              src={about.image}
              alt={about.title}
              className="w-full h-auto rounded-lg"
              loading="lazy"
              width="600"
            />
          </div>
          {/* Text Content - Right */}
          <div className="text-right">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              <HtmlRenderer html={about.title} />
            </h2>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
              <HtmlRenderer html={about.content} />
            </p>
            <ul className="flex items-center gap-6">
              <li className="flex items-center justify-end gap-3 text-foreground">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold">
                  {about.feature_one}
                </span>
              </li>
              <li className="flex items-center justify-end gap-3 text-foreground">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold">
                  {about.feature_two}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Features;
