import { ICars } from '../../interfaces/cars';
import { IDescriptionBlock } from '../../interfaces/descriptionBlocks';

interface DescriptionInfoCar {
    descriptionBlocks: IDescriptionBlock[];
    setDescriptionBlocks: (descriptionBlocks: IDescriptionBlock[]) => void;
    car: ICars | null;
}

export default function DescriptionInfoCar({ descriptionBlocks, setDescriptionBlocks, car }: DescriptionInfoCar) {

    const handleAddBlock = () => {
        setDescriptionBlocks([
            ...descriptionBlocks,
            {
                description: '',
            },
        ]);
    };

    const handleRemoveField = (index: number) => {
        const newblocks = descriptionBlocks.filter((block, idx) => idx !== index);
        setDescriptionBlocks(newblocks);
    };

    const handleChangeDescriptionBlocks = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBlocks = descriptionBlocks.map((block, idx) => {
            if (idx === index) {
                return {
                   ...block,
                    description: event.target.value,
                };
            }
            return block;
        });
        setDescriptionBlocks(newBlocks);
    };
    
    return (
        <div style={{ height: '200px' }}>
        {descriptionBlocks.map((block, indexBlock) => (
                <div
                    className="input-group border"
                    key={indexBlock}
                    style={{ marginBottom: '10px', position: 'relative' }}
                >
                    <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveField(indexBlock)}
                    >
                        &times;
                    </button>
                    <textarea
                        id={`textarea-${indexBlock}`}
                        placeholder="description"
                        value={block.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeDescriptionBlocks(indexBlock, e as React.ChangeEvent<HTMLTextAreaElement>)}                        
                        style={{
                            padding: '5px',
                            width: '100%',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            background: '#d2eaff',
                            resize: 'none',
                            height:'200px'
                        }}
                        required
                    />
                </div>
            ))}
            <button
                onClick={handleAddBlock}
                style={{ padding: '5px 10px', marginTop: '10px' }}
                className="action-btn btn--red"
            >
                Add description
            </button>
        </div>
    
    );
}
