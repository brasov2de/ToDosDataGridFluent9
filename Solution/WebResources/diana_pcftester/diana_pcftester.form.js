
function AddOnPCFDataChanged(executionContext){
    const formContext = executionContext.getFormContext();
    const subgridName = "TodosSubgrid";
    const subgrid = formContext.getControl(subgridName);
    const timeline = formContext.getControl("Timeline");
    const counter = formContext.getAttribute("diana_counter");
    subgrid.addOnOutputChange(() =>{        
        const outputs = subgrid.getOutputs();
        console.log(outputs);
        let newcounter = outputs[`${subgridName}.totalCount`];        
        timeline.refresh();
        counter.setValue(newcounter.value);
    })
}