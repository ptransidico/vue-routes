<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0">
            <img class="w-24" src="@/assets/logo.png" alt="Your Company" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-0 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="size-8 rounded-full"
                    :src="user.imageUrl"
                    alt="Physico Logo"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <RouterLink
                      v-if="item.name !== 'Sign out'"
                      :to="item.href"
                      :class="[
                        active ? 'bg-gray-100 outline-hidden' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ item.name }}
                    </RouterLink>
                    <a
                      v-else
                      href="#"
                      @click.prevent="handleLogout"
                      :class="[
                        active ? 'bg-gray-100 outline-hidden' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ item.name }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          :as="RouterLink"
          :to="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}
        </DisclosureButton>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5">
          <div class="shrink-0">
            <img class="size-10 rounded-full" :src="user.imageUrl" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base/5 font-medium text-white">
              {{ user.name }}
            </div>
            <div class="text-sm font-medium text-gray-400">
              {{ user.email }}
            </div>
          </div>
          <button
            type="button"
            class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <template v-for="item in userNavigation" :key="item.name">
            <DisclosureButton
              v-if="item.name !== 'Sign out'"
              :as="RouterLink"
              :to="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {{ item.name }}
            </DisclosureButton>
            <DisclosureButton
              v-else
              as="button"
              type="button"
              href="#"
              @click.prevent="handleLogout"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {{ item.name }}
            </DisclosureButton>
          </template>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { useRouter, useRoute, RouterLink } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

async function handleLogout() {
  try {
    auth.logout().then(() => router.push('/'));
  } catch (err) {
    console.error("Errore durante il logout:", err);
  }
}

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = computed(() =>
  [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Inventario", href: "/inventario" },
    { name: "Dose Personale", href: "/dose-personale" },
    { name: "Dose Paziente", href: "/dose-paziente" },
    { name: "Therabed", href: "/therabed" },
    { name: "Sorgenti", href: "/sorgenti" },
  ].map((item) => ({
    ...item,
    current: route.path === item.href,
  }))
);

const userNavigation = [
  { name: "Your Profile", href: "/myprofile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: null },
];
</script>
