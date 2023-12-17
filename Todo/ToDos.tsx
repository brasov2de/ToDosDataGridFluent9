import {
    DataGridBody,
    DataGrid,
    DataGridRow,
    DataGridHeader,
    DataGridCell,
    DataGridHeaderCell,
} from "@fluentui-contrib/react-data-grid-react-window";

type EntityRecord = ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
import {  
  Avatar, makeStyles,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  DataGridProps,
  FluentProvider,
  webLightTheme , 
  Theme 
} from "@fluentui/react-components";
import {CheckmarkCircleRegular, DismissCircleRegular} from "@fluentui/react-icons";
//Checkmark24Filled
//CheckmarkCircle24Filled
/*
import { Avatar } from "@fluentui/react-avatar";
import { PresenceBadgeStatus } from "@fluentui/react-badge";
import{ DataGridBody,  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,} from "@fluentui/react-table";
import {FluentProvider } from "@fluentui/react-provider"; 
import { webLightTheme } from "@fluentui/react-theme"; */
import * as React from "react";


const useStyles = makeStyles({
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

export interface IToDosProps {
  dataset : ComponentFramework.PropertyTypes.DataSet, 
  onChanged: (id: string) => void;
  theme ?: Theme;
  isCustomPage : boolean;
}
export const ToDos = ({dataset, onChanged, theme, isCustomPage}: IToDosProps) => {
  const [selected, setSelected] = React.useState<any[]>([]);

  const classes = useStyles();

  const complete = (item:any) => {    
    const id = item.getRecordId();
    console.log(id);    
    (dataset.records[id] as any).setValue("statecode", isCustomPage ? {Id: 1} : 1);
    (dataset.records[id] as any).setValue("statuscode", isCustomPage ? {Id:5} : 5);
    (dataset.records[id] as any).save().then(() => {
      onChanged(id);
      dataset.refresh()
    });    
  }
  
  const cancel = (item:any) => {
    const id = item.getRecordId();
    console.log(id);
    (dataset.records[id] as any).setValue("statecode", isCustomPage ? {Id: 2} : 2);
    (dataset.records[id] as any).setValue("statuscode", isCustomPage ? {Id:6} : 6);
    (dataset.records[id] as any).save().then(() => {
      onChanged(id);
      dataset.refresh();
    });  
  }

  const items= dataset.sortedRecordIds.map((id)=>dataset.records[id]);
  const columns: TableColumnDefinition<EntityRecord>[] = dataset.columns.sort((a,b)=>a.order-b.order)
    .map((column)=>createTableColumn<EntityRecord>({
      columnId: column.name,      
      compare: (a, b) => {
        return (a as any)?.getValue() - (b as any)?.getValue();
      },
      renderCell: (item) => {
        return item.getFormattedValue(column.name);
      },
      renderHeaderCell: () => {
        return column.displayName;
      }      
    }));
  const allColumns = [
    ...columns,
  createTableColumn({
    columnId: "check",
    renderCell: (item) => {
      return (
        <>
      <Avatar icon={<CheckmarkCircleRegular />} shape="square" aria-label="Complete" color="dark-green" className={classes.button} onClick={() => complete(item)}/>
      <Avatar icon={<DismissCircleRegular/>} shape="square" aria-label="Complete" color="red" className={classes.button} onClick={() => cancel(item)}/>
      </>
      )
    },
    renderHeaderCell : () => {
      return "Complete";
    }
  })
]
  return (
    <div style={{ width: "100%" }}>
    <FluentProvider theme={webLightTheme}>
     <DataGrid      
      items={items}
      columns={allColumns}      
      sortable      
      selectionMode="single"
      getRowId={(item) => item.getRecordId()}
      onSelectionChange={(e, data) => setSelected(Array.from(data.selectedItems))}
    >
      <DataGridHeader>
        <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<EntityRecord> itemSize={50} height={500}>
        {({ item, rowId }) => (
          <DataGridRow<EntityRecord>
            key={rowId}
            selectionCell={{ "aria-label": "Select row" }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}           
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
    </FluentProvider>
    </div>
  );
};