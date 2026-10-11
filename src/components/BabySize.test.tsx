import { render, screen } from "@testing-library/react";
import { BabySize } from "./BabySize";
import { babySize } from "@/libs/babySize";

const supportedWeeks = Object.keys(babySize)
  .map(Number)
  .sort((a, b) => a - b);
const firstSupportedWeek = supportedWeeks[0];
const lastSupportedWeek = supportedWeeks[supportedWeeks.length - 1];

describe("BabySize componentf", () => {
  it("renders size details for a supported week", () => {
    render(<BabySize week={12} />);

    expect(
      screen.getByRole("heading", { name: /baby size at week 12/i }),
    ).toBeInTheDocument();
  });

  it("does not crash or render size details for week below 4", () => {
    const { container } = render(<BabySize week={firstSupportedWeek - 1} />);
    expect(container.firstChild).toBeNull();
  });

  it("does not crash or render size details for week above 40", () => {
    const { container } = render(<BabySize week={lastSupportedWeek + 1} />);

    expect(container.firstChild).toBeNull();
  });

  it.each(supportedWeeks)(
    "shows all size details including image for supported week %i",
    (week) => {
      render(<BabySize week={week} />);

      const data = babySize[week];
      expect(data).toBeDefined();

      const lengthElement = screen.getByLabelText(
        new RegExp(`Baby length is ${data.length_cm} centimeters`, "i"),
      );

      expect(lengthElement).toHaveTextContent(`${data.length_cm} cm`);
      expect(
        screen.getByLabelText(
          new RegExp(`Baby weight is ${data.weight_g} grams`, "i"),
        ),
      ).toHaveTextContent(`${data.weight_g} g`);
      expect(
        screen.getByLabelText(
          new RegExp(`Development description: ${data.description}`, "i"),
        ),
      ).toHaveTextContent(data.description);
      expect(
        screen.getByLabelText(
          new RegExp(`Baby is about the size of a ${data.comparison}`, "i"),
        ),
      ).toHaveTextContent(data.comparison);

      const img = screen.getByRole("img", { name: data.comparison });
      const expectedSlug = data.comparison.toLowerCase().replace(/\s+/g, "-");
      const expectedSrc = `/icons/${expectedSlug}.png`;
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining(`url=${encodeURIComponent(expectedSrc)}`),
      );
    },
  );

  it("has week coverage for every week from first to last supported week", () => {
    const allWeeksInRange = Array.from(
      { length: lastSupportedWeek - firstSupportedWeek + 1 },
      (_, i) => firstSupportedWeek + i,
    );

    expect(supportedWeeks).toEqual(allWeeksInRange);
  });
});
