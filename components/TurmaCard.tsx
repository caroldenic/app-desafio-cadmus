import { Ionicons } from '@expo/vector-icons'
import { Box, Button, Text } from '@gluestack-ui/themed'
import { Turma } from '../types/escola'

type Props = {
  turma: Turma & {
    escolaNome: string
    escolaId: string
  }
  onEditar: (turma: Props['turma']) => void
  onRemover: (id: string) => void
}

export function TurmaCard({ turma, onEditar, onRemover }: Props) {
  return (
    <Box mt="$4" p="$4" borderRadius="$2xl" bg="$backgroundLight0">

      <Box flexDirection="row" justifyContent="space-between" alignItems="center">

        <Box>
          <Text color="$gray500">Escola {turma.escolaNome}</Text>

          <Text bold size="lg">
            {turma.nome}
          </Text>

          <Text>
            {turma.turno} - {turma.ano}
          </Text>
        </Box>

        <Box flexDirection="row" gap="$2">

          <Button bgColor='$pink400' size="sm" onPress={() => onEditar(turma)}>
            <Ionicons name="create" size={18} color="white" />
          </Button>

          <Button bgColor='$pink700' size="sm" action="negative" onPress={() => onRemover(turma.id)}>
            <Ionicons name="trash" size={18} color="white" />
          </Button>

        </Box>
      </Box>
    </Box>
  )
}