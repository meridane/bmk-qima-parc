'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import bcrypt from 'bcryptjs'

export default function OnboardingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [sameNumber, setSameNumber] = useState(false)
  const [langue, setLangue] = useState('')
  const [conteneurs, setConteneurs] = useState('')

  const handleSubmit = async () => {
    const passwordHash = await bcrypt.hash(password, 10)

    const response = await fetch('/api/client/register', {
      method: 'POST',
      body: JSON.stringify({
        email: session?.user?.email,
        nom_complet: fullName,
        tel: phone,
        whatsapp: sameNumber ? phone : whatsapp,
        same_number: sameNumber,
        langue_native: langue,
        volume_conteneurs: conteneurs,
        password_hash: passwordHash
      }),
    })

    if (response.ok) {
      router.push('/waiting-validation')
    } else {
      alert("Erreur d'enregistrement.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Créer un mot de passe</h2>
            <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="input" />
            <input type="password" placeholder="Confirmer" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input mt-2" />
            <button onClick={() => password === confirmPassword && password.length >= 6 ? setStep(2) : alert("Mot de passe invalide")} className="btn mt-4">Suivant</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Vos coordonnées</h2>
            <input type="text" placeholder="Nom complet" value={fullName} onChange={e => setFullName(e.target.value)} className="input" />
            <input type="tel" placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} className="input mt-2" />
            {!sameNumber && (
              <input type="tel" placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="input mt-2" />
            )}
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" checked={sameNumber} onChange={() => setSameNumber(!sameNumber)} />
              Même numéro pour WhatsApp
            </label>
            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(1)} className="btn-secondary">Retour</button>
              <button onClick={() => setStep(3)} className="btn">Suivant</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Langue native</h2>
            <select value={langue} onChange={e => setLangue(e.target.value)} className="input">
              <option value="">-- Choisir --</option>
              <option value="Français">Français</option>
              <option value="Arabe">Arabe</option>
              <option value="Coréen">Coréen</option>
              <option value="Anglais">Anglais</option>
            </select>
            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(2)} className="btn-secondary">Retour</button>
              <button onClick={() => setStep(4)} className="btn">Suivant</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Combien de conteneurs chargez-vous par mois ?</h2>
            {['1~3', '3~6', '6~7', 'Plus de 7'].map(opt => (
              <label key={opt} className="block mb-2">
                <input type="radio" name="conteneurs" value={opt} checked={conteneurs === opt} onChange={e => setConteneurs(e.target.value)} className="mr-2" />
                {opt}
              </label>
            ))}
            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(3)} className="btn-secondary">Retour</button>
              <button onClick={() => setStep(5)} className="btn">Suivant</button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-xl font-bold mb-4 text-green-600">Merci pour votre inscription</h2>
            <p className="text-gray-700">Un administrateur vous contactera dès que votre compte sera activé.</p>
            <button onClick={handleSubmit} className="btn mt-6">Terminer</button>
          </>
        )}
      </div>
    </div>
  )
}