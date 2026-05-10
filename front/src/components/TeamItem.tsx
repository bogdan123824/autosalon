import { ITeam } from '../interfaces/team';

export default function TeamItem(props: ITeam) {
    const { id, img, title, description } = props;
    return (
        <div className="team__item">
            <img
                className="team__photo"
                src={`${process.env.REACT_APP_DEV_URL}/${img}`}
                alt=""
            />
            <div className="team__name">{title}</div>
            <div className="team__prof">{description}</div>
        </div>
    );
}
