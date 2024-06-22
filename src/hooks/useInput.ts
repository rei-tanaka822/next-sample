import { useState } from "react";

/**
 * 入力テキスト管理フック
 *
 * @param {string} initialValue 入力値の初期値
 * @returns {{value, onChange}} 現在の入力値, ハンドラメソッド
 */
export function useInputText(initialValue: string) {
    const [inputText, setInputText] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const inputProps = {
        value: inputText,
        onChange: handleChange,
    };

    return inputProps;
}

/**
 * セレクトボックス選択値管理フック
 *
 * @param {string} initialValue 入力値の初期値
 * @returns {{value, onChange}} 現在の選択値, ハンドラメソッド
 */
export function useInputSelect(initialValue: string) {
    const [inputSelect, setInputSelect] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInputSelect(e.target.value);
    };

    const inputProps = {
        value: inputSelect,
        onChange: handleChange,
    };

    return inputProps;
}

/**
 * チェックボックス選択値管理フック
 *
 * @param {string[]} initialValue 入力値の初期値
 * @returns {{values, onChange}} 現在の選択値(複数可), ハンドラメソッド
 */
export function useInputChecks(initialValue: string[]) {
    const [inputChecks, setInputChecks] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputChecks((preInputChecks) =>
            e.target.checked
                ? // チェックされたらチェックリストに追加
                  [...preInputChecks, value]
                : // チェックが外れたらチェックリストから削除
                  preInputChecks.filter((v) => v !== value)
        );
    };

    const inputProps = {
        values: inputChecks,
        onChange: handleChange,
    };

    return inputProps;
}
