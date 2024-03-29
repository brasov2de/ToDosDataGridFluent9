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
 // webLightTheme , 
  Theme , 
  createLightTheme, 
  createDarkTheme,
  BrandVariants, 
//  mergeThemes, 
  PartialTheme
} from "@fluentui/react-components";
import {CheckmarkCircleRegular, DismissCircleRegular} from "@fluentui/react-icons";
//Checkmark24Filled
//CheckmarkCircle24Filled

import * as React from "react";
import { RowCommand, useStyles } from "./RowCommand";
import { generateBrandVariants } from "./ColorGenerator";

export type TCommandProps = { 
  dispatchEvent ?: ( value: any) => void;  
}

const myNewTheme: BrandVariants = { 
  10: "#040204",
  20: "#1C141F",
  30: "#2F1F35",
  40: "#3F2848",
  50: "#50315C",
  60: "#613A70",
  70: "#724385",
  80: "#854D9B",
  90: "#9757B1",
  100: "#A467BC",
  110: "#AF78C4",
  120: "#BA89CC",
  130: "#C59BD4",
  140: "#D0ACDC",
  150: "#DABEE4",
  160: "#E5D0EB"
};

export interface IToDosProps {
  dataset : ComponentFramework.PropertyTypes.DataSet, 
  onChanged: (id: string) => void;
  theme ?: Theme;
  isCustomPage : boolean;
  onRecordSelected: () => void;
  commandProps : TCommandProps;
  basePaletteColor ?: string;
  isLightTheme ?: boolean;
}
export const ToDos = ({dataset, onChanged, theme, isCustomPage, onRecordSelected, commandProps, basePaletteColor, isLightTheme}: IToDosProps) => {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(dataset.getSelectedRecordIds()));

  const [myTheme, setTheme] = React.useState(theme);
  React.useEffect(() => {    
    setTheme(basePaletteColor!=null && basePaletteColor.length > 0 ? 
        isLightTheme ?
            createLightTheme(generateBrandVariants(basePaletteColor)) 
          : createDarkTheme(generateBrandVariants(basePaletteColor))
       : theme);
 // const generatedTheme = createLightTheme(myNewTheme);
  }, [basePaletteColor, isLightTheme]);

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
    renderCell: (item: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord) => {     
      return (
        <>
      <Avatar icon={<CheckmarkCircleRegular />} shape="square" aria-label="Complete" color="dark-green" className={classes.button} onClick={() => complete(item)}/>
      <Avatar icon={<DismissCircleRegular/>} shape="square" aria-label="Complete" color="red" className={classes.button} onClick={() => cancel(item)}/>
      <RowCommand 
          rowCommand={{                          
              dispatchEvent :  commandProps.dispatchEvent
            }}
            id={item.getRecordId()} 
            
          />
      </>
      )
    },
    renderHeaderCell : () => {
      return "Complete";
    }
  })
];

  const changeSelection = (e: any, data: any) => {
      const newIds = data.selectedItems;      
      setSelected(newIds);      
      dataset.setSelectedRecordIds(Array.from(newIds));
      onRecordSelected();
     // dataset.refresh();
  }
  return (
    <div style={{ width: "100%" }}>
    <FluentProvider theme={myTheme}>
     <DataGrid      
      items={items}
      columns={allColumns}      
      sortable      
      selectionMode="single"
      getRowId={(item) => item.getRecordId()}
      selectedItems={selected}
      onSelectionChange={changeSelection}
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