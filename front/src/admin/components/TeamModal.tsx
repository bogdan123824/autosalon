import { useEffect, useState } from 'react';
import '../../css/carModal.css'
import { ITeam } from '../../interfaces/team';
import ImagePreview from './ImagePreview';


interface TeamModalProps {
  team: ITeam | null;
  onClose: () => void;
  getAllTeam: () => void;
}

export default function TeamModal({ team, onClose, getAllTeam }: TeamModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(team?.title || '');
  const [description, setDescription] = useState(team?.description || '');
  const [fileName, setFileName] = useState<string | null>(null);
  
  useEffect(() => {
    if (team && team.img) {
      setFileName(team.img.split('/').pop() || null);
    }
  }, [team]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', title);
    formData.append('description', description);
    if (team) {
      formData.append('id', team.id.toString());
    }

    const url = team
      ? `${process.env.REACT_APP_DEV_URL}/updateTeam`
      : `${process.env.REACT_APP_DEV_URL}/addTeam`;

    const method = team ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to submit team');
    }

    const result = await response.json();
    console.log('team submitted successfully:', result);

    getAllTeam();
    alert('Операція пройшла успішно');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{team ? 'Edit team' : 'Add team'}</h2>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="file">Avatar:</label>
            <label className="file-label" htmlFor="file">
            {file ? file.name : fileName || 'Choose Person'}
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => {
                setFile(e.target.files ? e.target.files[0] : null);
                setFileName(e.target.files ? e.target.files[0].name : null);
              }}
              required={!team}
            />
          </div>
          { <ImagePreview
            file={file}
            handleFileRemove={() => {
              setFile(null);
              setFileName(null);
            }}
            imageUrl={fileName ? `${process.env.REACT_APP_DEV_URL}/images/team/${team?.id}/${fileName}` : undefined}
          />  }
          <div className="input-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className={team ? 'action-btn-modal edit-btn' : 'action-btn-modal btn--red'} >
              {team ? 'Update' : 'Add'}
            </button>
            <button type="button" className="action-btn-modal cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}