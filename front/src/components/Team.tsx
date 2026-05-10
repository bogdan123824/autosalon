import { forwardRef, useEffect, useState } from 'react';
import { ITeam } from '../interfaces/team';
import TeamItem from './TeamItem';

const Team = forwardRef<HTMLDivElement>((props, ref) => {
    const [team, setTeam] = useState<ITeam[]>([]);
    useEffect(() => {
        getSecondResponse();
    }, []);

    const getSecondResponse = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getTeam`
        );
        const dataTeam = await response.json();
        setTeam(dataTeam.data);
        return dataTeam;
    };

    return (
        <div ref={ref} className="team line" id="team">
            <div className="container">
                <h2 className="h2-auto-team">Наша команда</h2>
                <div className="team__inner">
                    {team.map((item: ITeam) => (
                        <TeamItem key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
});

export default Team;
