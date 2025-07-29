"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDisposableEmail = exports.getMenuTree = void 0;
const disposable_blocklist_1 = require("../../constants/disposable-blocklist");
const getMenuTree = (data, level, root) => {
    let results = [];
    if (root === null && level === 0) {
        for (let i = 0; i < data.length; i += 1) {
            if (data[i].level === 0) {
                const row = { ...data[i] };
                const lowerLevel = (0, exports.getMenuTree)(data, level + 1, row.menu_id);
                const isLeaf = lowerLevel.length === 0;
                const levelResult = {
                    title: row.menu_name,
                    key: row.menu_id,
                    value: row.menu_id,
                    children: lowerLevel,
                    is_leaf: isLeaf,
                    ...row,
                };
                results.push(levelResult);
            }
        }
    }
    else {
        for (let i = 0; i < data.length; i += 1) {
            if (data[i].level === level && data[i].parent_id === root) {
                const row = { ...data[i] };
                const lowerLevel = (0, exports.getMenuTree)(data, level + 1, row.menu_id);
                const isLeaf = lowerLevel.length === 0;
                const levelResult = {
                    title: row.menu_name,
                    key: row.menu_id,
                    value: row.menu_id,
                    children: lowerLevel,
                    is_leaf: isLeaf,
                    ...row,
                };
                results.push(levelResult);
            }
        }
    }
    results = results.sort((n1, n2) => {
        if (n1.sort_order > n2.sort_order) {
            return 1;
        }
        if (n1.sort_order < n2.sort_order) {
            return -1;
        }
        return 0;
    });
    return results;
};
exports.getMenuTree = getMenuTree;
const isDisposableEmail = async (email) => {
    if (!email)
        return false;
    const blockList = disposable_blocklist_1.listDisposableDomain;
    if (!blockList)
        return false;
    return blockList.includes(email.split('@')[1]);
};
exports.isDisposableEmail = isDisposableEmail;
