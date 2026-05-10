import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer className="footer">
    <div className="container">
        <div className="footer__inner">
            <div className="footer__block">
                <h4 className="footer__title">Місце</h4>
                <address className="footer__address">
                    <div>вул. Перемоги, 123</div>
                </address>
            </div>
            <div className="footer__block">
                <h4 className="footer__title">Про головне</h4>
                <div className="footer__text">
                    <p>Наш автосалон пропонує найкращі автомобілі світових брендів з відмінним сервісом.</p>
                </div>
            </div>
            <div className="footer__block">
                <h4 className="footer__title">Як зв'язатись з нами?</h4>
                <Link to="/connection" className="btn btn--red mini">Натисніть для зв'язку</Link>
            </div>
        </div> 
    </div> 

    <div className="copyright">
        <div className="container">
            <div className="copyright__text">
                Автор - Луговський Артем РПЗ 21 2/9. 2024 рік
            </div>
        </div>
    </div>
</footer>
    )
}