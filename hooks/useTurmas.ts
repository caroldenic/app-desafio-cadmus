import { Escola, Turma } from '../types/escola'

type TurmaComEscola = Turma & {
  escolaNome: string
  escolaId: string
}

export function useTurmas(escolas: Escola[], busca: string) {

  const todasTurmas: TurmaComEscola[] = escolas.flatMap((escola) =>
    escola.turmas.map((turma) => ({
      ...turma,
      escolaNome: escola.nome,
      escolaId: escola.id
    }))
  )

  const turmasFiltradas = todasTurmas.filter((t) => {
    const texto = busca.toLowerCase()

    return (
      t.nome.toLowerCase().includes(texto) ||
      t.turno.toLowerCase().includes(texto) ||
      t.escolaNome.toLowerCase().includes(texto) ||
      String(t.ano).includes(texto)
    )
  })

  return {
    todasTurmas,
    turmasFiltradas
  }
}