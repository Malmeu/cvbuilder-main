import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';

export const personalDetailsPreset: PersonalDetails = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123456789',
    address: '123, Avenue Example, Alger, Algerie',
    photoUrl: '/profile.jpg',
    postSeeking:'Chargé de Communication',
    description:'Présentez-vous en quelques phrases: décrivez votre parcours professionnel, vos compétences clés et vos réalisations majeures. Mentionnez vos objectifs de carrière et ce qui vous distingue des autres candidats. Soyez clair, précis et pensez à utiliser des mots-clés pertinents pour rendre votre profil attractif et professionnel. Une bonne description est la clé pour capter l’attention des recruteurs et mettre en avant votre valeur ajoutée'
    
};

export const experiencesPreset: Experience[] = [
    {
        id: 'uuid-1',
        jobTitle: 'Développeur Web',
        companyName: 'Tech Solutions',
        startDate: '2022-01-01',
        endDate: '2023-01-01',
        description: 'Développement d\'applications web en utilisant React et Node.js.'
    },
    {
        id: 'uuid-2',
        jobTitle: 'Chef de projet',
        companyName: 'Innovatech',
        startDate: '2020-06-01',
        endDate: '2022-01-01',
        description: 'Gestion de projets techniques, coordination des équipes de développement.'
    }
];

export const educationsPreset: Education[] = [
    {
        id: 'uuid-3',
        degree: 'Master en Informatique',
        school: 'Edu',
        startDate: '2015-09-01',
        endDate: '2018-06-01',
        description: 'Spécialisation en développement web et bases de données.'
    }
];

export const skillsPreset: Skill[] = [
    { id: 'uuid-4', name: 'word', level: 'Avancé' },
    { id: 'uuid-5', name: 'excel', level: 'Intermédiaire' }
];

export const languagesPreset: Language[] = [
    { id: 'uuid-6', language: 'Anglais', proficiency: 'Avancé' },
    { id: 'uuid-7', language: 'Français', proficiency: 'Débutant' }
];

export const hobbiesPreset: Hobby[] = [
    { id: 'uuid-8', name: 'Voyages' },
    { id: 'uuid-9', name: 'Lecture' }
];
