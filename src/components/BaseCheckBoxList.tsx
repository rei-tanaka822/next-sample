import React from 'react';

/**
 * Propsの型
 *
 * @property {string} className class
 * @property {string} itemName 項目名
 * @property {OptionInfo[]} optionList 選択肢
 * @property {{(e: React.ChangeEvent<HTMLInputElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    className?: string;
    itemName: string;
    optionList: OptionInfo[];
    handleFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * [TODO]共通化する
 * 選択肢の型
 *
 * @property {string} id ステータスID
 * @property {string} value ステータス名
 */
type OptionInfo = {
    id: number;
    value: string;
}

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
            {optionList.map((option, index) => {
                return (
                    <li key={index}>
                    <input type="checkbox" value={option.id} onChange={handleFunc}></input>
                    <label>{option.value}</label>
                    </li>
                )
            })}
        </ul>
    </div>
    );
}