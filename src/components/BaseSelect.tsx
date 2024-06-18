import React from 'react';

/**
 * セレクトボックスの情報の型
 *
 * @property {string} className class名
 * @property {OptionInfo[]} optionList 選択肢
 * @property {{(e: React.ChangeEvent<HTMLSelectElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    className?: string;
    optionList: OptionInfo[];
    handleFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * 選択肢の型
 *
 * @property {number} id ID
 * @property {string} value 名称
 */
type OptionInfo = {
    id: number;
    value: string;
}

/**
 * セレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const BaseSelect = (props: Props) => {
    const { className, optionList, handleFunc } = props;

    return (
        <select className={className} onChange={handleFunc}>
            <option value=""></option>
            {optionList.map((option, index) => {
                return (
                    <option key={index} value={option.id}>{option.value}</option>
                )
            })}
        </select>
    );
}