import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className={` ${style.footer}`}>
      <div
        className={`d-flex py-4 px-2 justify-content-start align-items-start ${style.information}`}
      >
        <div className={`mx-2 ${style.logo}`}>
          <a>
            <h5>shop</h5>
            <h4>E.B</h4>
          </a>
        </div>
        <div className={`mx-5 ${style.help}`}>
          <h4>GET HELP</h4>
          <h5>Order Status</h5>
          <h5>Shipping and Delivery</h5>
          <h5>Returns</h5>
          <h5>Contact Us</h5>
        </div>
        <div className={`mx-5 ${style.about}`}>
          <h4>ABOUT US</h4>
          <h5>News</h5>
          <h5>Careers</h5>
          <h5>Investors</h5>
        </div>
        <div
          className={`d-flex flex-column justify-content-between align-items-center ${style.socials}`}
        >
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faYoutube} />
        </div>
      </div>
      <h6 className={style.ownerName}>All Right By Ebrahim</h6>
    </footer>
  );
};

export default Footer;
