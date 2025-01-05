"use client"
import { Eye, RotateCw, Save } from "lucide-react";
import Image from "next/image";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import CVPreview from "./components/CVPreview";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import SkillForm from "./components/SkillForm";
import HobbyForm from "./components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti"

export default function Home() {
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

  useEffect(() => {
    const defaultImageUrl = '/profile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpg", { type: blob.type })

        setFile(defaultFile)

      })
  }, [])

  useEffect(() => {
    // Appliquer le thème initial
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'night' : 'light');
  }, [isDarkMode]);

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

  const cvPreviewRef = useRef(null)

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current
    if(element){
      try {

        const canvas = await html2canvas(element , {
          scale : 3,
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
          orientation:"portrait",
          unit:'mm',
          format:"A4"
        })
        
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width 

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cv.pdf`)

        const modal = document.getElementById('my_modal_3') as HTMLDialogElement
        if(modal){
          modal.close()
        }

        confetti({
             particleCount: 100,
             spread: 70 ,
             origin: {y:0.6},
             zIndex:9999
        })

      } catch (error) {
         console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }


  return (
    <div>
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">

          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar ">
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
                  className="btn btn-primary btn-sm">
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
                  className="btn btn-primary btn-sm">
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
                  className="btn btn-primary btn-sm">
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
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <LanguageForm
                languages={languages}
                setLanguages={setLanguages}
              />

              <div className="flex justify-between">

                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Compétences</h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Loisirs</h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>



              </div>


            </div>

          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover  bg-center scrollable-preview relative">


            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5 gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none"
                title={isDarkMode ? "Mode clair" : "Mode sombre"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                )}
                <span className="ml-2">{isDarkMode ? "Mode clair" : "Mode sombre"}</span>
              </button>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none">
                  Thème: {theme}
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto mt-1">
                  {themes.map((themeName) => (
                    <li key={themeName}>
                      <button 
                        onClick={() => setTheme(themeName)}
                        className={`${themeName === theme ? 'active' : ''}`}
                      >
                        {themeName}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleResetAll}
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none"
                title="Tout réinitialiser"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Réinitialiser le CV
              </button>
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary" />
              <p className="ml-4 text-sm text-primary">{zoom}%</p>
            </div>

            <div
              className="flex justify-center items-center"
              style={{
                transform: `scale(${zoom / 200})`
              }}
            >
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}

              />
            </div>

          </div>

        </section>




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

      <div className="lg:hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Désolé, le CV Builder est uniquement accessible sur ordinateur.</h1>
              <Image
                src="/sad-sorry.gif"
                width={500}
                height={500}
                alt="Picture of the author"
                className="mx-auto my-6"
              />
              <p className="py-6">
                Pour créer et personnaliser votre CV, veuillez utiliser un ordinateur. Nous vous remercions de votre compréhension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
