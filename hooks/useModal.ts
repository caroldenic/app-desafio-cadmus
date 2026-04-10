import { useState } from "react"

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const abrir = () => setIsOpen(true)
  const fechar = () => setIsOpen(false)

  return {
    isOpen,
    abrir,
    fechar
  }
}