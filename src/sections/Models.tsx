import { useEffect, useRef, useState } from "react";
import { Zap, Brain, Cpu, Code2, Rocket, Crown } from "lucide-react";

const models = [
  { name: "Worm v4.0", tag: "FAST", desc: "Quick responses", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
  { name: "Worm v4.1", tag: "DEEP", desc: "Deep reasoning", icon: Brain, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { name: "Worm v4.3", tag: "SMART", desc: "Balanced performance", icon: Cpu, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  { name: "Worm-Coder", tag: "ELITE", desc: "Strong Coding Model", icon: Code2, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  { name: "Worm v5.0", tag: "SUPREME", desc: "Advanced capabilities", icon: Rocket, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
  { name: "Worm v5.1", tag: "ULTRA", desc: "Maximum power", icon: Crown, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
];

export default function Models() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            6 Powerful AI Models
          </h2>
          <p className="text-gray-400 text-lg">
            Choose the right model for your task. From fast responses to deep reasoning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model, i) => (
            <div
              key={model.name}
              className={`glass-card rounded-xl p-5 group hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${150 + i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${model.bg} flex items-center justify-center`}>
                    <model.icon className={`w-4 h-4 ${model.color}`} />
                  </div>
                  <span className="text-white font-semibold text-sm">{model.name}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${model.bg} ${model.color} ${model.border} border`}
                >
                  {model.tag}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{model.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
