import React from "react";
import Image from "next/image";
import { babySize } from "@/libs/babySize";

interface BabySizeProps {
  week: number;
}

export const BabySize: React.FC<BabySizeProps> = ({ week }) => {
  const data = babySize[week];

  if (!data) {
    return null;
  }

  const slug = data.comparison.toLowerCase().replace(/\s+/g, "-");
  const iconSrc = `/icons/${slug}.png`;

  return (
    <section
      aria-labelledby="baby-size-title"
      aria-live="polite"
      className="p-4 border rounded-2xl bg-surface shadow-sm"
    >
      <h2
        id="baby-size-title"
        className="text-2xl font-semibold font-display mb-3 text-center"
      >
        Baby Size at Week {week}
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="space-y-4 text-center sm:text-start">
          <div>
            <p className="font-display text-muted font-medium text-base">
              Length
            </p>
            <p
              className="text-2xl font-semibold font-display"
              aria-label={`Baby length is ${data.length_cm} centimeters`}
            >
              {data.length_cm} cm
            </p>
          </div>

          <div>
            <p className="font-display text-muted font-medium text-base">
              Weight
            </p>
            <p
              className="text-2xl font-semibold font-display"
              aria-label={`Baby weight is ${data.weight_g} grams`}
            >
              {data.weight_g} g
            </p>
          </div>

          <div>
            <p className="font-display text-muted font-medium text-base">
              Development
            </p>
            <p
              className="text-xl font-semibold font-display"
              aria-label={`Development description: ${data.description}`}
            >
              {data.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 px-4">
          <p className="font-display text-muted font-medium text-base">
            Size Comparison
          </p>
          <Image
            src={iconSrc}
            alt={data.comparison}
            className="w-16 h-16"
            width={64}
            height={64}
          />
          <p
            className="text-2xl font-semibold font-display"
            aria-label={`Baby is about the size of a ${data.comparison}`}
          >
            {data.comparison}
          </p>
        </div>
      </div>

      <p
        className="mt-4 text-sm text-muted leading-relaxed"
        aria-label="Medical disclaimer"
      >
        Fetal size values are based on{" "}
        <a
          href="https://obgyn.onlinelibrary.wiley.com/doi/full/10.1002/uog.17347"
          className="text-ink underline hover:text-sky-500 transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          WHO INTERGROWTH-21st and Hadlock median
        </a>{" "}
        growth charts.
        <br />
        Every pregnancy is unique, and actual fetal size may differ
        significantly. This information is for general visual cue to help
        illustrate fetal growth. It is not a substitute for professional medical
        advice, diagnosis, or ultrasound evaluation. For any concerns about
        fetal growth or pregnancy health, please consult your midwife, GP, or
        obstetrician.
      </p>
    </section>
  );
};

export default BabySize;
