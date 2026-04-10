import { Ionicons } from '@expo/vector-icons'
import { Box, Button, Text } from '@gluestack-ui/themed'
import { Escola } from '../types/escola'

type Props = {
  escola: Escola
  onEditar: (escola: Escola) => void
  onRemover: (id: string) => void
}

function cortarTexto(texto: string, limite: number) {
  if (texto.length <= limite) return texto
  return texto.substring(0, limite) + '...'
}

export function EscolaCard({ escola, onEditar, onRemover }: Props) {
  return (
    <Box
      mt="$4"
      p="$4"
      borderRadius="$2xl"
      bg="$backgroundLight0"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >

        <Box flexDirection="row" justifyContent="space-between" alignItems="center" alignSelf="center">
            <Box>

            <Text color="$pink700" bold size="lg" alignSelf="center">
                Escola {cortarTexto(escola.nome, 20)}
            </Text>
            
            <Text mt="$1" alignSelf="center">
                {escola.endereco.rua}, {escola.endereco.numero}
            </Text>

            <Text mt="$1" alignSelf="center">
                {escola.endereco.cidade} - {escola.endereco.estado}
            </Text>

            <Text mt="$2" alignSelf="center">
                Turmas cadastradas: {escola.turmas.length}
            </Text>

            </Box>
        </Box>

        <Box flexDirection="row" gap="$5" justifyContent="space-between" alignItems="center" alignSelf="center" mt="$5">

            <Button size="sm" bg="$pink400" onPress={() => onEditar(escola)} >
                <Ionicons name="create" size={22} color="white" />
            </Button>

            <Button size="sm" bg="$pink700" onPress={() => onRemover(escola.id)} >
                <Ionicons name="trash" size={22} color="white" />
            </Button>

        </Box>

    </Box>
  )
}