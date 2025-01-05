import { Experience } from '@/type';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    experience: Experience[];
    setExperiences: (experience: Experience[]) => void
}

const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [newExperience, setNewExperience] = useState<Experience>({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Experience) => {
        setNewExperience({ ...newExperience, [field]: e.target.value })
    }

    const handleAddExperience = () => {
        if (editIndex >= 0) {
            const updatedExperiences = [...experience];
            updatedExperiences[editIndex] = newExperience;
            setExperiences(updatedExperiences);
            setEditIndex(-1);
        } else {
            setExperiences([...experience, newExperience]);
        }
        setNewExperience({
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    }

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setNewExperience(experience[index]);
    }

    const handleDelete = (index: number) => {
        const updatedExperiences = experience.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Nom du poste'
                        value={newExperience.jobTitle}
                        onChange={(e) => handleChange(e, 'jobTitle')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Nom de l'entreprise"
                        value={newExperience.companyName}
                        onChange={(e) => handleChange(e, 'companyName')}
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
                        value={newExperience.startDate}
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
                        value={newExperience.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>
                <textarea
                    placeholder='Description'
                    value={newExperience.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className='textarea textarea-bordered w-full'
                    rows={3}
                ></textarea>
            </div>

            <button
                onClick={handleAddExperience}
                className='btn btn-primary mt-4'
            >
                {editIndex >= 0 ? 'Modifier' : 'Ajouter'}
                {editIndex >= 0 ? <Edit2 className='w-4 ml-2' /> : <Plus className='w-4 ml-2' />}
            </button>

            <div className='mt-6'>
                {experience.map((exp, index) => (
                    <div key={index} className='bg-base-200 p-4 rounded-lg mb-4'>
                        <div className='flex justify-between items-start'>
                            <div>
                                <h3 className='font-bold'>{exp.jobTitle}</h3>
                                <p className='text-sm'>{exp.companyName}</p>
                                <p className='text-sm text-gray-500'>{exp.startDate} - {exp.endDate}</p>
                                <p className='mt-2'>{exp.description}</p>
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

export default ExperienceForm
