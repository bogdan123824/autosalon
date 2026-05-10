import '../css/connection.css';

const ContactInfo: React.FC = () => {
  return (
    <div className="end-adress">
        <div className="end-adress__title">Наші контактні дані:</div>
        <div className="end-adress__line"></div>
        <div className="end-adress__text">вул. Перемоги, 123.</div>

        <div className="tel-email">
            <div className="end-adress__text">Телефон:</div>
            <a href="tel:+0123456789">+012-345-6789</a>
        </div>
        <div className="tel-email">
            <div className="end-adress__text">Ел. пошта:</div>
            <a href="mailto:newautosalon@gmail.com">newautosalon@gmail.com</a>
        </div>
    </div>
  );
};

export default ContactInfo;