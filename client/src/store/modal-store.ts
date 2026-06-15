// store/modal-store.ts

import { create } from "zustand";

type ModalType =
  | "CREATE_BUDGET"
  | "EDIT_BUDGET"
  | "CREATE_POT"
  | "EDIT_POT"
  | "ADD_MONEY"
  | "WITHDRAW_MONEY"
  | "CREATE_TRANSACTION"
  | "EDIT_TRANSACTION"
  | "DELETE_BUDGET"
  | "DELETE_POT";

type ModalPayload = any;

type ModalStore = {
  isOpen: boolean;
  type: ModalType | null;
  payload: ModalPayload | null;

  openModal: (type: ModalType, payload?: ModalPayload) => void;

  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  payload: null,

  openModal: (type, payload = null) =>
    set({
      isOpen: true,
      type,
      payload,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      payload: null,
    }),
}));
