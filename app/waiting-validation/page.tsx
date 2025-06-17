export default function WaitingValidationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Merci pour votre inscription</h1>
        <p className="text-gray-700 mb-4">
          Votre compte est actuellement <strong>en attente de validation</strong> par un administrateur.
        </p>
        <p className="text-sm text-gray-500">
          Vous recevrez une notification dès qu’il sera activé. Merci pour votre patience.
        </p>
      </div>
    </div>
  )
}