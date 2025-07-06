// useAlertConfirm.ts
import { useConfirm, ConfirmType } from './alert';
import type { ReactNode } from 'react';

interface IAlertConfirm {
  type?: ConfirmType;
  title?: string;
  message?: ReactNode | string;
  onAccept: () => void;
  onCancel?: () => void;
  hideButtons?: boolean;
}

export const useAlertConfirm = () => {
  const { show } = useConfirm();

  const handleAlertConfirm = ({
    type = 'confirm',
    title = 'Eliminar Usuario',
    message = '¿Está seguro que desea eliminar el usuario?',
    onAccept,
    onCancel,
    hideButtons,
  }: IAlertConfirm) => {
    show({
      type,
      title,
      message,
      onAccept,
      onCancel,
      hideButtons,
    });
  };

  return { handleAlertConfirm };
};
