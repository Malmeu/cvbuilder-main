import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React from 'react'
import Image from 'next/image'
import { BriefcaseBusiness, GraduationCap, Mail, MapPinCheckInside, Phone, Star } from 'lucide-react';

type Props = {
    personalDetails: PersonalDetails;
    file: File | null;
    theme: string;
    experiences: Experience[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    download?: boolean ;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

const getStarRating = (proficiency: string) => {
    const maxStars = 5;
    let filledStars = 0;

    switch (proficiency) {
        case 'Débutant':
            filledStars = 1;
            break;
        case 'Intermédiaire':
            filledStars = 3;
            break;
        case 'Avancé':
            filledStars = 5;
            break;
        default:
            filledStars = 0;

    }
    return (
        <>
            {Array.from({ length: filledStars }, (_, index) => (
                <Star key={index} className={`text-primary `} />
            ))}
            {Array.from({ length: maxStars - filledStars }, (_, index) => (
                <Star key={index + filledStars} className="text-gray-300" />
            ))}
        </>
    );




}


const CVPreview = React.forwardRef<HTMLDivElement, Props>(({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download }, ref) => {
    // Calculer la hauteur en fonction du ratio A4 (1:1.4142)
    const width = 950;
    const height = Math.round(width * 1.4142);

    return (
        <div className={`relative`} data-theme={theme}>
            <div ref={ref} 
                className={`relative bg-base-100 flex p-16 w-[950px] shadow-lg print:shadow-none ${download ? 'mb-10' : ''}`}
                style={{ 
                    width: `${width}px`,
                    height: `${height}px`,
                    minHeight: `${height}px`
                }}
            >
                <div className='flex flex-col w-1/3'>
                    {file && (
                        <div className={`h-80 overflow-hidden border-8 border-primary ${
                            personalDetails.frameShape === 'circle' ? 'rounded-full' :
                            personalDetails.frameShape === 'square' ? '' :
                            personalDetails.frameShape === 'rounded' ? 'rounded-xl' :
                            personalDetails.frameShape === 'oval' ? 'rounded-[50%] h-72' :
                            'rounded-full' // default
                        }`}>
                            <Image
                                src={URL.createObjectURL(file)}
                                width={300}
                                height={300}
                                className={`w-full h-full object-cover ${
                                    personalDetails.frameShape === 'circle' ? 'rounded-full' :
                                    personalDetails.frameShape === 'square' ? '' :
                                    personalDetails.frameShape === 'rounded' ? 'rounded-xl' :
                                    personalDetails.frameShape === 'oval' ? 'rounded-[50%]' :
                                    'rounded-full' // default
                                }`}
                                alt="Photo de profil"
                                priority
                                onLoadingComplete={() => {
                                    if (typeof file !== 'string') {
                                        URL.revokeObjectURL(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        </div>
                    )}
                    <div className='mt-4 flex-col w-full'>
                        <div>
                            <h1 className='uppercase font-bold my-2'>
                                Contact
                            </h1>
                            <ul className='space-y-2'>
                                <li className='flex'>
                                    <div className='text-sm relative w-full' style={{
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        hyphens: 'auto'
                                    }}>
                                        <div className='ml-8'>
                                            {personalDetails.phone}
                                        </div>
                                        {personalDetails.phone && (
                                            <div className='absolute left-0 top-0'>
                                                <Phone className='w-5 text-primary' />
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <li className='flex'>
                                    <div className='text-sm relative w-full' style={{
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        hyphens: 'auto'
                                    }}>
                                        <div className='ml-8'>
                                            {personalDetails.email}
                                        </div>
                                        {personalDetails.email && (
                                            <div className='absolute left-0 top-0'>
                                                <Mail className='w-5 text-primary' />
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <li className='flex'>
                                    <div className='text-sm relative w-full' style={{
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        hyphens: 'auto'
                                    }}>
                                        <div className='ml-8'>
                                            {personalDetails.address}
                                        </div>
                                        {personalDetails.address && (
                                            <div className='absolute left-0 top-0'>
                                                <MapPinCheckInside className='w-5 text-primary' />
                                            </div>
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className='mt-6'>
                            <h1 className='uppercase font-bold my-2'>
                                Compétences
                            </h1>
                            <div className='flex flex-wrap gap-2'>
                                {skills.map((skill, index) => (
                                    <p key={index} className='badge !bg-primary !text-primary-content uppercase' style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-content)' }}>
                                        {skill.name}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h1 className='uppercase font-bold my-2'>
                                Langues
                            </h1>
                            <div className='flex flex-col space-y-2'>
                                {languages.map((lang, index) => (
                                    <div key={index}>
                                        <span
                                            className='capitalize font-semibold'
                                        >
                                            {lang.language}
                                        </span>
                                        <div className='flex mt-2'>
                                            {getStarRating(lang.proficiency)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h1 className='uppercase font-bold my-2'>
                            Hobies
                            </h1>
                            <div className='flex flex-col space-y-2'>
                                {hobbies.map((hobby, index) => (
                                    <div key={index}>
                                       <span className='capitalize'>
                                        {hobby.name}
                                       </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                <div className='w-2/3 ml-8'>

                    <div className='w-full flex flex-col space-y-4'>
                        <h1 className='uppercase text-xl font-bold'>
                            {personalDetails.fullName}
                        </h1>
                        <h2 className='uppercase text-5xl !text-primary font-bold' style={{ color: 'var(--primary)' }}>
                            {personalDetails.postSeeking}
                        </h2>
                        {personalDetails.description && (
                            <div className="text-sm mb-8">
                                <p style={{
                                    hyphens: 'auto',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    textAlign: 'justify',
                                    lineHeight: '1.5',
                                }}>
                                    {personalDetails.description}
                                </p>
                            </div>
                        )}
                    </div>

                    <section
                        className='w-full h-fit p-5'
                    >
                        <div>
                            <h1
                                className='uppercase font-bold mb-2'
                            >Experiences
                            </h1>
                            <ul className='steps steps-vertical space-y-3'>
                                {experiences.map((exp, index) => (
                                    <li className='step step-primary' key={index}>
                                        <div className='text-left'>
                                            <h2
                                                className='flex text-md uppercase font-bold'>
                                                <BriefcaseBusiness className='w-5' />
                                                <span className='ml-2'>{exp.jobTitle}</span>
                                            </h2>
                                            <div
                                                className='text-sm my-2'
                                            >
                                                <span className='badge !bg-primary !text-primary-content' style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-content)' }}>
                                                    {exp.companyName}
                                                </span>
                                                <span
                                                    className='italic ml-2'
                                                >
                                                    {formatDate(exp.startDate)} {" "}au {" "}
                                                    {formatDate(exp.endDate)}
                                                </span>

                                            </div>
                                            <p className='text-sm'>
                                                {exp.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mt-6'>
                            <h1
                                className='uppercase font-bold mb-2'
                            >Formations
                            </h1>
                            <ul className='steps steps-vertical space-y-3'>
                                {educations.map((edu, index) => (
                                    <li className='step step-primary' key={index}>
                                        <div className='text-left'>
                                            <h2
                                                className='flex text-md uppercase font-bold'>
                                                <GraduationCap className='w-5' />
                                                <span className='ml-2'>{edu.degree}</span>
                                            </h2>
                                            <div
                                                className='text-sm my-2'
                                            >
                                                <span
                                                    className='badge badge-primary'
                                                >
                                                    {edu.school}
                                                </span>
                                                <span
                                                    className='italic ml-2'
                                                >
                                                    {formatDate(edu.startDate)}{" "} au {" "}
                                                    {formatDate(edu.endDate)}
                                                </span>

                                            </div>
                                            <p className='text-sm'>
                                                {edu.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>



                    </section>
                </div>

            </div>
            {/* Div pour la marge colorée en bas */}
            <div 
                className="absolute bottom-0 left-0 right-0 bg-base-100" 
                style={{ 
                    height: `${height}px`,
                    zIndex: -1,
                    marginTop: `-${height}px`
                }}
            />
        </div>
    )
});

// Ajout du displayName pour satisfaire ESLint
CVPreview.displayName = 'CVPreview';

export default CVPreview;