import { Hobby } from '@/type';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    hobbies: Hobby[];
    setHobbies: (hobbies: Hobby[]) => void
}

const HobbyForm: React.FC<Props> = ({ hobbies, setHobbies }) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [newHobby, setNewHobby] = useState<Hobby>({
        name: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Hobby) => {
        setNewHobby({ ...newHobby, [field]: e.target.value })
    }

    const handleAddHobby = () => {
        if (editIndex >= 0) {
            const updatedHobbies = [...hobbies];
            updatedHobbies[editIndex] = newHobby;
            setHobbies(updatedHobbies);
            setEditIndex(-1);
        } else {
            setHobbies([...hobbies, newHobby]);
        }
        setNewHobby({
            name: '',
        });
    }

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setNewHobby(hobbies[index]);
    }

    const handleDelete = (index: number) => {
        const updatedHobbies = hobbies.filter((_, i) => i !== index);
        setHobbies(updatedHobbies);
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <input
                    type="text"
                    placeholder='Loisir'
                    value={newHobby.name}
                    onChange={(e) => handleChange(e, 'name')}
                    className='input input-bordered w-full'
                />
            </div>

            <button
                onClick={handleAddHobby}
                className='btn btn-primary mt-4'
            >
                {editIndex >= 0 ? 'Modifier' : 'Ajouter'}
                {editIndex >= 0 ? <Edit2 className='w-4 ml-2' /> : <Plus className='w-4 ml-2' />}
            </button>

            <div className='mt-6'>
                {hobbies.map((hobby, index) => (
                    <div key={index} className='bg-base-200 p-4 rounded-lg mb-4'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='font-bold'>{hobby.name}</h3>
                            </div>
                            <div className='flex gap-2'>
                                <button 
                                    onClick={() => handleEdit(index)}
                                    className='btn btn-sm btn-ghost'
                                >
                                    <Edit2 className='w-4' />
                                </button>
                                <button 
                                    onClick={() => handleDelete(index)}
                                    className='btn btn-sm btn-ghost text-error'
                                >
                                    <Trash2 className='w-4' />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HobbyForm
