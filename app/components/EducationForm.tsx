import { Education } from '@/type';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    educations: Education[];
    setEducations: (educations: Education[]) => void
}

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [newEducation, setNewEducation] = useState<Education>({
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Education) => {
        setNewEducation({ ...newEducation, [field]: e.target.value })
    }

    const handleAddEducation = () => {
        if (editIndex >= 0) {
            const updatedEducations = [...educations];
            updatedEducations[editIndex] = newEducation;
            setEducations(updatedEducations);
            setEditIndex(-1);
        } else {
            setEducations([...educations, newEducation]);
        }
        setNewEducation({
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    }

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setNewEducation(educations[index]);
    }

    const handleDelete = (index: number) => {
        const updatedEducations = educations.filter((_, i) => i !== index);
        setEducations(updatedEducations);
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='École'
                        value={newEducation.school}
                        onChange={(e) => handleChange(e, 'school')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Diplôme'
                        value={newEducation.degree}
                        onChange={(e) => handleChange(e, 'degree')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Date de début'
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newEducation.startDate}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Date de fin'
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newEducation.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>
                <textarea
                    placeholder='Description'
                    value={newEducation.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className='textarea textarea-bordered w-full'
                    rows={3}
                ></textarea>
            </div>

            <button
                onClick={handleAddEducation}
                className='btn btn-primary mt-4'
            >
                {editIndex >= 0 ? 'Modifier' : 'Ajouter'}
                {editIndex >= 0 ? <Edit2 className='w-4 ml-2' /> : <Plus className='w-4 ml-2' />}
            </button>

            <div className='mt-6'>
                {educations.map((edu, index) => (
                    <div key={index} className='bg-base-200 p-4 rounded-lg mb-4'>
                        <div className='flex justify-between items-start'>
                            <div>
                                <h3 className='font-bold'>{edu.school}</h3>
                                <p className='text-sm'>{edu.degree}</p>
                                <p className='text-sm text-gray-500'>{edu.startDate} - {edu.endDate}</p>
                                <p className='mt-2'>{edu.description}</p>
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

export default EducationForm
