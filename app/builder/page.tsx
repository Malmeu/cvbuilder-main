"use client"
import { Eye, RotateCw, Save } from "lucide-react";
import PersonalDetailsForm from "../components/PersonalDetailsForm";

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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation";
import { useToast } from '@/hooks/use-toast';

export default function Builder() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('cupcake')
  const [zoom, setZoom] = useState<number>(163)
  const [experiences, setExperiences] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
          console.error('Erreur lors de la vérification de la session:', error)
          router.push('/auth/signin')
          return
        }

        setUser(session.user)
        setLoading(false)

        // Charger le CV existant si on a un ID
        const params = new URLSearchParams(window.location.search)
        const cvId = params.get('id')
        if (cvId) {
          const { data: cv, error: cvError } = await supabase
            .from('user_cvs')
            .select('*')
            .eq('id', cvId)
            .single()

          if (cvError) {
            console.error('Erreur lors du chargement du CV:', cvError)
            toast({
              title: 'Erreur',
              description: 'Impossible de charger le CV',
              variant: 'destructive',
            })
            return
          }

          if (cv) {
            setPersonalDetails(cv.data.personalInfo)
            setExperiences(cv.data.experience || [])
            setEducations(cv.data.education || [])
            setSkills(cv.data.skills || [])
            setLanguages(cv.data.languages || [])
            setHobbies(cv.data.hobbies || [])
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
        router.push('/auth/signin')
      }
    }

    checkAuth()

    // Gestionnaire pour la largeur de la fenêtre
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [router])

  useEffect(() => {
    const defaultImageUrl = '/profile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpg", { type: blob.type })

        setFile(defaultFile)

      })
  }, [])

  const loadExistingCV = async () => {
    try {
      if (!user) return

      // Récupérer l'ID du CV depuis l'URL
      const params = new URLSearchParams(window.location.search)
      const cvId = params.get('id')
      
      if (!cvId) return

      // Récupérer les données du CV
      const { data: cv, error } = await supabase
        .from('user_cvs')
        .select('*')
        .eq('id', cvId)
        .single()

      if (error) {
        console.error('Erreur lors du chargement du CV:', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger le CV',
          variant: 'destructive',
        })
        return
      }

      if (!cv) {
        toast({
          title: 'Erreur',
          description: 'CV non trouvé',
          variant: 'destructive',
        })
        return
      }

      // Mettre à jour l'état avec les données du CV
      setPersonalDetails(cv.data.personalInfo)
      setExperiences(cv.data.experience || [])
      setEducations(cv.data.education || [])
      setSkills(cv.data.skills || [])
      setLanguages(cv.data.languages || [])
      setHobbies(cv.data.hobbies || [])

      console.log('CV chargé avec succès:', cv)
    } catch (error: any) {
      console.error('Erreur lors du chargement:', error)
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de charger le CV',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
          console.error('Erreur de session:', error)
          toast({
            title: 'Erreur',
            description: 'Veuillez vous connecter pour continuer',
            variant: 'destructive',
          })
          router.push('/auth/signin')
          return
        }

        setUser(session.user)
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
        router.push('/auth/signin')
      }
    }

    checkUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/auth/signin')
      } else {
        setUser(session.user)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
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

  const handleResetExperiences = () => setExperiences([])
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

  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = cvRef.current;
    if (!element) return;

    try {
      // Obtenir l'élément parent qui contient la marge
      const parentElement = element.parentElement;
      if (!parentElement) return;

      // Créer un conteneur temporaire
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.setAttribute('data-theme', theme);
      container.style.backgroundColor = getComputedStyle(parentElement).backgroundColor;
      document.body.appendChild(container);

      // Cloner l'élément parent complet (qui inclut la marge)
      const clone = parentElement.cloneNode(true) as HTMLElement;
      container.appendChild(clone);

      // Attendre le chargement des polices et images
      await Promise.all([
        document.fonts.ready,
        ...Array.from(clone.getElementsByTagName('img')).map(
          img => new Promise((resolve) => {
            if (img.complete) resolve(null);
            else img.onload = () => resolve(null);
          })
        )
      ]);

      // Configurer html2canvas avec une haute qualité
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: getComputedStyle(parentElement).backgroundColor,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.body.firstChild as HTMLElement;
          if (clonedElement) {
            clonedElement.style.backgroundColor = getComputedStyle(parentElement).backgroundColor;
          }
        },
        logging: false
      });

      // Nettoyer
      document.body.removeChild(container);

      // Créer le PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });

      // Calculer les dimensions en préservant le ratio
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculer le ratio d'aspect de l'original
      const originalRatio = canvas.width / canvas.height;
      const pdfRatio = pdfWidth / pdfHeight;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth / originalRatio;
      
      // Si la hauteur calculée dépasse la page, ajuster en fonction de la hauteur
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * originalRatio;
      }
      
      // Centrer horizontalement si nécessaire
      const xOffset = (pdfWidth - finalWidth) / 2;
      
      // Ajouter l'image en préservant le ratio
      pdf.addImage(imgData, 'PNG', xOffset, 0, finalWidth, finalHeight, undefined, 'MEDIUM');
      pdf.save('cv.pdf');

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
  };

  const handleSave = async () => {
    try {
      if (!user) {
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté pour sauvegarder un CV',
          variant: 'destructive',
        })
        return
      }

      setSaving(true)

      // Préparer les données du CV
      const cvData = {
        personalInfo: {
          fullName: personalDetails.fullName,
          email: personalDetails.email,
          phone: personalDetails.phone,
          address: personalDetails.address,
          photoUrl: personalDetails.photoUrl,
          postSeeking: personalDetails.postSeeking,
          description: personalDetails.description,
        },
        experience: experiences.map(exp => ({
          ...exp,
          startDate: exp.startDate,
          endDate: exp.endDate,
        })),
        education: educations.map(edu => ({
          ...edu,
          startDate: edu.startDate,
          endDate: edu.endDate,
        })),
        skills: skills,
        languages: languages,
        hobbies: hobbies,
      }

      // Vérifier si on modifie un CV existant
      const params = new URLSearchParams(window.location.search)
      const cvId = params.get('id')

      let savedCv
      if (cvId) {
        // Mettre à jour le CV existant
        const { data, error: updateError } = await supabase
          .from('user_cvs')
          .update({
            title: `CV de ${personalDetails.fullName || 'Sans titre'}`,
            data: cvData,
          })
          .eq('id', cvId)
          .eq('user_id', user.id)  // Vérification supplémentaire
          .select('*')
          .single()

        if (updateError) throw updateError
        savedCv = data
      } else {
        // Vérifier si c'est le premier CV de l'utilisateur
        const { data: existingCVs } = await supabase
          .from('user_cvs')
          .select('id')
          .eq('user_id', user.id)

        const isFirstCV = !existingCVs || existingCVs.length === 0

        // Créer un nouveau CV
        const { data, error: insertError } = await supabase
          .from('user_cvs')
          .insert([{
            user_id: user.id,
            title: `CV de ${personalDetails.fullName || 'Sans titre'}`,
            type: 'classic',
            data: cvData,
            is_primary: isFirstCV
          }])
          .select('*')
          .single()

        if (insertError) throw insertError
        savedCv = data
      }

      console.log('CV sauvegardé avec succès:', savedCv)

      toast({
        title: 'Succès',
        description: 'Votre CV a été sauvegardé',
      })

      // Rediriger vers le tableau de bord
      router.push('/dashboard/cvs')
    } catch (error: any) {
      console.error('Erreur complète lors de la sauvegarde:', error)
      toast({
        title: 'Erreur',
        description: error.message || "Impossible de sauvegarder le CV",
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="loading loading-spinner loading-lg"></div>
    </div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Version Desktop */}
      <section className="hidden lg:flex flex-1">
        <div className="w-1/3 bg-base-100 p-8 overflow-y-auto">
          {/* Première publicité en haut du formulaire */}
          
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
              experiences={experiences}
              setExperiences={setExperiences}
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

              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary gap-2"
                title="Sauvegarder"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
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
      <div className="lg:hidden">
        <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 p-4 flex justify-between items-center z-40">
          <button
            onClick={() => (document.getElementById('preview_modal') as HTMLDialogElement)?.showModal()}
            className="btn btn-circle btn-ghost"
          >
            <Eye className="w-6 h-6" />
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? (
              <div className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Sauvegarder
              </>
            )}
          </button>

          <button
            onClick={handleResetAll}
            className="btn btn-circle btn-ghost"
          >
            <RotateCw className="w-6 h-6" />
          </button>
        </div>
        
        {/* Ajouter un espace en bas pour éviter que le contenu ne soit caché par la barre fixe */}
        <div className="h-20"></div>

        <div className="flex flex-col flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="select select-bordered"
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

            <ExperienceForm
              experiences={experiences}
              setExperiences={setExperiences}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Éducations</h1>
              <button onClick={handleResetEducations} className="btn btn-primary">
                <RotateCw className="w-4" />
              </button>
            </div>

            <EducationForm
              educations={educations}
              setEducations={setEducations}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Langues</h1>
              <button onClick={handleResetLanguages} className="btn btn-primary">
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
        </div>
      </div>

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
                  ref={cvRef}

                />
              </div>
            </div>

          </div>
        </div>
      </dialog>

    </div>
  )
}
