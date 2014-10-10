$(document).ready(function () {
    var readServiceBaseUrl = "/api/recipe-categories/",
        crudServiceBaseUrl = "/api/admin/recipe-categories/";

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: readServiceBaseUrl,
                dataType: "json",
                contentType: "application/json",
                type: "GET"
            },
            update: {
                url: crudServiceBaseUrl,
                dataType: "json",
                contentType: "application/json",
                type: "PUT"
            },
            create: {
                url: crudServiceBaseUrl,
                dataType: "json",
                contentType: "application/json",
                type: "POST"
            },
            parameterMap: function (options, operation) {
                if (["create", "update"].indexOf(operation) !== -1 && options.models) {
                    return JSON.stringify(options.models[0]);
                }

                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        pageSize: 7,
        batch: true,
        schema: {
            model: {
                id: "_id",
                fields: {
                    _id: { editable: false, nullable: true },
                    name: { validation: { required: true } }
                }
            }
        }
    });

    $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        toolbar: ["create"],
        columns: [
            { field: "name", title: "Recipe Category Name" },
            { command: ["edit"], title: "&nbsp;", width: "200px" }
        ],
        editable: "inline"
    });
});