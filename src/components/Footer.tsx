const Footer = () => {
  return (
    <footer
      aria-label="footer"
      className="bg-surface rounded-xl max-w-full w-2xl p-4 text-center"
    >
      <p aria-label="developer credit">Developed by Farhan Noor Abir</p>
      <p
        aria-label="copyright notice"
        className="text-muted text-center border-t-2 mt-2 pt-2"
      >
        &copy; {new Date().getFullYear()} Baby Due Date Calculator. All rights
        reserved.
      </p>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
