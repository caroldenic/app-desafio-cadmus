import {
  Box,
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text
} from '@gluestack-ui/themed'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  mensagem: string
}

export function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  mensagem
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>

        <ModalHeader alignSelf="center">
          <Text bold >Confirmação</Text>
        </ModalHeader>

        <ModalBody alignSelf="center">
          <Text textAlign='center'>{mensagem}</Text>
        </ModalBody>

        <ModalFooter alignSelf="center" gap="$3">
          <Button mr="$2" action="secondary" onPress={onClose}>
            <ButtonText>Cancelar</ButtonText>
          </Button>

          <Button bgColor='$pink700' action="negative" onPress={onConfirm}>
            <ButtonText>Excluir</ButtonText>
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}