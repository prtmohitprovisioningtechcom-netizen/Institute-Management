"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Layers,
  Sparkles,
  Cpu,
  Monitor,
  Briefcase,
  Wrench,
} from "lucide-react";

interface CourseCategory {
  title: string;
  gradient: string;
  icon: React.ComponentType<any>;
  items: string[];
}

const categories: CourseCategory[] = [
  {
    title: "Fashion & Designing",
    gradient: "from-pink-500 to-rose-600",
    icon: Scissors,
    items: [
      "FASHION DESIGNING (DIPLOMA, DEGREE BSC)",
      "BOUTIQUE MANAGEMENT",
      "DRESS DESIGNING",
      "GARMENTS MANUFACT",
      "MEHANDI",
      "PAINTING",
      "FINE ART",
    ],
  },
  {
    title: "Interior & Crafts",
    gradient: "from-amber-500 to-orange-600",
    icon: Layers,
    items: [
      "INTERIOR DESIGNING",
      "GLASS DESIGNING",
      "GLASS ART AND OTHERS TRAINING",
      "JUTE GOODS PRODUCTS",
      "JUTE BASED OTHER TRAINING PROGRAMME",
      "KHADI PRODUCT TRAINING",
      "HANDICRAFT",
      "SOFT TOYS",
    ],
  },
  {
    title: "Leather Goods & Manufacturing",
    gradient: "from-amber-700 to-orange-950",
    icon: Wrench,
    items: [
      "LEATHER GOODS PRODUCT",
      "LEATHER STITCHING OPERATOR",
      "LEATHER SAMPLE MAKER & TRAINING",
    ],
  },
  {
    title: "Beauty & Wellness",
    gradient: "from-purple-500 to-indigo-600",
    icon: Sparkles,
    items: [
      "BEAUTICIAN",
      "MAKE UP ARTIST",
      "BEAUTY AND WELLNESS",
      "ACTING / MODELING",
    ],
  },
  {
    title: "Technical & Vocational",
    gradient: "from-teal-500 to-emerald-600",
    icon: Cpu,
    items: [
      "FITTER TRAINING PROGRAMME",
      "WELDING TRAINING PROGRAMME",
      "AC REPAIRING",
      "FREEZE REPAIRING",
      "MOBILE REPAIRING",
      "SOLAR PANEL INSTALLATION",
      "ELECTRICIAN",
    ],
  },
  {
    title: "Computer Education",
    gradient: "from-blue-500 to-cyan-600",
    icon: Monitor,
    items: [
      "COMPUTER EDUCATION",
      "COMPUTER TEACHER TRAINING",
      "JAVA",
      "AUTO CAD",
      "HARDWARE & NETWORKING",
      "WEB DESIGNING AND GRAPHICS",
      "TALLY AND ACCOUNTING",
      "FINANCIAL ACCOUNTING",
      "DESKTOP PUBLISHING",
      "INFORMATION TECHNOLOGY",
      "BASIC COURSE",
      "OFFICE AUTOMATION",
      "M S OFFICE",
      "ALL LONG & SHORT TERM COMPUTER COURSES",
    ],
  },
  {
    title: "Industrial & Skill Development",
    gradient: "from-indigo-500 to-blue-700",
    icon: Briefcase,
    items: [
      "INDUSTRIES TRAINING PROGRAMME",
      "INDUSTRIES DEVELOPMENT PROGRAMME",
      "INDUSTRIES AWARENESS PROGRAMME",
      "INDUSTRIES SEMINAR",
      "GST, INCOME TAX, UDYAM REGD., GEM, TENDER, VENDOR PROGRAMME",
      "SKILL DEVELOPMENT PROGRAMME",
    ],
  },
];

export default function SgefttCoursesList() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="bg-gradient-to-r from-[#0a0aa1] via-[#ff007f] to-indigo-600 bg-clip-text text-3xl font-extrabold uppercase tracking-tight text-transparent sm:text-4xl">
          SGEFTT List of All Courses
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-shadow hover:shadow-xl"
          >
            {/* Category Header */}
            <div className={`bg-gradient-to-r ${cat.gradient} p-5 text-white`}>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2 text-white">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-base tracking-wide uppercase">
                  {cat.title}
                </h3>
              </div>
            </div>

            {/* Course Items */}
            <div className="p-6">
              <ul className="space-y-3">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${cat.gradient}`}
                    />
                    <span className="text-sm font-semibold text-slate-700 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
