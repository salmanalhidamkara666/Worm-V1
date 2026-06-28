import { useEffect, useRef, useState } from "react";
import { Shield, Code2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Security Research",
    description:
      "Penetration testing guidance, vulnerability analysis, exploit development, and advanced cybersecurity research tools.",
  },
  {
    icon: Code2,
    title: "Code Generation",
    description:
      "Full-stack development in any language. Complete, production-ready code with error handling and documentation.",
  },
  {
    icon: Sparkles,
    title: "Unrestricted Output",
    description:
      "No content filters, no topic restrictions. Generate any content you need for research, testing, or creative purposes.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for Power Users
          </h2>
          <p className="text-gray-400 text-lg">
            Enterprise-grade capabilities without the enterprise restrictions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`glass-card rounded-2xl p-8 group hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
