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
  mensagem: string
}

export function ModalAviso({ isOpen, onClose, mensagem }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>

        <ModalHeader alignSelf="center">
          <Text bold >Aviso</Text>
        </ModalHeader>

        <ModalBody alignSelf="center">
          <Text textAlign='center'>{mensagem}</Text>
        </ModalBody>

        <ModalFooter alignSelf="center">
          <Button bgColor='$pink700'  onPress={onClose}>
            <ButtonText>OK</ButtonText>
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}