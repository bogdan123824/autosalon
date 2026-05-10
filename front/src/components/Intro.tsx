import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Intro = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref} className="intro" id="intro">
        <div className="intro__inner">
            <h1 className="intro__title">Автосалон "NewAuto"</h1>
            <div className="intro__subtitle">Пропонує найсучасніші та недорогі авто на будь-який смак</div>
            <Link to="/price" className="btn btn--red">Обрати авто</Link>
        </div>
        </div>
    )
})

export default Intro;