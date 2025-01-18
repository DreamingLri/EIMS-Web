import { loginApi, logoutApi } from "@/api/login.api";
import type { Admin } from "@/model/admin.model";
import type { Nullable } from "element-plus/es/components/cascader-panel/src/node.mjs";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const Admin = ref<Nullable<Admin>>(null);

    function getAdmin(): Admin {
        return Admin.value || {} as Admin;
    }
    function setAdmin(admin: Admin): void {
        Admin.value = admin;
    }
    function clearAdmin(): void {
        Admin.value = null;
    }
    async function login(name: string, password: string): Promise<Admin | null> {
        const res = await loginApi(name, password);
        if (!res) {
            return null
        }
        setAdmin(res);
        return res;
    }

    async function logout(): Promise<any> {
        const res = await logoutApi();
        if (res) {
            clearAdmin();
            return res;
        } else {
            return null;
        }
    }

    return { Admin, getAdmin, setAdmin, clearAdmin, login, logout };
}, {
  persist: true,
});
