"use client"


export default function CheckBox({onChange, checked=false}: {onChange:() => void, checked:boolean}) {

    return (
        <input
        className="w-4 h-4 rounded-lg checked:rounded-lg cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}

          />
);
}