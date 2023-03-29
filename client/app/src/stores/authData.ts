import type { User } from "@/types";
import { reactive } from "vue";

interface AuthDataStore {
  user: User | null;
  token: string | null;
  setData: (user: User, token?: string) => void;
  $reset: () => void;
}

export const authDataStore = reactive<AuthDataStore>({
  // State
  user: null,
  token: null,

  // Actions
  setData(user: User, token?: string) {
    this.user = user;
    this.token = token ?? this.token;
  },

  $reset() {
    this.user = null;
    this.token = null;
  }
});
