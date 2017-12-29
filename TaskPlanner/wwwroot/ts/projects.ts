﻿import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Filter, Grid, Page, QueryCellInfoEventArgs, Sort, Toolbar } from '@syncfusion/ej2-grids';
Grid.Inject(Sort, Page, Filter, Toolbar);
declare let storiesList: any;

function tooltip(querycell: QueryCellInfoEventArgs) {
	if (querycell.data[querycell.column.field]) {
		querycell.cell.setAttribute('title', querycell.data[querycell.column.field]);
	}
}


let storyListGrid: Grid = new Grid({
	rowTemplate: '#rowtemplate',
	columns: [
		{ field: 'ProjectId' },
		{ field: 'ProjectName' },
		{ field: 'ProjectDescription' },
	],
	dataSource: storiesList,
	queryCellInfo: tooltip,
});
storyListGrid.appendTo('#projectGrid');

(<any>window).editClick = function (id) {
	alert(id);
};
(<any>window).deleteClick = function (id) {
    
    
    var confirm = (<any>window).confirm("Are you sure you want to delete project? Once deleted it cannot be recovered.");

    if (!confirm)
        return false;

    $.ajax({
        data: { 'projectId': id},
        success: function (response) {
            if (response.isSuccess === true) {
               // window.location.href = "/products#all";
                toastr.success(response.message);
            }
            else {
                toastr.error(response.message);
            }
        },
        error: function () {
            toastr.error("Unexpected error occured");
        },
        complete: function () {
        },
        type: 'POST',
        timeout: 180000,
        url: '/project/delete/' + id,
    });

};
(<any>window).faviouriteClick = function (id) {

    

    $.ajax({
        data: { 'projectId': id },
        success: function (response) {
            if (response.isSuccess === true) {
                // window.location.href = "/products#all";
                toastr.success(response.message);
            }
            else {
                toastr.error(response.message);
            }
        },
        error: function () {
            toastr.error("Unexpected error occured");
        },
        complete: function () {
        },
        type: 'POST',
        timeout: 180000,
        url: '/project/favourite/' + id,
    });
};
(<any>window).shareClick = function (id) {
	alert(id);
};
(<any>window).permissionClick = function (id) {
	alert(id);
};

(<any>window).gridRowClick = function (row) {
	$.each($(".grid-row"), function (key, value) {	
		$(this).removeClass('active');
	});
	$(row).addClass('active');

	window.location.href = "/";
};
