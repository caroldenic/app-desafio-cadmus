import { useTurmas } from '../../hooks/useTurmas'
import { Escola } from '../../types/escola'

describe('useTurmas', () => {

  const escolasMock: Escola[] = [
    {
      id: '1',
      nome: 'Escola A',
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      turmas: [
        {
          id: 't1',
          nome: 'Turma 1',
          turno: 'Manhã' as any,
          ano: 2025
        }
      ]
    },
    {
      id: '2',
      nome: 'Escola B',
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      turmas: [
        {
          id: 't2',
          nome: 'Turma 2',
          turno: 'Tarde' as any,
          ano: 2024
        }
      ]
    }
  ]

  it('deve retornar todas as turmas', () => {
    const { todasTurmas } = useTurmas(escolasMock, '')

    expect(todasTurmas.length).toBe(2)
  })

  it('deve filtrar por nome da turma', () => {
    const { turmasFiltradas } = useTurmas(escolasMock, 'Turma 1')

    expect(turmasFiltradas.length).toBe(1)
  })

  it('deve filtrar por nome da escola', () => {
    const { turmasFiltradas } = useTurmas(escolasMock, 'Escola B')

    expect(turmasFiltradas.length).toBe(1)
  })

  it('deve filtrar por ano', () => {
    const { turmasFiltradas } = useTurmas(escolasMock, '2025')

    expect(turmasFiltradas.length).toBe(1)
  })

})