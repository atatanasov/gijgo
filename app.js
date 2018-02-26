var express = require('express'),
    fs = require('fs'),
    url = require('url'),
    lodash = require('lodash'),
    server = express(),
    locations;

server.use(express.static(__dirname));

locations = [
    { id: 1, parentId: undefined, text: 'Asia' },
    { id: 5, parentId: 1, text: 'China' },
    { id: 6, parentId: 1, text: 'Japan' },
    { id: 7, parentId: 1, text: 'Mongolia' },
    { id: 2, parentId: undefined, text: 'North America' },
    { id: 8, parentId: 2, text: 'USA' },
    { id: 9, parentId: 8, text: 'California', population: 39144818 },
    { id: 10, parentId: 8, text: 'Florida', population: 20271272 },
    { id: 11, parentId: 2, text: 'Canada' },
    { id: 12, parentId: 2, text: 'Mexico' },
    { id: 3, parentId: undefined, text: 'South America' },
    { id: 13, parentId: 3, text: 'Brazil' },
    { id: 14, parentId: 3, text: 'Argentina' },
    { id: 15, parentId: 3, text: 'Columbia' },
    { id: 4, parentId: undefined, text: 'Europe' },
    { id: 16, parentId: 4, text: 'Germany' },
    { id: 17, parentId: 4, text: 'England' },
    { id: 18, parentId: 4, text: 'Bulgaria' },
    { id: 19, parentId: 4, text: 'Poland' }
];

server.get('/Players/Get', function (req, res) {
    var params, data, result, name, placeOfBirth, startInd, page, limit;

    params = url.parse(req.url, true).query;
    data = [
		{ 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', 'DateOfBirth': '\/Date(-122954400000)\/', 'IsActive': false, 'CountryID': 18, 'CountryName': 'Bulgaria' },
        { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', 'DateOfBirth': '\/Date(211842000000)\/', 'IsActive': false, 'CountryID': 13, 'CountryName': 'Brazil' },
        { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', 'DateOfBirth': '\/Date(-112417200000)\/', 'IsActive': false, 'CountryID': 17, 'CountryName': 'England' },
        { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', 'DateOfBirth': '\/Date(512258400000)\/', 'IsActive': true, 'CountryID': 16, 'CountryName': 'Germany' },
        { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', 'DateOfBirth': '\/Date(679266000000)\/', 'IsActive': true, 'CountryID': 15, 'CountryName': 'Colombia' },
        { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', 'DateOfBirth': '\/Date(349653600000)\/', 'IsActive': true, 'CountryID': 18, 'CountryName': 'Bulgaria' },
        { 'ID': 7, 'Name': 'Robert Lewandowski', 'PlaceOfBirth': 'Warsaw, Poland', 'DateOfBirth': '\/Date(588168000000)\/', 'IsActive': true, 'CountryID': 19, 'CountryName': 'Poland' }
    ];
    result = [];

    name = params.name || params.Name;
    if (name) {
        result = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].Name.indexOf(name) > -1) {
                result.push(data[i]);
            }
        }
        data = result;
    }

    placeOfBirth = params.placeOfBirth || params.PlaceOfBirth;
    if (placeOfBirth) {
        result = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].PlaceOfBirth.indexOf(placeOfBirth) > -1) {
                result.push(data[i]);
            }
        }
        data = result;
    }

    if (params.sortBy) {
        if (params.direction === 'desc') {
            data.sort(function compare(a, b) {
                return ((a[params.sortBy] > b[params.sortBy]) ? -1 : ((a[params.sortBy] < b[params.sortBy]) ? 1 : 0));
            });
        } else {
            data.sort(function compare(a, b) {
                return ((a[params.sortBy] < b[params.sortBy]) ? -1 : ((a[params.sortBy] > b[params.sortBy]) ? 1 : 0));
            });
        }
    }

    if (params.groupBy && params.groupByDirection) {
        if (params.groupByDirection === 'asc') {
            data.sort(function compare(a, b) {
                return ((a[params.groupBy] < b[params.groupBy]) ? -1 : ((a[params.groupBy] > b[params.groupBy]) ? 1 : 0));
            });
        } else {
            data.sort(function compare(a, b) {
                return ((a[params.groupBy] > b[params.groupBy]) ? -1 : ((a[params.groupBy] < b[params.groupBy]) ? 1 : 0));
            });
        }
    }

    if (params.page && params.limit) {
        page = parseInt(params.page, 10);
        limit = parseInt(params.limit, 10);
        startInd = (page - 1) * limit;
        result = data.slice(startInd, startInd + limit);
    } else {
        result = data;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send({ records: result, total: data.length });
});

function getChildren(data, id, recursive) {
    var children, result = lodash.filter(data, i => i.parentId === id);
    for (var i = 0; i < result.length; i++) {
        if (recursive) {
            children = getChildren(data, result[i].id);
            if (children && children.length) {
                result[i].children = children;
            }
            delete result[i].parentId;
        }
    }
    return result;
}

server.get('/Locations/Get', function (req, res) {
    var params, data, result, i;

    data = JSON.parse(JSON.stringify(locations));
    params = url.parse(req.url, true).query;

    if (params.query) {
        result = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].text.indexOf(params.query) > -1) {
                result.push(data[i]);
            }
        }
        data = result;
    }

    result = lodash.filter(data, i => i.parentId === undefined);
    for (i = 0; i < result.length; i++) {
        result[i].children = getChildren(data, result[i].id, true);
        delete result[i].parentId;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

server.get('/Locations/LazyGet', function (req, res) {
    var params, data, result, i, children;

    data = JSON.parse(JSON.stringify(locations));
    params = url.parse(req.url, true).query;

    if (params.query) {
        result = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].text.indexOf(params.query) > -1) {
                result.push(data[i]);
            }
        }
        data = result;
    }
    
    if (params.parentId) {
        result = lodash.filter(data, i => i.parentId == params.parentId);
        for (i = 0; i < result.length; i++) {
            children = getChildren(data, result[i].id, false);
            result[i].hasChildren = children && children.length > 0;
            delete result[i].parentId;
        }
    } else {
        result = lodash.filter(data, i => i.parentId === undefined);
        for (i = 0; i < result.length; i++) {
            children = getChildren(data, result[i].id, false);
            result[i].hasChildren = children && children.length > 0;
            delete result[i].parentId;
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});


server.get('/Locations/GetCountries', function (req, res) {
    var data, countries = [], i;

    data = JSON.parse(JSON.stringify(locations));

    result = lodash.filter(data, i => i.parentId === undefined);
    for (i = 0; i < result.length; i++) {
        countries = countries.concat(getChildren(data, result[i].id, false));
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(countries);
});

server.listen(4000);