'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

// Copyright (c) 2025 OxcyShop. Todos los derechos reservados.
// Este código es propiedad de OxcyShop y no puede ser copiado, modificado o distribuido sin permiso.

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
}

export default function ProfessionalTrollPage() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (hasInteracted) {
      const fetchIpInfo = async () => {
        try {
          const res = await fetch('https://ipapi.co/json/')
          if (!res.ok) {
            throw new Error('Failed to fetch IP info')
          }
          const data: IpInfo = await res.json()
          setIpInfo(data)
        } catch (err) {
          console.error('Error fetching IP info:', err)
          setError(true)
        } finally {
          setLoading(false)
        }
      }
      fetchIpInfo()

      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Error al reproducir video:", e))
      }
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Error al reproducir audio:", e))
      }
    }
  }, [hasInteracted])

  const handleStartClick = () => {
    setHasInteracted(true)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4 font-sans text-white">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="https://github.com/Stationsflyp/Discord-Server-Cloner-2x/releases/download/B2/yt1z.net.-.Rick.Astley.-.Never.Gonna.Give.You.Up.Official.Video.4K.Remaster.1080p.mp4" type="video/mp4" />
        {'Tu navegador no soporta videos HTML5.'}
      </video>

      {/* Audio de fondo (trollololol) */}
      <audio ref={audioRef} loop className="sr-only">
        <source src="https://www.myinstants.com/media/sounds/trollololol.mp3" type="audio/mpeg" />
        {'Tu navegador no soporta audio HTML5.'}
      </audio>

      {!hasInteracted && (
        <div className="relative z-20 flex flex-col items-center justify-center rounded-xl bg-black/80 p-8 text-center shadow-2xl backdrop-blur-lg backdrop-filter md:p-12">
          <h2 className="mb-6 text-4xl font-extrabold text-red-500 md:text-5xl">
            {'¡ADVERTENCIA DE CONTENIDO EXCLUSIVO!'}
          </h2>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            {'Has encontrado un portal secreto. Haz clic para revelar el misterio y desbloquear una sorpresa.'}
          </p>
          <Button
            onClick={handleStartClick}
            className="animate-bounce bg-red-600 px-8 py-4 text-xl font-bold text-white hover:bg-red-700"
          >
            {'REVELAR SECRETO AHORA'}
          </Button>
        </div>
      )}

      {hasInteracted && (
        <div className="relative z-10 mx-auto w-full max-w-3xl rounded-xl bg-black/70 p-8 text-center shadow-2xl backdrop-blur-lg backdrop-filter md:p-12">
          <h1 className="mb-6 text-5xl font-extrabold text-red-500 drop-shadow-lg animate-pulse md:text-6xl">
            {'🚨 ¡ACCESO NO AUTORIZADO DETECTADO! 🚨'}
          </h1>

          <p className="mb-8 text-xl text-gray-300 md:text-2xl">
            {'Hemos rastreado tu conexión. Preparando el informe de datos...'}
          </p>

          <div id="ipInfo" className="mt-5 text-left text-xl text-lime-400 md:text-2xl" aria-live="polite">
            {loading ? (
              <p className="text-center text-gray-400">Cargando tu información... 🔍</p>
            ) : error ? (
              <p className="text-center text-red-400">No se pudo obtener tu IP. Inténtalo de nuevo más tarde.</p>
            ) : ipInfo ? (
              <>
                <p><span className="font-bold">TU IP ES:</span> {ipInfo.ip}</p>
                <p><span className="font-bold">Ciudad:</span> {ipInfo.city}</p>
                <p><span className="font-bold">Región:</span> {ipInfo.region} ({ipInfo.region_code})</p>
                <p><span className="font-bold">País:</span> {ipInfo.country_name} ({ipInfo.country})</p>
                <p><span className="font-bold">Código Postal:</span> {ipInfo.postal}</p>
                <p><span className="font-bold">Latitud:</span> {ipInfo.latitude}</p>
                <p><span className="font-bold">Longitud:</span> {ipInfo.longitude}</p>
                <p><span className="font-bold">Zona Horaria:</span> {ipInfo.timezone}</p>
                <p><span className="font-bold">Proveedor de Internet:</span> {ipInfo.org}</p>
                <p><span className="font-bold">Sistema Operativo:</span> {navigator.platform}</p>
                <p><span className="font-bold">Agente de Usuario:</span> <span className="text-sm break-all">{navigator.userAgent}</span></p>
              </>
            ) : null}
          </div>

          <p className="mt-10 text-center text-2xl font-bold text-red-500 md:text-3xl">
            {'Datos enviados a OxcyShop'}
          </p>
        </div>
      )}
    </div>
  )
}
