import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ReactElement, createElement } from 'react';
import { IToDosProps, ToDos } from "./ToDos";

export class Todo implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;      
    private container: HTMLDivElement;
    private lastDatasetChanged: Date = new Date();
    private dataset : ComponentFramework.PropertyTypes.DataSet;
    private totalRecordCount : number = 0;

    private rowCommandOutputs ?: string;
    private events : Function[] = [];

    private raiseDataChanged(id:string) {
        this.lastDatasetChanged = new Date;
        this.notifyOutputChanged();
    }    

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;        
      /*  this is a workaround for an issue with an earlier version of tabster introduced by the new Fluent UI controls in Power Apps
      if((window as any).__tabsterInstance?._version < "4.4.1"){
            (window as any).__tabsterInstance = null;
        }*/
    }



    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): ReactElement {    
        const props : IToDosProps = { 
            dataset: context.parameters.dataset, 
            onChanged: this.raiseDataChanged.bind(this),
            isCustomPage : context.parameters.isCustomPage.raw || false,
           onRecordSelected: (context as any).events.OnRecordSelected,
           commandProps: {                          
            dispatchEvent: (context as any).events?.OnRowCommand ? (value: any ) => {
                this.rowCommandOutputs = value;
                //(context as any).events?.OnRowCommand();
                this.events.push((context as any).events?.OnRowCommand);
                this.notifyOutputChanged();
            } : undefined
           }
         };    
        this.dataset = context.parameters.dataset;
        if(this.totalRecordCount != this.dataset.paging.totalResultCount){
            this.totalRecordCount = this.dataset.paging.totalResultCount;
            this.lastDatasetChanged = new Date();
            this.notifyOutputChanged();
        }
      /*  if(this.events.length > 0 ){
            this.events.forEach((e) => e());
            this.events = [];
        }*/
       return createElement(ToDos, props);
    }
    //Important24Filled
    //Important24Regular

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {        
        this.events.forEach((e) => e());
        this.events = [];        
        return { 
            onDataChanged : this.lastDatasetChanged, 
            totalCount: this.totalRecordCount, 
            objectOutput: { resordIds: this.dataset.sortedRecordIds, count : this.dataset.paging.totalResultCount }, 
            rowCommandOutputs : this.rowCommandOutputs
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {      
    }
}
