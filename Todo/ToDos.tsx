import {
    DataGridBody,
    DataGrid,
    DataGridRow,
    DataGridHeader,
    DataGridCell,
    DataGridHeaderCell,
} from "@fluentui/react-data-grid-react-window";

type EntityRecord = ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
import {  
  Avatar, makeStyles,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  DataGridProps,
  FluentProvider,
  webLightTheme  
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
/*import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
*/
/*
type FileCell = {
  label: string;
  icon?: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon?: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes" },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
   
    },
  },
  {
    file: { label: "Thursday presentation"},
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
     
    },
  },
  {
    file: { label: "Training recording" },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
   
    },
  },
  {
    file: { label: "Purchase order" },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
     
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return "File";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "author",
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return "Author";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status }}
            />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return "Last updated";
    },

    renderCell: (item) => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdate",
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return "Last update";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

*/

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
  dataset : ComponentFramework.PropertyTypes.DataSet
}
export const ToDos = ({dataset}: IToDosProps) => {
  const [selected, setSelected] = React.useState<any[]>([]);

  const classes = useStyles();

  const complete = (item:any) => {
    console.log("complete");
    console.log(item.getRecordId());
  }
  
  const cancel = (item:any) => {
    console.log("cancel");
    console.log(item.getRecordId());
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
  }),  
  /*createTableColumn({
    columnId: "cancel",
    renderCell: (item) => {
      {
        return <Avatar icon={<DismissCircleRegular/>} shape="square" aria-label="Complete" color="red" className={classes.button} onClick={() => cancel(item)}/>
      }
    },
    renderHeaderCell : () => {
      return "Cancel";
    }
  }), */
  ...columns
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