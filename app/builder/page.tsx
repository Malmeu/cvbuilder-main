"use client"
import { Eye, RotateCw, Save } from "lucide-react";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import AdBanner from '../components/AdBanner';
import { useEffect, useRef, useState } from "react";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import CVPreview from "../components/CVPreview";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import LanguageForm from "../components/LanguageForm";
import SkillForm from "../components/SkillForm";
import HobbyForm from "../components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti"

export default function Builder() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('cupcake')
  const [zoom, setZoom] = useState<number>(163)
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Initialiser la largeur
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const defaultImageUrl = '/profile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpg", { type: blob.type })

        setFile(defaultFile)

      })
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsDarkMode(['dark', 'night', 'black', 'luxury', 'dracula', 'business', 'coffee'].includes(newTheme));
  };

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]

  const handleResetPersonalDetails = () => setPersonalDetails(
    {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      photoUrl: '',
      postSeeking: '',
      description: ''
    }
  )

  const handleResetExperiences = () => setExperience([])
  const handleResetEducations = () => setEducations([])
  const handleResetLanguages = () => setLanguages([])
  const handleResetSkills = () => setSkills([])
  const handleResetHobbies = () => setHobbies([]);

  const handleResetAll = () => {
    handleResetPersonalDetails();
    handleResetExperiences();
    handleResetEducations();
    handleResetLanguages();
    handleResetSkills();
    handleResetHobbies();
    setTheme('cupcake');
    setZoom(163);
  }

  const cvPreviewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current;
    if (element) {
      try {
        // Créer une copie de l'élément pour la capture
        const clone = element.cloneNode(true) as HTMLElement;
        document.body.appendChild(clone);
        
        // Appliquer le même style que la prévisualisation
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.transform = 'none';
        clone.style.width = '210mm';
        clone.style.height = '297mm';
        clone.style.margin = '0';
        clone.style.padding = '0';
        clone.style.backgroundColor = '#ffffff';

        // Attendre que les polices soient chargées
        await document.fonts.ready;

        const canvas = await html2canvas(clone, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          imageTimeout: 0,
          removeContainer: true,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.body.firstChild as HTMLElement;
            if (clonedElement) {
              // Copier les styles calculés
              const styles = window.getComputedStyle(element);
              Array.from(styles).forEach(key => {
                clonedElement.style[key as any] = styles.getPropertyValue(key);
              });
            }
          }
        });

        // Supprimer le clone après la capture
        document.body.removeChild(clone);
        
        const imgData = canvas.toDataURL('image/png', 1.0);

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'mm',
          format: "a4",
          compress: true,
          hotfixes: ["px_scaling"]
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Ajouter l'image avec les dimensions exactes de A4
        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        
        pdf.save(`cv.pdf`);

        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        if (modal) {
          modal.close();
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999
        });

      } catch (error) {
        console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
      {/* Version Desktop */}
      <section className="hidden lg:flex flex-1">
        <div className="w-1/3 bg-base-100 p-8 overflow-y-auto">
          {/* Première publicité en haut du formulaire */}
          <AdBanner 
            slot="1234567890"
            format="auto"
            className="mb-8"
          />
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold italic">
              CV
              <span className="text-primary">Diali</span>

            </h1>

            <button className="btn btn-primary" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
              Prévisualiser
              <Eye className="w-4" />
            </button>
          </div>

          <div className="flex  flex-col gap-6 rounded-lg">

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Infos personnelles</h1>
              <button
                onClick={handleResetPersonalDetails}
                className="btn btn-primary"
              >
                <RotateCw className="w-4" />
              </button>
            </div>

            <PersonalDetailsForm
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
              file={file}
              setFile={setFile}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Expériences</h1>
              <button
                onClick={handleResetExperiences}
                className="btn btn-primary"
              >
                <RotateCw className="w-4" />
              </button>
            </div>

            <ExperienceForm
              experience={experiences}
              setExperiences={setExperience}
            />


            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Éducations</h1>
              <button
                onClick={handleResetEducations}
                className="btn btn-primary"
              >
                <RotateCw className="w-4" />
              </button>
            </div>

            <EducationForm
              educations={educations}
              setEducations={setEducations}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Langues</h1>
              <button
                onClick={handleResetLanguages}
                className="btn btn-primary"
              >
                <RotateCw className="w-4" />
              </button>
            </div>

            <LanguageForm
              languages={languages}
              setLanguages={setLanguages}
            />

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Compétences</h1>
                <button
                  onClick={handleResetSkills}
                  className="btn btn-primary"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <SkillForm skills={skills} setSkills={setSkills} />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Loisirs</h1>
                <button
                  onClick={handleResetHobbies}
                  className="btn btn-primary"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
            </div>
          </div>

        </div>

        <div className="w-2/3 bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
          {/* Contrôles en haut */}
          <div className="flex flex-col space-y-4 fixed z-[9998] top-20 right-5">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setZoom(zoom - 10)}
                className="btn"
                title="Zoom out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13 10H7" />
                </svg>
              </button>

              <span className="mx-2">{zoom}%</span>

              <button
                onClick={() => setZoom(zoom + 10)}
                className="btn"
                title="Zoom in"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10 7h4m0 0v4m0-4H7" />
                </svg>
              </button>

              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="select select-bordered z-[9999]"
              >
                {themes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <button
                onClick={handleDownloadPdf}
                className="btn btn-primary gap-2"
                title="Télécharger PDF"
              >
                <Save className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>

          {/* Aperçu du CV avec zoom */}
          <div
            className="flex justify-center items-center p-8"
            style={{
              transform: `scale(${zoom / 200})`
            }}
          >
            <div id="cv-preview" data-theme={theme}>
              <CVPreview
                personalDetails={personalDetails}
                experiences={experiences}
                educations={educations}
                languages={languages}
                skills={skills}
                hobbies={hobbies}
                theme={theme}
                file={file}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Version Mobile */}
      <section className="lg:hidden flex flex-col flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="select select-bordered z-[9999]"
            >
              {themes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="tabs tabs-boxed mb-4">
          <button className="tab tab-active">Éditer</button>
          <button className="tab" onClick={() => (document.getElementById('preview_modal') as HTMLDialogElement)?.showModal()}>
            Aperçu
          </button>
        </div>

        <div className="bg-base-100 rounded-box p-4 flex flex-col gap-4 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="badge badge-primary badge-outline">Infos personnelles</h1>
            <button onClick={handleResetPersonalDetails} className="btn btn-primary">
              <RotateCw className="w-4" />
            </button>
          </div>

          <PersonalDetailsForm
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
            file={file}
            setFile={setFile}
          />

          <div className="flex justify-between items-center">
            <h1 className="badge badge-primary badge-outline">Expériences</h1>
            <button onClick={handleResetExperiences} className="btn btn-primary">
              <RotateCw className="w-4" />
            </button>
          </div>

          <ExperienceForm experience={experiences} setExperiences={setExperience} />

          <div className="flex justify-between items-center">
            <h1 className="badge badge-primary badge-outline">Éducations</h1>
            <button onClick={handleResetEducations} className="btn btn-primary">
              <RotateCw className="w-4" />
            </button>
          </div>

          <EducationForm educations={educations} setEducations={setEducations} />

          <div className="flex justify-between items-center">
            <h1 className="badge badge-primary badge-outline">Langues</h1>
            <button onClick={handleResetLanguages} className="btn btn-primary">
              <RotateCw className="w-4" />
            </button>
          </div>

          <LanguageForm languages={languages} setLanguages={setLanguages} />

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Compétences</h1>
              <button onClick={handleResetSkills} className="btn btn-primary">
                <RotateCw className="w-4" />
              </button>
            </div>
            <SkillForm skills={skills} setSkills={setSkills} />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Loisirs</h1>
              <button onClick={handleResetHobbies} className="btn btn-primary">
                <RotateCw className="w-4" />
              </button>
            </div>
            <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
          </div>
        </div>
      </section>

      {/* Modal d'aperçu pour mobile */}
      <dialog id="preview_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-[90vh] p-4">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 relative">
              <h2 className="text-lg font-semibold">Aperçu du CV</h2>
              <div className="flex gap-2">
                <button onClick={handleDownloadPdf} className="btn btn-primary">
                  Télécharger
                  <Save className='w-4' />
                </button>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                </form>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-base-200 rounded-lg">
              <div className="transform-gpu origin-top" style={{
                transform: `scale(${windowWidth < 768 ? 0.45 : 0.6})`,
                transformOrigin: 'top center',
                margin: '0 auto'
              }}>
                <CVPreview
                  personalDetails={personalDetails}
                  file={file}
                  theme={theme}
                  experiences={experiences}
                  educations={educations}
                  languages={languages}
                  skills={skills}
                  hobbies={hobbies}
                />
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Fermer</button>
        </form>
      </dialog>

      {/* Modal de téléchargement existant */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-6xl mx-auto px-4 sm;px-6 lg:px-8">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="mt-5">
            <div className="flex justify-end mb-5">
              <button onClick={handleDownloadPdf} className="btn btn-primary">
                Télécharger
                <Save className='w-4' />
              </button>
            </div>

            <div className="w-full max-x-full overflow-auto">
              <div className="w-full max-w-full flex justify-center items-center">
                <CVPreview
                  personalDetails={personalDetails}
                  file={file}
                  theme={theme}
                  experiences={experiences}
                  educations={educations}
                  languages={languages}
                  hobbies={hobbies}
                  skills={skills}
                  download={true}
                  ref={cvPreviewRef}

                />
              </div>
            </div>

          </div>
        </div>
      </dialog>

    </div>
  );
}
