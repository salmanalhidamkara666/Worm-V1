import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What makes WormGPT different?",
    a: "WormGPT operates without the content filters and restrictions found in mainstream AI. It provides complete, unfiltered responses for security research, development, and advanced technical tasks.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Sign up and get free trial credits instantly. No credit card required. Experience the full power before committing to a plan.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major cryptocurrencies (BTC, ETH, SOL, USDT, and 100+ more) through our secure payment processor, plus manual payments via Telegram.",
  },
  {
    q: "How many AI models are available?",
    a: "6 distinct models ranging from fast responses (v4.0) to specialized coding (Worm-Coder) and ultra-powerful reasoning (v5.1). Each optimized for different use cases.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section ref={sectionRef} className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={`glass-card rounded-xl border-0 px-6 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <AccordionTrigger className="text-white text-left hover:no-underline py-5 text-sm sm:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
