import { Language } from '@/type';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    languages: Language[];
    setLanguages: (languages: Language[]) => void
}

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [newLanguage, setNewLanguage] = useState<Language>({
        language: '',
        proficiency: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Language) => {
        setNewLanguage({ ...newLanguage, [field]: e.target.value })
    }

    const handleAddLanguage = () => {
        if (editIndex >= 0) {
            const updatedLanguages = [...languages];
            updatedLanguages[editIndex] = newLanguage;
            setLanguages(updatedLanguages);
            setEditIndex(-1);
        } else {
            setLanguages([...languages, newLanguage]);
        }
        setNewLanguage({
            language: '',
            proficiency: '',
        });
    }

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setNewLanguage(languages[index]);
    }

    const handleDelete = (index: number) => {
        const updatedLanguages = languages.filter((_, i) => i !== index);
        setLanguages(updatedLanguages);
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Langue'
                        value={newLanguage.language}
                        onChange={(e) => handleChange(e, 'language')}
                        className='input input-bordered w-full'
                    />
                    <select
                        value={newLanguage.proficiency}
                        onChange={(e) => handleChange(e, 'proficiency')}
                        className='select select-bordered w-full ml-4'
                    >
                        <option value="">Sélectionner la maîtrise</option>
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleAddLanguage}
                className='btn btn-primary mt-4'
            >
                {editIndex >= 0 ? 'Modifier' : 'Ajouter'}
                {editIndex >= 0 ? <Edit2 className='w-4 ml-2' /> : <Plus className='w-4 ml-2' />}
            </button>

            <div className='mt-6'>
                {languages.map((lang, index) => (
                    <div key={index} className='bg-base-200 p-4 rounded-lg mb-4'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='font-bold'>{lang.language}</h3>
                                <p className='text-sm'>{lang.proficiency}</p>
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

export default LanguageForm
