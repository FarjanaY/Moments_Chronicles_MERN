//External imports

//Internal Imports
import "./Footer.style.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <h3>...Farjana Yeasmin...</h3>
        <span>25 Aug 2023 ⒸCopyRights. All Rights Reserved.</span>
        <div className="footerIcons">
          <a
            className="footerIconLink"
            href="https://www.linkedin.com/in/farjana-yeasmin-15107923b/?locale=fr_FR"
            target="blank"
          >
            <i className="fa-brands fa-linkedin footerIcon"></i>
          </a>
          <a
            className="footerIconLink"
            href="https://www.facebook.com/profile.php?id=100007295927032"
            target="blank"
          >
            <i className="fa-brands fa-square-facebook footerIcon"></i>
          </a>
          <a
            className="footerIconLink"
            href="mailto:farjanaa.yyeasmin@gmail.com"
            target="blank"
          >
            <i className="fa-solid fa-square-envelope footerIcon"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
