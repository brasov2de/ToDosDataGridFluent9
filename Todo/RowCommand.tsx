import { Avatar, makeStyles} from '@fluentui/react-components';
import {CheckmarkCircleRegular, DismissCircleRegular, ImportantFilled} from "@fluentui/react-icons";
import * as React from 'react';



export type TRowCommand = {     
    dispatchEvent ?: (value: any) => void;
}

export const useStyles = makeStyles({
    button: {  
      'opacity': 0.5,
      ':hover': {             
         backgroundColor: 'transparent',
         boxShadow: "0 1px 1px 1px"
      }, 
      ':active': {
        backgroundColor: '#EFEFEF'
      } 
    }
  });

export interface IRowCommandProps {
    rowCommand : TRowCommand;
    id: string;    
}


export const RowCommand = ({rowCommand, id}: IRowCommandProps) => {
    if(rowCommand.dispatchEvent == null) return (<></>);
    const classes = useStyles();
    const onClick = () => {
        if(rowCommand.dispatchEvent){
            rowCommand.dispatchEvent(id);
        } 
    }
    
    return (
        <Avatar icon={<ImportantFilled/>} shape="square" aria-label="Complete" color='grape' className={classes.button} onClick={onClick}/>
    )
};


