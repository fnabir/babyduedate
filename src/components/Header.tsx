const Header = () => {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-[clamp(2.25rem,8vw,4.5rem)] leading-none font-bold tracking-[-0.035em]">
        When is your baby due?
      </h1>
      <p className="text-muted lg:text-xl text-center">
        Choose how you want to count, enter one date, and see your estimated due
        date and how far along you are.
      </p>
    </div>
  );
};

Header.displayName = "Header";

export default Header;
