"use client"


export default function CheckBox({ onClick, checked = false }: { onClick:() => void, checked:boolean}) {

    return (
        <input
        className="w-4 h-4 rounded-lg checked:rounded-lg cursor-pointer"
        type="checkbox"
        checked={checked}
        onClick={onClick}

          />
);
}