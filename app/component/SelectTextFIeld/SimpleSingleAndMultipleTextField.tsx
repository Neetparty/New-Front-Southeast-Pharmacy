import React, { useState } from 'react'
// import { SelectTextField } from './SelectTextField';


type StateProps = {
    select: SelectOption;

}

let opt = [
    {
        label:"hello1",
        value:1
    },
    {
        label:"hello2",
        value:2
    },
    {
        label:"hello3",
        value:3
    },
    {
        label:"hello4",
        value:4
    },
    {
        label:"hello5",
        value:5
    },
]

let single ={
    label:"hello1",
    value:1
};
type SelectOption = {
    label: string;
    value: string | number;
  };
export const SimpleSingleAndMultipleTextField: React.FC = ({}) => {


    const [state,setState] = useState<SelectOption>({label:"", value:0})
    
    const [state2,setState2] = useState<SelectOption[]>([{label:"hello1", value:1}])


    return (
    <>
   {/*  <SelectTextField
    key={1}
    multiple={false}
    value={state}
    options={opt}
    onChange={(value: SelectOption | undefined) => {
       if(value){
            setState(value)
       }
    }}
    /> */}
    {/* <SelectTextField
    key={1}
    multiple={true}
    value={state2}
    options={opt}
    onChange={(value: SelectOption[] | undefined) => {
      if(value){
        setState2(value)
      }
    }}
    /> */}
    </>
);
}