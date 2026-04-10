import { createServer } from 'miragejs'
import { Escola } from '../types/escola'

let escolas: Escola[] = []

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = 'api'
      
      this.passthrough('https://viacep.com.br/**')

      this.get('/schools', () => {
        return escolas
      })

      this.post('/schools', (schema, request) => {
        const data = JSON.parse(request.requestBody)

        const nova = {
          id: Date.now().toString(),
          ...data,
          turmas: [],
        }

        escolas.push(nova)

        return nova
      })

      this.put('/schools/:id', (schema, request) => {
        const id = request.params.id
        const data = JSON.parse(request.requestBody)

        escolas = escolas.map((e) =>
          e.id === id ? { ...e, ...data } : e
        )

        return {}
      })

      this.delete('/schools/:id', (schema, request) => {
        const id = request.params.id
        escolas = escolas.filter((e) => e.id !== id)

        return {}
      })

      this.post('/classes', (schema, request) => {
        const data = JSON.parse(request.requestBody)

        const { escolaId, ...turma } = data

        const escola = escolas.find((e) => e.id === escolaId)

        if (escola) {
          escola.turmas.push({
            id: Date.now().toString(),
            ...turma,
          })
        }

        return {}
      })

      this.put('/classes/:id', (schema, request) => {
        const id = request.params.id
        const data = JSON.parse(request.requestBody)

        escolas.forEach((escola) => {
          escola.turmas = escola.turmas.map((t) =>
            t.id === id ? { ...t, ...data } : t
          )
        })

        return {}
      })

      this.delete('/classes/:id', (schema, request) => {
        const id = request.params.id

        escolas.forEach((escola) => {
          escola.turmas = escola.turmas.filter((t) => t.id !== id)
        })

        return {}
      })
    },
  })
}