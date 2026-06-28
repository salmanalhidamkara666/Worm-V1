import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const payAsYouGoPlans = [
  {
    name: "1 Month",
    price: "$50",
    period: "/ 1 Month Access",
    features: ["Unlimited Generations", "Live Web Search", "Standard Responses", "4 Daily File Uploads", "Full Access"],
    highlighted: false,
    badge: null as string | null,
    lifetime: false,
  },
  {
    name: "3 Months",
    price: "$110",
    period: "/ 3 Months Access",
    features: ["Unlimited Generations", "Live Web Search", "Standard Responses", "4 Daily File Uploads", "Full Access", "Priority Support"],
    highlighted: true,
    badge: "SELECTED",
    lifetime: false,
  },
  {
    name: "1 Year",
    price: "$175",
    period: "/ 1 Year Access",
    features: ["Unlimited Generations", "Live Web Search", "Faster Responses", "4 Daily File Uploads", "Full Access", "Priority Support"],
    highlighted: false,
    badge: null as string | null,
    lifetime: false,
  },
];

const subscriptionPlans = [
  {
    name: "VIP LIFETIME",
    price: "$220",
    period: "/ One-Time Payment",
    features: ["Unlimited Generations", "Faster Responses", "File & Web Search", "Unlimited File Uploads", "Agent Mode", "VSCode Integration", "Full Source Code Access"],
    highlighted: true,
    badge: "VIP LIFETIME" as string | null,
    lifetime: true,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"payg" | "sub">("payg");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const plans = tab === "payg" ? payAsYouGoPlans : subscriptionPlans;

  return (
    <section id="pricing" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-gray-400 text-lg">
            Full, unrestricted access with every plan. No hidden fees.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setTab("payg")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                tab === "payg"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Pay-as-you-go
            </button>
            <button
              onClick={() => setTab("sub")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                tab === "sub"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Subscription
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative glass-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-red-500/40 shadow-lg shadow-red-500/10"
                  : "hover:border-red-500/20"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {plan.badge ? (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full ${
                    plan.lifetime
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {plan.badge}
                </div>
              ) : null}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
