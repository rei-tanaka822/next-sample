import React from 'react';
import { Option } from '@/types/option';

/**
 * Propsの型
 *
 * @property {string} className class
 * @property {string} itemName 項目名
 * @property {Option[]} optionList 選択肢
 * @property {{(e: React.ChangeEvent<HTMLInputElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    className?: string;
    itemName: string;
    optionList: Option[];
    handleFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * チェックボックス一覧表示用コンポーネント
 *
 * @param {Props} props チェックボックスの情報
 * @returns {JSX.Element}
 */
export const BaseCheckBoxList = (props: Props) => {
    const { className, itemName, optionList, handleFunc } = props;

    return (
        <div className={className}>
            <p>{itemName}</p>
            <ul>
                {optionList.map((option, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            value={option.id}
                            onChange={handleFunc}
                        ></input>
                        <label>{option.value}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};