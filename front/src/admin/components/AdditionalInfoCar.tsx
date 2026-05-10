import { ICars } from '../../interfaces/cars';
import { AiFillDelete } from 'react-icons/ai';
import { IAdditionalBlock } from '../../interfaces/additionalInfoCar';
interface AdditionalInfoCar {
    blocks: IAdditionalBlock[];
    setBlocks: (blocks: IAdditionalBlock[]) => void;
    car: ICars | null;
}

export default function AdditionalInfoCar({ blocks, setBlocks, car }: AdditionalInfoCar) {

    const handleAddBlock = () => {
        setBlocks([
            ...blocks,
            {
                title: '',
                characteristics: [
                    {
                        name: '',
                        value: '',
                    },
                ],
            },
        ]);
    };

    const handleAddCharacteristics = (indexBlock: number) => {
        const newBlocks = blocks.map((block, index) => {
            if (indexBlock === index) {
                return {
                    ...block,
                    characteristics: [
                        ...block.characteristics,
                        {
                            name: '',
                            value: '',
                        },
                    ],
                };
            }
            return block;
        });
        setBlocks(newBlocks);
    };

    const handleRemoveField = (index: number) => {
        const newblocks = blocks.filter((block, idx) => idx !== index);
        setBlocks(newblocks);
    };

    const handleChangeTitleBlock = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newBlocks = blocks.map((block, idx) => {
            if (idx === index) {
                return {
                   ...block,
                    title: event.target.value,
                };
            }
            return block;
        });
        setBlocks(newBlocks);
    };

    const handleRemoveCharacteristic = (indexBlock: number, indexCharacteristic: number) => {
        const newBlocks = blocks.map((block, index) => {
            if (indexBlock === index) {
                const newCharacteristics = block.characteristics.filter(
                    (characteristic, idx) => idx!== indexCharacteristic
                );
                return {
                   ...block,
                    characteristics: newCharacteristics,
                };
            }
            return block;
        });
        setBlocks(newBlocks);
    };

    const handleChangeCharacteristic = (indexBlock: number, indexCharacteristic: number, fieldName:string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newBlocks = blocks.map((block, index) => {
            if (indexBlock === index) {
                const newCharacteristics = block.characteristics.map((characteristic, idx) => {
                    if (idx === indexCharacteristic) {
                        return {
                           ...characteristic,
                           [fieldName]: event.target.value,
                        };
                    }
                    return characteristic;
                });
                return {
                   ...block,
                    characteristics: newCharacteristics,
                };
            }
            return block;
        });
        setBlocks(newBlocks);
    };

    return (
        <>
            {blocks.map((block, indexBlock) => (
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
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={block.title}
                        onChange={(e) => handleChangeTitleBlock(indexBlock, e)}
                        style={{
                            padding: '5px',
                            marginBottom: '10px',
                            width: '40%',
                            textAlign: 'center',
                        }}
                        required
                        className="small-input"
                    />
                    <div className="block-fields">
                        {block.characteristics.map((characteristic, characteristicIndex) => (
                            <div
                                key={characteristicIndex}
                                style={{ marginBottom: '10px', display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '95%' }}
                            >
                                <input
                                    type="text"
                                    placeholder={`name ${characteristicIndex}`}
                                    value={characteristic.name}
                                    onChange={(e) =>
                                        handleChangeCharacteristic(indexBlock, characteristicIndex, 'name', e)
                                    }
                                    style={{ padding: '5px', width: '50%', marginRight: '20px' }}
                                    required
                                />
                                  <input
                                    type="text"
                                    placeholder={`value ${characteristicIndex}`}
                                    value={characteristic.value}
                                    onChange={(e) =>
                                        handleChangeCharacteristic(indexBlock, characteristicIndex, 'value', e)
                                    }
                                    style={{ padding: '5px', width: '50%', marginRight: '20px' }}
                                    required
                                />
                                <AiFillDelete size="20" style={{cursor: 'pointer'}} color="black" onClick={() => handleRemoveCharacteristic(indexBlock, characteristicIndex)} />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => handleAddCharacteristics(indexBlock)}
                        style={{ padding: '5px 10px', marginTop: '10px' }}
                        className="action-btn btn--red"
                    >
                        Add a characteristic
                    </button>
                </div>
            ))}
            <button
                onClick={handleAddBlock}
                style={{ padding: '5px 10px', marginTop: '10px' }}
                className="action-btn btn--red"
            >
                Add block
            </button>
        </>
    );
}
