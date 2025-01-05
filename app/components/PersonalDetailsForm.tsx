import { PersonalDetails } from '@/type';
import React, { useRef } from 'react'
import Image from 'next/image';

type Props = {
    personalDetails: PersonalDetails;
    setPersonalDetails: (personalDetails: PersonalDetails) => void;
    file: File | null;
    setFile: (file: File | null) => void;
}

const PersonalDetailsForm: React.FC<Props> = ({ personalDetails, setPersonalDetails, file, setFile }) => {

    const fileRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof PersonalDetails) => {
        setPersonalDetails({ ...personalDetails, [field]: e.target.value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Nom complet'
                        value={personalDetails.fullName}
                        onChange={(e) => handleChange(e, 'fullName')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Poste recherché'
                        value={personalDetails.postSeeking || ''}
                        onChange={(e) => handleChange(e, 'postSeeking')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Email'
                        value={personalDetails.email}
                        onChange={(e) => handleChange(e, 'email')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Téléphone'
                        value={personalDetails.phone}
                        onChange={(e) => handleChange(e, 'phone')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between items-center gap-4'>
                    <input
                        type="text"
                        placeholder='Adresse'
                        value={personalDetails.address}
                        onChange={(e) => handleChange(e, 'address')}
                        className='input input-bordered w-full'
                    />
                    <select
                        value={personalDetails.frameShape || 'circle'}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, frameShape: e.target.value as PersonalDetails['frameShape'] })}
                        className='select select-bordered'
                    >
                        <option value="circle">Cercle</option>
                        <option value="square">Carré</option>
                        <option value="rounded">Arrondi</option>
                        <option value="oval">Ovale</option>
                    </select>
                </div>

                <textarea
                    placeholder='Description'
                    value={personalDetails.description || ''}
                    onChange={(e) => handleChange(e, 'description')}
                    className='textarea textarea-bordered w-full'
                    rows={3}
                ></textarea>

                <div className='flex items-center gap-4'>
                    <input
                        type="file"
                        className='hidden'
                        ref={fileRef}
                        onChange={handleFileChange}
                        accept='image/*'
                    />
                    <div className="flex flex-col items-center gap-2">
                        {file && (
                            <div className="relative w-32 h-32">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Prévisualisation"
                                    width={128}
                                    height={128}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                                <button
                                    onClick={() => setFile(null)}
                                    className="absolute -top-2 -right-2 btn btn-circle btn-error btn-sm"
                                    title="Supprimer la photo"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => fileRef.current?.click()}
                            className='btn btn-primary'
                        >
                            {file ? 'Changer la photo' : 'Ajouter une photo'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetailsForm
