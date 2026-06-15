// store/modal-store.ts

import { create } from "zustand";
import toast from "react-hot-toast";
import { isDemoUserId } from "@/lib/demo-user";
import { useAuthStore } from "./auth-store";

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

  openModal: (type, payload = null) => {
    const user = useAuthStore.getState().user;

    if (isDemoUserId(user?.id)) {
      toast.error("Demo account is read-only");
      return;
    }

    set({
      isOpen: true,
      type,
      payload,
    });
  },

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      payload: null,
    }),
}));
