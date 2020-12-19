import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import FirstPage from "@material-ui/core/SvgIcon/SvgIcon";
import { AddBox, Cancel, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, LastPage, Search, ArrowDownward } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";

export default function LessonForm(props) {

    const notifyParent = props.subscriber;
    const columns = [
        {title: 'Number', field: 'number', type: 'numeric'},
        {title: 'Name', field: 'name'},
        {title: 'Cost', field: 'cost', type: 'numeric'},
        {title: 'Link', field: 'link'},
    ];
    const [data, setData] = useState(props.chapter.lessons);

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <MaterialTable
                    components={{
                        Container: props => <Paper {...props} elevation={0}/>
                    }}
                    options={{
                        search: false,
                    }}
                    style={{ width: '100%' }}
                    title="Lessons"
                    icons={{
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        NextPage: ChevronRight,
                        PreviousPage: ChevronLeft,
                        Search: Search,
                        ResetSearch: Clear,
                        Add: AddBox,
                        Delete: DeleteOutline,
                        Edit,
                        Cancel,
                        Check,
                        Clear,
                        SortArrow: ArrowDownward

                    }}
                    columns={columns}
                    data={data}
                    editable={{
                        onRowAdd: newData => new Promise((resolve) => {
                            setData([...data, newData]);
                            notifyParent({...props.chapter, lessons: [...data, newData]});
                            resolve();
                        }),
                        onRowUpdate: (newData, oldData) => new Promise(resolve => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            notifyParent({...props.chapter, lessons: [...dataUpdate]});
                            resolve();
                        }),
                        onRowDelete: oldData => new Promise((resolve) => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            notifyParent({...props.chapter, lessons: [...dataDelete]});
                            resolve();
                        }),
                    }}
                />
            </Grid>
        </React.Fragment>
    );
}
