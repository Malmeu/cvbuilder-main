import { Skill } from '@/type';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    skills: Skill[];
    setSkills: (skills: Skill[]) => void
}

const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [newSkill, setNewSkill] = useState<Skill>({
        name: '',
        level: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Skill) => {
        setNewSkill({ ...newSkill, [field]: e.target.value })
    }

    const handleAddSkill = () => {
        if (editIndex >= 0) {
            const updatedSkills = [...skills];
            updatedSkills[editIndex] = newSkill;
            setSkills(updatedSkills);
            setEditIndex(-1);
        } else {
            setSkills([...skills, newSkill]);
        }
        setNewSkill({
            name: '',
            level: '',
        });
    }

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setNewSkill(skills[index]);
    }

    const handleDelete = (index: number) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Compétence'
                        value={newSkill.name}
                        onChange={(e) => handleChange(e, 'name')}
                        className='input input-bordered w-full'
                    />
                   
                </div>
            </div>

            <button
                onClick={handleAddSkill}
                className='btn btn-primary mt-4'
            >
                {editIndex >= 0 ? 'Modifier' : 'Ajouter'}
                {editIndex >= 0 ? <Edit2 className='w-4 ml-2' /> : <Plus className='w-4 ml-2' />}
            </button>

            <div className='mt-6'>
                {skills.map((skill, index) => (
                    <div key={index} className='bg-base-200 p-4 rounded-lg mb-4'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='font-bold'>{skill.name}</h3>
                                <p className='text-sm'>{skill.level}</p>
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

export default SkillForm
