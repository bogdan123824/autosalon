import { useEffect, useState } from 'react';
import '../../css/table-cars-section.css';
import TeamModal from '../components/TeamModal';
import { ITeam } from '../../interfaces/team';

export default function TeamSection() {
    const [team, setTeam] = useState<ITeam[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null);

    useEffect(() => {
        getAllTeam();
    }, []);

    const getAllTeam = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/getTeam`
        );
        const dataTeam = await response.json();
        setTeam(dataTeam.data);
        return dataTeam;
    };

    const deleteTeam = async (id: number) => {
        const params = {
            id,
        };
        const response = await fetch(
            `${process.env.REACT_APP_DEV_URL}/deleteTeam`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete team');
        }

        const result = await response.json();
        await getAllTeam();
        alert('Операція пройшла успішно');
        return result;
    };

    const handleOpenModal = (team: ITeam | null) => {
        setCurrentTeam(team);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTeam(null);
    };

    const getImgTeam = (item: ITeam) => {
        const url = item.img;
        if (url) {
            return `${process.env.REACT_APP_DEV_URL}/${url}`;
        } else {
            return '';
        }
    };

    return (
        <div className="cars-section">
            <div className="add-car-block">
                <h2 className="add-cars-text">Team</h2>
                <button
                    className="action-btn add-cars-btn btn--red"
                    onClick={() => handleOpenModal(null)}
                >
                    + add team
                </button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((item: ITeam) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <img
                                        className="img-admin"
                                        src={getImgTeam(item)}
                                        alt="Image"
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button
                                        onClick={() => deleteTeam(item.id)}
                                        className="action-btn cancel-btn"
                                    >
                                        delete
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="action-btn edit-btn"
                                    >
                                        edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {team.length === 0 && (
                            <tr>
                                <td colSpan={6}>No team found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <TeamModal
                    team={currentTeam}
                    onClose={handleCloseModal}
                    getAllTeam={getAllTeam}
                />
            )}
        </div>
    );
}
