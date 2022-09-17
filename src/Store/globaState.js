import { atom } from "recoil";

export const sidebarStateAtom = atom({
    key: 'sidebarStateAtom',
    default: false,
});

export const userStateAtom = atom({
    key: 'userStateAtom',
    default: {},
});

export const cartProductAtom = atom({
    key: 'cartProductAtom',
    default: [],
});

export const orderedProductAtom = atom({
    key: 'orderedProductAtom',
    default: [],
});