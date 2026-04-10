import { useState } from "react"

export function useCep() {
  const [loading, setLoading] = useState(false)

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '')

    if (cepLimpo.length !== 8) return null

    setLoading(true)

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await res.json()
      return data
    } finally {
      setLoading(false)
    }
  }

  return { buscarCep, loading }
}