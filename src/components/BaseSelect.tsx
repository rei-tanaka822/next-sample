import React from 'react';
import { Option } from '@/types/option';

/**
 * セレクトボックスの情報の型
 *
 * @property {string} className class名
 * @property {Option[]} optionList 選択肢
 * @property {{(e: React.ChangeEvent<HTMLSelectElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    className?: string;
    optionList: Option[];
    handleFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

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
            {optionList.map((option, index) => (
                <option key={index} value={option.id}>
                    {option.value}
                </option>
            ))}
        </select>
    );
}