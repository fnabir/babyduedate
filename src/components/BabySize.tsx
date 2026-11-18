import React from "react";
import Image from "next/image";
import { babySize } from "@/libs/babySize";
import { ChevronRightIcon } from "@/libs/icons";

interface BabySizeProps {
  week: number;
}

export const BabySize: React.FC<BabySizeProps> = ({ week }) => {
  const data = babySize[week];
  const dataPrev = week > 1 ? babySize[week - 1] : null;
  const dataNext = week < 40 ? babySize[week + 1] : null;

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

      <div className="flex flex-col gap-4 items-center justify-between">
        <p
          className="text-lg font-semibold font-display flex items-end gap-2"
          aria-label={`Baby length is ${data.length_cm} centimeters`}
        >
          {dataPrev && (
            <span className="bg-linear-to-r from-muted/50 to-muted bg-clip-text text-transparent">
              {dataPrev.length_cm} cm
            </span>
          )}
          {dataPrev && <ChevronRightIcon className="size-5 text-muted my-1" />}
          <span className="text-center">
            <span className="font-display text-muted font-medium text-base">
              Length
            </span>
            <br />
            <span className="text-xl">{data.length_cm} cm</span>
          </span>

          {dataNext && <ChevronRightIcon className="size-5 text-muted my-1" />}
          {dataNext && (
            <span className="bg-linear-to-r to-muted/50 from-muted bg-clip-text text-transparent">
              {dataNext.length_cm} cm
            </span>
          )}
        </p>

        <p
          className="text-lg font-semibold font-display flex items-end gap-2"
          aria-label={`Baby weight is ${data.weight_g} grams`}
        >
          {dataPrev && (
            <span className="bg-linear-to-r from-muted/50 to-muted bg-clip-text text-transparent">
              {dataPrev.weight_g} g
            </span>
          )}
          {dataPrev && <ChevronRightIcon className="size-5 text-muted my-1" />}
          <span className="text-center">
            <span className="font-display text-muted font-medium text-base">
              Weight
            </span>
            <br />
            <span className="text-xl">{data.weight_g} g</span>
          </span>
          {dataNext && <ChevronRightIcon className="size-5 text-muted my-1" />}
          {dataNext && (
            <span className="bg-linear-to-r to-muted/50 from-muted bg-clip-text text-transparent">
              {dataNext.weight_g} g
            </span>
          )}
        </p>

        <p
          className="text-xs font-semibold font-display flex items-end gap-2"
          aria-label={`Development description: ${data.description}`}
        >
          {dataPrev && (
            <span className="hidden sm:block bg-linear-to-r from-muted/50 to-muted bg-clip-text text-transparent my-1.5">
              {dataPrev.description}
            </span>
          )}
          {dataPrev && (
            <ChevronRightIcon className="hidden sm:block size-5 text-muted my-1" />
          )}
          <span className="text-center">
            <span className="font-display text-muted font-medium text-sm">
              Development
            </span>
            <br />
            <span className="text-lg">{data.description}</span>
          </span>
          {dataNext && (
            <ChevronRightIcon className="hidden sm:block size-5 text-muted my-1" />
          )}
          {dataNext && (
            <span className="hidden sm:block bg-linear-to-r to-muted/50 from-muted bg-clip-text text-transparent my-1.5">
              {dataNext.description}
            </span>
          )}
        </p>

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
