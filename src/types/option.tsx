/**
 * 選択肢の型
 *
 * @property {string} id ID
 * @property {string} value 値
 */
export type Option = {
    id: number;
    value: string;
}

/**
 * Propsの型（選択項目用）
 *
 * @property {string} itemName 項目名
 * @property {{(e: React.ChangeEvent<HTMLSelectElement>) => void}} handleFunc ハンドラメソッド
 */
export type OptionProps = {
    itemName: string;
    handleFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
