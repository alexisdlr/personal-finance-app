// store/modal-store.ts

import { create } from "zustand";

type ModalType =
  | "CREATE_BUDGET"
  | "EDIT_BUDGET"
  | "CREATE_POT"
  | "ADD_MONEY"
  | "WITHDRAW_MONEY"
  | "DELETE";

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
