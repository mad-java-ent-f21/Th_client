const server = "http://localhost:8080/Th__war";
const engineTypes = [
    'Internal Combustion', 'Electric', 'Hybrid'
];

startTabListener();

function startTabListener() {
    getAllCountries();
    let tabs = document.querySelectorAll(('[data-bs-toggle]'));
    tabs.forEach(tab => {
        tab.removeEventListener('click', listenTabs);
        tab.addEventListener('click', listenTabs);
    })
}

async function sendRequest(url, method, data) {
    let request = {
        method: method
    }
    if (method !== 'GET' && method !== 'DELETE') {
        request.body = data;
        request.headers = {
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(url, request);
        if (method === 'GET') {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function listenTabs(event) {
    switch (event.target.id) {
        case 'nav-country-tab':
            getAllCountries();
            break;
        case 'nav-color-tab':
            getAllColors();
            break;
        case 'nav-engine-tab':
            getAllEngines();
            break;
        case 'nav-transmission-tab':
            getAllTransmissions();
            break;
        case 'nav-drive-train-tab':
            getAllDriveTrains();
            break;
        case 'nav-brand-tab':
            getAllBrands();
            break;
        case 'nav-model-tab':
            getAllModels();
            break;
        case 'nav-trim-tab':
            getAllTrims();
            break;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Country                                                     ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllCountries() {
    sendRequest(server + '/country', 'GET', null).then(countries => {
        fillCountryTable(countries);
    });
}

function addCountry() {
    event.preventDefault();
    let name = document.getElementById('countryName').value;
    let data = {
        id: 0,
        name: name
    };
    sendRequest(server + '/country', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/country', 'GET', null).then(countries => {
            fillCountryTable(countries);
        });
    });
}

function editCountry(id) {
    let newName = document.getElementById('countryNameEdit').value;
    let data = {
        id: id,
        name: newName
    }
    sendRequest(server + '/country', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/country', 'GET', null).then(countries => {
            fillCountryTable(countries);
        });
    });
}

function deleteCountry(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/country/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/country', 'GET', null).then(countries => {
                fillCountryTable(countries);
            });
        });
    }
}

function fillCountryTable(countries) {
    this.countriesGlobal = countries;
    const tableBody = document.getElementById('countryBody');
    tableBody.innerHTML = "";
    countries.forEach(country => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + country.id + '</td>' +
            '<td>' + country.name + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormCountry(' + country.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteCountry(' + country.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormCountry(id) {
    let editCountry = this.countriesGlobal.find(country => {
        return country.id === id;
    });
    const tableBody = document.getElementById('countryBody');
    let child = tableBody.querySelector('#editCountry') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editCountry';
    tr.innerHTML = '<td class="text-center fit">' + editCountry.id + '</td>' +
        '<td><input type="text" value="' + editCountry.name + '" id="countryNameEdit"></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editCountry('+editCountry.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllCountries()">Cancel</button></td>';
    tableBody.prepend(tr);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Color                                                     ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllColors() {
    sendRequest(server + '/color', 'GET', null).then(colors => {
        fillColorTable(colors);
    });
}

function addColor() {
    event.preventDefault();
    let name = document.getElementById('colorName').value;
    let code = document.getElementById('colorCode').value;
    let data = {
        id: 0,
        name: name,
        code: code
    };
    sendRequest(server + '/color', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/color', 'GET', null).then(colors => {
            fillColorTable(colors);
        });
    });
}

function editColor(id) {
    let name = document.getElementById('colorNameEdit').value;
    let code = document.getElementById('colorCodeEdit').value;
    let data = {
        id: id,
        name: name,
        code: code
    }
    sendRequest(server + '/color', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/color', 'GET', null).then(colors => {
            fillColorTable(colors);
        });
    });
}

function deleteColor(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/color/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/color', 'GET', null).then(colors => {
                fillColorTable(colors);
            });
        });
    }
}

function fillColorTable(colors) {
    this.colorsGlobal = colors;
    const tableBody = document.getElementById('colorBody');
    tableBody.innerHTML = "";
    colors.forEach(color => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + color.id + '</td>' +
            '<td>' + color.name + '</td>' +
            '<td>' + color.code + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormColor(' + color.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteColor(' + color.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormColor(id) {
    let editColor = this.colorsGlobal.find(color => {
        return color.id === id;
    });
    const tableBody = document.getElementById('colorBody');
    let child = tableBody.querySelector('#editColor') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editColor';
    tr.innerHTML = '<td class="text-center fit">' + editColor.id + '</td>' +
        '<td><input type="text" value="' + editColor.name + '" id="colorNameEdit"></td>' +
        '<td><input type="text" value="' + editColor.code + '" id="colorCodeEdit"></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editColor('+editColor.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllColors()">Cancel</button></td>';
    tableBody.prepend(tr);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Engine                                                      ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllEngines() {
    sendRequest(server + '/engine', 'GET', null).then(engines => {
        fillEngineTable(engines);
    });
}

function addEngine() {
    event.preventDefault();
    let type = document.getElementById('engineType').value;
    let displacement = document.getElementById('engineDisplacement').value;
    let cylinderCount = document.getElementById('engineCylinderCount').value;
    let voltage = document.getElementById('engineVoltage').value;
    let energyConsumption = document.getElementById('engineEnergyConsumption').value;
    let description = document.getElementById('engineDescription').value;
    let data = {
        id: 0,
        type,
        displacement,
        cylinderCount,
        voltage,
        energyConsumption,
        description
    };
    sendRequest(server + '/engine', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/engine', 'GET', null).then(engines => {
            fillEngineTable(engines);
        });
    });
}

function editEngine(id) {
    let type = document.getElementById('engineTypeEdit').value;
    let displacement = document.getElementById('engineDisplacementEdit').value;
    let cylinderCount = document.getElementById('engineCylinderCountEdit').value;
    let voltage = document.getElementById('engineVoltageEdit').value;
    let energyConsumption = document.getElementById('engineEnergyConsumptionEdit').value;
    let description = document.getElementById('engineDescriptionEdit').value;
    let data = {
        id,
        type,
        displacement,
        cylinderCount,
        voltage,
        energyConsumption,
        description
    }
    sendRequest(server + '/engine', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/engine', 'GET', null).then(engines => {
            fillEngineTable(engines);
        });
    });
}

function deleteEngine(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/engine/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/engine', 'GET', null).then(engines => {
                fillEngineTable(engines);
            });
        });
    }
}

function fillEngineTable(engines) {
    this.enginesGlobal = engines;
    const tableBody = document.getElementById('engineBody');
    tableBody.innerHTML = "";
    engines.forEach(engine => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + engine.id + '</td>' +
            '<td>' + engineTypes[engine.type] + '</td>' +
            '<td>' + engine.displacement + '</td>' +
            '<td>' + engine.cylinderCount + '</td>' +
            '<td>' + engine.voltage + '</td>' +
            '<td>' + engine.energyConsumption + '</td>' +
            '<td>' + engine.description + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormEngine(' + engine.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteEngine(' + engine.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormEngine(id) {
    let editEngine = this.enginesGlobal.find(engine => {
        return engine.id === id;
    });
    const tableBody = document.getElementById('engineBody');
    let child = tableBody.querySelector('#editEngine') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editEngine';
    tr.innerHTML = '<td class="text-center fit">' + editEngine.id + '</td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editEngine.type + '" id="engineTypeEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editEngine.displacement + '" id="engineDisplacementEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editEngine.cylinderCount + '" id="engineCylinderCountEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editEngine.voltage + '" id="engineVoltageEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editEngine.energyConsumption + '" id="engineEnergyConsumptionEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editEngine.description + '" id="engineDescriptionEdit"></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editEngine('+editEngine.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllEngines()">Cancel</button></td>';
    tableBody.prepend(tr);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Transmission                                                ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllTransmissions() {
    sendRequest(server + '/transmission', 'GET', null).then(transmissions => {
        fillTransmissionTable(transmissions);
    });
}

function addTransmission() {
    event.preventDefault();
    let name = document.getElementById('transmissionName').value;
    let gears = document.getElementById('transmissionGears').value;
    let automatic = document.getElementById('transmissionAutomatic').checked;
    let data = {
        id: 0,
        name,
        gears,
        automatic
    };
    sendRequest(server + '/transmission', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/transmission', 'GET', null).then(transmissions => {
            fillTransmissionTable(transmissions);
        });
    });
}

function editTransmission(id) {
    let name = document.getElementById('transmissionNameEdit').value;
    let gears = document.getElementById('transmissionGearsEdit').value;
    let automatic = document.getElementById('transmissionAutomaticEdit').value;
    let data = {
        id,
        name,
        gears,
        automatic
    };
    sendRequest(server + '/transmission', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/transmission', 'GET', null).then(transmissions => {
            fillTransmissionTable(transmissions);
        });
    });
}

function deleteTransmission(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/transmission/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/transmission', 'GET', null).then(transmissions => {
                fillTransmissionTable(transmissions);
            });
        });
    }
}

function fillTransmissionTable(transmissions) {
    this.transmissionsGlobal = transmissions;
    const tableBody = document.getElementById('transmissionBody');
    tableBody.innerHTML = "";
    transmissions.forEach(transmission => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + transmission.id + '</td>' +
            '<td>' + transmission.name + '</td>' +
            '<td>' + transmission.gears + '</td>' +
            '<td>' + transmission.automatic + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" id="edit-transmission-' + transmission.id + '" onclick="fillEditFormTransmission(' + transmission.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" id="delete-transmission-' + transmission.id + '" onclick="deleteTransmission(' + transmission.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormTransmission(id) {
    let editTransmission = this.transmissionsGlobal.find(transmission => {
        return transmission.id === id;
    });
    const tableBody = document.getElementById('transmissionBody');
    let child = tableBody.querySelector('#editTransmission') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editTransmission';
    tr.innerHTML = '<td class="text-center fit">' + editTransmission.id + '</td>' +
        '<td><input type="text" value="' + editTransmission.name + '" id="transmissionNameEdit"></td>' +
        '<td><input type="text" value="' + editTransmission.gears + '" id="transmissionGearsEdit"></td>' +
        '<td><input type="text" value="' + editTransmission.automatic + '" id="transmissionAutomaticEdit"></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editTransmission('+editTransmission.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllTransmissions()">Cancel</button></td>';
    tableBody.prepend(tr);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Drive Train                                                 ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllDriveTrains() {
    sendRequest(server + '/drive-train', 'GET', null).then(driveTrains => {
        fillDriveTrainTable(driveTrains);
    });
}

function addDriveTrain() {
    event.preventDefault();
    let type = document.getElementById('driveTrainType').value;
    let data = {
        id: 0,
        type
    };
    sendRequest(server + '/drive-train', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/drive-train', 'GET', null).then(driveTrains => {
            fillDriveTrainTable(driveTrains);
        });
    });
}

function editDriveTrain(id) {
    let type = document.getElementById('driveTrainTypeEdit').value;
    let data = {
        id,
        type
    }
    sendRequest(server + '/drive-train', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/drive-train', 'GET', null).then(driveTrains => {
            fillDriveTrainTable(driveTrains);
        });
    });
}

function deleteDriveTrain(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/drive-train/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/drive-train', 'GET', null).then(driveTrains => {
                fillDriveTrainTable(driveTrains);
            });
        });
    }
}

function fillDriveTrainTable(driveTrains) {
    this.driveTrainsGlobal = driveTrains;
    const tableBody = document.getElementById('driveTrainBody');
    tableBody.innerHTML = "";
    driveTrains.forEach(driveTrain => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + driveTrain.id + '</td>' +
            '<td>' + driveTrain.type + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormDriveTrain(' + driveTrain.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteDriveTrain(' + driveTrain.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormDriveTrain(id) {
    let editDriveTrain = this.driveTrainsGlobal.find(driveTrain => {
        return driveTrain.id === id;
    });
    const tableBody = document.getElementById('driveTrainBody');
    let child = tableBody.querySelector('#editDriveTrain') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editDriveTrain';
    tr.innerHTML = '<td class="text-center fit">' + editDriveTrain.id + '</td>' +
        '<td><input type="text" value="' + editDriveTrain.type + '" id="driveTrainTypeEdit"></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editDriveTrain('+editDriveTrain.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllDriveTrains()">Cancel</button></td>';
    tableBody.prepend(tr);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Brand                                                       ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllBrands() {
    sendRequest(server + '/brand', 'GET', null).then(brands => {
        fillBrandTable(brands);
    });
    if (!this.countriesGlobal) {
        sendRequest(server + '/country', 'GET', null).then(countries => {
            this.countriesGlobal = countries;
            let brandCountry = document.getElementById('brandCountry');
            this.countriesGlobal.forEach(country => {
                let option = document.createElement('option');
                option.value = country.id;
                option.innerText = country.name;
                brandCountry.append(option);
            })
        });
    } else {
        let brandCountry = document.getElementById('brandCountry');
        this.countriesGlobal.forEach(country => {
            let option = document.createElement('option');
            option.value = country.id;
            option.innerText = country.name;
            brandCountry.append(option);
        })
    }

}

function addBrand() {
    event.preventDefault();
    let name = document.getElementById('brandName').value;
    let country_id = document.getElementById('brandCountry').value;
    let country = this.countriesGlobal.find(country => {
        return country.id == country_id;
    });
    let data = {
        id: 0,
        name,
        country
    };
    sendRequest(server + '/brand', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/brand', 'GET', null).then(brands => {
            fillBrandTable(brands);
        });
    });
}

function editBrand(id) {
    let name = document.getElementById('brandNameEdit').value;
    let country_id = document.getElementById('brandCountryEdit').value;
    let country = this.countriesGlobal.find(country => {
        return country.id == country_id;
    });
    let data = {
        id,
        name,
        country
    }
    sendRequest(server + '/brand', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/brand', 'GET', null).then(brands => {
            fillBrandTable(brands);
        });
    });
}

function deleteBrand(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/brand/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/brand', 'GET', null).then(brands => {
                fillBrandTable(brands);
            });
        });
    }
}

function fillBrandTable(brands) {
    this.brandsGlobal = brands;
    const tableBody = document.getElementById('brandBody');
    tableBody.innerHTML = "";
    brands.forEach(brand => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + brand.id + '</td>' +
            '<td>' + brand.name + '</td>' +
            '<td>' + brand.country.name + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormBrand(' + brand.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteBrand(' + brand.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormBrand(id) {
    let editBrand = this.brandsGlobal.find(brand => {
        return brand.id === id;
    });
    const tableBody = document.getElementById('brandBody');
    let child = tableBody.querySelector('#editBrand') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editBrand';
    let options = '';
    this.countriesGlobal.forEach(country => {
        let selected = country.id == editBrand.country.id ? ' selected ' : '';
        options += '<option value="'+ country.id +'" '+ selected +'>' + country.name + '</option>';
    });
    tr.innerHTML = '<td class="text-center fit">' + editBrand.id + '</td>' +
        '<td><input type="text" value="' + editBrand.name + '" id="brandNameEdit"></td>' +
        '<td><select class="form-select" id="brandCountryEdit">' +
        options +
        '</select></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editBrand('+editBrand.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllBrands()">Cancel</button></td>';
    tableBody.prepend(tr);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Model                                                       ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllModels() {
    sendRequest(server + '/model', 'GET', null).then(models => {
        fillModelTable(models);
    });
    if (!this.brandsGlobal) {
        sendRequest(server + '/brand', 'GET', null).then(brands => {
            this.brandsGlobal = brands;
            let modelBrand = document.getElementById('modelBrand');
            this.brandsGlobal.forEach(brand => {
                let option = document.createElement('option');
                option.value = brand.id;
                option.innerText = brand.name;
                modelBrand.append(option);
            })
        });
    } else {
        let modelBrand = document.getElementById('modelBrand');
        this.brandsGlobal.forEach(brand => {
            let option = document.createElement('option');
            option.value = brand.id;
            option.innerText = brand.name;
            modelBrand.append(option);
        })
    }

    if (!this.colorsGlobal) {
        sendRequest(server + '/color', 'GET', null).then(colors => {
            this.colorsGlobal = colors;
            let modelColors = document.getElementById('modelColors');
            this.colorsGlobal.forEach(color => {
                let option = document.createElement('option');
                option.value = color.id;
                option.innerText = color.name;
                modelColors.append(option);
            })
        });
    } else {
        let modelColors = document.getElementById('modelColors');
        this.colorsGlobal.forEach(color => {
            let option = document.createElement('option');
            option.value = color.id;
            option.innerText = color.name;
            modelColors.append(option);
        })
    }

}

function addModel() {
    event.preventDefault();
    let name = document.getElementById('modelName').value;
    let year = document.getElementById('modelYear').value;
    let seats = document.getElementById('modelSeats').value;
    let description = document.getElementById('modelDescription').value;
    let brand_id = document.getElementById('modelBrand').value;
    let brand = this.brandsGlobal.find(brand => {
        return brand.id == brand_id;
    });
    const selected = document.querySelectorAll('#modelColors option:checked');
    const color_ids = Array.from(selected).map(el => +el.value);
    let colors = [];
    this.colorsGlobal.forEach(color => {
        if (color_ids.includes(color.id)) {
            colors.push(color);
        }
    })
    let data = {
        id: 0,
        name,
        year,
        seats,
        description,
        brand,
        colors
    };
    sendRequest(server + '/model', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/model', 'GET', null).then(models => {
            fillModelTable(models);
        });
    });
}

function editModel(id) {
    let name = document.getElementById('modelNameEdit').value;
    let year = document.getElementById('modelYearEdit').value;
    let seats = document.getElementById('modelSeatsEdit').value;
    let description = document.getElementById('modelDescriptionEdit').value;
    let brand_id = document.getElementById('modelBrandEdit').value;
    let brand = this.brandsGlobal.find(brand => {
        return brand.id == brand_id;
    });
    const selected = document.querySelectorAll('#modelColorsEdit option:checked');
    const color_ids = Array.from(selected).map(el => +el.value);
    let colors = [];
    this.colorsGlobal.forEach(color => {
        if (color_ids.includes(color.id)) {
            colors.push(color);
        }
    })
    let data = {
        id,
        name,
        year,
        seats,
        description,
        brand,
        colors
    }
    sendRequest(server + '/model', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/model', 'GET', null).then(models => {
            fillModelTable(models);
        });
    });
}

function deleteModel(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/model/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/model', 'GET', null).then(models => {
                fillModelTable(models);
            });
        });
    }
}

function fillModelTable(models) {
    this.modelsGlobal = models;
    const tableBody = document.getElementById('modelBody');
    tableBody.innerHTML = "";
    models.forEach(model => {
        let tr = document.createElement('tr');
        let options = '';
        if(model.colors) {
            model.colors.forEach(color => {
                options += '<option value="'+ color.id +'">' + color.name + '</option>';
            });
        }

        tr.innerHTML = '<td class="text-center fit">' + model.id + '</td>' +
            '<td>' + model.name + '</td>' +
            '<td>' + model.year + '</td>' +
            '<td>' + model.seats + '</td>' +
            '<td>' + model.description + '</td>' +
            '<td>' + model.brand.name + '</td>' +
            '<td><select class="form-select" id="modelColor">' +
            options +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormModel(' + model.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteModel(' + model.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormModel(id) {
    let editModel = this.modelsGlobal.find(model => {
        return model.id === id;
    });
    const tableBody = document.getElementById('modelBody');
    let child = tableBody.querySelector('#editModel') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editModel';
    let options = '';
    this.brandsGlobal.forEach(brand => {
        let selected = brand.id == editModel.brand.id ? ' selected ' : '';
        options += '<option value="'+ brand.id +'" '+ selected +'>' + brand.name + '</option>';
    });
    let optionsColors = '';
    this.colorsGlobal.forEach(color => {
        let selected = '';
        if (editModel.colors.find(item => {
            return item.id == color.id
        })) {
            selected = 'selected';
        }
        optionsColors += '<option value="'+ color.id +'" '+ selected +'>' + color.name + '</option>';
    })

    tr.innerHTML = '<td class="text-center fit">' + editModel.id + '</td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editModel.name + '" id="modelNameEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editModel.year + '" id="modelYearEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editModel.seats + '" id="modelSeatsEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editModel.description + '" id="modelDescriptionEdit"></td>' +
        '<td class="fit"><select class="form-select" id="modelBrandEdit">' +
        options +
        '</select></td>' +
        '<td class="fit"><select class="form-select" id="modelColorsEdit" multiple>' +
        optionsColors +
        '</select></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editModel('+editModel.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllModels()">Cancel</button></td>';
    tableBody.prepend(tr);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                                             Trim                                                       ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getAllTrims() {
    sendRequest(server + '/trim', 'GET', null).then(trims => {
        fillTrimTable(trims);
    });
    if (!this.modelsGlobal) {
        sendRequest(server + '/model', 'GET', null).then(models => {
            this.modelsGlobal = models;
            let trimModel = document.getElementById('trimModel');
            this.modelsGlobal.forEach(model => {
                let option = document.createElement('option');
                option.value = model.id;
                option.innerText = model.name;
                trimModel.append(option);
            })
        });
    } else {
        let trimModel = document.getElementById('trimModel');
        this.modelsGlobal.forEach(model => {
            let option = document.createElement('option');
            option.value = model.id;
            option.innerText = model.name;
            trimModel.append(option);
        })
    }

    if (!this.enginesGlobal) {
        sendRequest(server + '/engine', 'GET', null).then(engines => {
            this.enginesGlobal = engines;
            let trimEngine = document.getElementById('trimEngine');
            this.enginesGlobal.forEach(engine => {
                let option = document.createElement('option');
                option.value = engine.id;
                option.innerText = engine.description;
                trimEngine.append(option);
            })
        });
    } else {
        let trimEngine = document.getElementById('trimEngine');
        this.enginesGlobal.forEach(engine => {
            let option = document.createElement('option');
            option.value = engine.id;
            option.innerText = engine.description;
            trimEngine.append(option);
        })
    }

    if (!this.driveTrainsGlobal) {
        sendRequest(server + '/drive-train', 'GET', null).then(driveTrains => {
            this.driveTrainsGlobal = driveTrains;
            let trimDriveTrain = document.getElementById('trimDriveTrain');
            this.driveTrainsGlobal.forEach(driveTrain => {
                let option = document.createElement('option');
                option.value = driveTrain.id;
                option.innerText = driveTrain.type;
                trimDriveTrain.append(option);
            })
        });
    } else {
        let trimDriveTrain = document.getElementById('trimDriveTrain');
        this.driveTrainsGlobal.forEach(driveTrain => {
            let option = document.createElement('option');
            option.value = driveTrain.id;
            option.innerText = driveTrain.type;
            trimDriveTrain.append(option);
        })
    }

    if (!this.transmissionsGlobal) {
        sendRequest(server + '/transmission', 'GET', null).then(transmissions => {
            this.transmissionsGlobal = transmissions;
            let trimTransmission = document.getElementById('trimTransmission');
            this.transmissionsGlobal.forEach(transmission => {
                let option = document.createElement('option');
                option.value = transmission.id;
                option.innerText = transmission.name;
                trimTransmission.append(option);
            })
        });
    } else {
        let trimTransmission = document.getElementById('trimTransmission');
        this.transmissionsGlobal.forEach(transmission => {
            let option = document.createElement('option');
            option.value = transmission.id;
            option.innerText = transmission.name;
            trimTransmission.append(option);
        })
    }
}

function addTrim() {
    event.preventDefault();
    let name = document.getElementById('trimName').value;
    let fuelConsumption = document.getElementById('trimFuelConsumption').value;
    let forcedInduction = document.getElementById('trimForcedInduction').value;
    let description = document.getElementById('trimDescription').value;

    let engine_id = document.getElementById('trimEngine').value;
    let engine = this.enginesGlobal.find(engine => {
        return engine.id == engine_id;
    });

    let driveTrain_id = document.getElementById('trimDriveTrain').value;
    let driveTrain = this.driveTrainsGlobal.find(driveTrain => {
        return driveTrain.id == driveTrain_id;
    });

    let transmission_id = document.getElementById('trimTransmission').value;
    let transmission = this.transmissionsGlobal.find(transmission => {
        return transmission.id == transmission_id;
    });

    let model_id = document.getElementById('trimModel').value;
    let model = this.modelsGlobal.find(model => {
        return model.id == model_id;
    });

    let data = {
        id: 0,
        model,
        name,
        fuelConsumption,
        forcedInduction,
        description,
        engine,
        driveTrain,
        transmission
    };
    console.log(data);
    sendRequest(server + '/trim', 'POST', JSON.stringify(data)).then(() => {
        sendRequest(server + '/trim', 'GET', null).then(trims => {
            fillTrimTable(trims);
        });
    });
}

function editTrim(id) {
    let name = document.getElementById('trimNameEdit').value;
    let fuelConsumption = document.getElementById('trimFuelConsumptionEdit').value;
    let forcedInduction = document.getElementById('trimForcedInductionEdit').value;
    let description = document.getElementById('trimDescriptionEdit').value;


    let engine_id = document.getElementById('trimEngineEdit').value;
    let engine = this.enginesGlobal.find(engine => {
        return engine.id == engine_id;
    });

    let driveTrain_id = document.getElementById('trimDriveTrainEdit').value;
    let driveTrain = this.driveTrainsGlobal.find(driveTrain => {
        return driveTrain.id == driveTrain_id;
    });

    let transmission_id = document.getElementById('trimTransmissionEdit').value;
    let transmission = this.transmissionsGlobal.find(transmission => {
        return transmission.id == transmission_id;
    });

    let model_id = document.getElementById('trimModelEdit').value;
    let model = this.modelsGlobal.find(model => {
        return model.id == model_id;
    });

    let data = {
        id,
        model,
        name,
        fuelConsumption,
        forcedInduction,
        description,
        engine,
        driveTrain,
        transmission
    };
    sendRequest(server + '/trim', 'PATCH', JSON.stringify(data)).then(() => {
        sendRequest(server + '/trim', 'GET', null).then(trims => {
            fillTrimTable(trims);
        });
    });
}

function deleteTrim(id) {
    let confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete == true) {
        sendRequest(server + '/trim/' + id, 'DELETE', null).then(() => {
            sendRequest(server + '/trim', 'GET', null).then(trims => {
                fillTrimTable(trims);
            });
        });
    }
}

function fillTrimTable(trims) {
    this.trimsGlobal = trims;
    const tableBody = document.getElementById('trimBody');
    tableBody.innerHTML = "";
    trims.forEach(trim => {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td class="text-center fit">' + trim.id + '</td>' +
            '<td>' + trim.name + '</td>' +
            '<td class="fit">' + trim.fuelConsumption + '</td>' +
            '<td>' + trim.model.name + '</td>' +
            '<td>' + trim.engine.description + '</td>' +
            '<td>' + trim.driveTrain.type + '</td>' +
            '<td>' + trim.transmission.name + '</td>' +
            '<td>' + trim.forcedInduction + '</td>' +
            '<td>' + trim.description + '</td>' +
            '<td class="text-center fit"><i class="fas fa-pen-square" onclick="fillEditFormTrim(' + trim.id + ')"></i></td>' +
            '<td class="text-center fit"><i class="fas fa-trash-alt" onclick="deleteTrim(' + trim.id + ')"></i></td>';
        tableBody.append(tr);
    });
}

function fillEditFormTrim(id) {
    let editTrim = this.trimsGlobal.find(trim => {
        return trim.id === id;
    });
    const tableBody = document.getElementById('trimBody');
    let child = tableBody.querySelector('#editTrim') ?? null;
    if (child) {
        tableBody.removeChild(child);
    }
    let tr = document.createElement('tr');
    tr.id = 'editTrim';

    let optionsModel = '';
    this.modelsGlobal.forEach(model => {
        let selected = model.id == editTrim.model.id ? ' selected ' : '';
        optionsModel += '<option value="'+ model.id +'" '+ selected +'>' + model.name + '</option>';
    });

    let optionsEngine = '';
    this.enginesGlobal.forEach(engine => {
        let selected = engine.id == editTrim.engine.id ? ' selected ' : '';
        optionsEngine += '<option value="'+ engine.id +'" '+ selected +'>' + engine.description + '</option>';
    });

    let optionsDriveTrain = '';
    this.driveTrainsGlobal.forEach(driveTrain => {
        let selected = driveTrain.id == editTrim.driveTrain.id ? ' selected ' : '';
        optionsDriveTrain += '<option value="'+ driveTrain.id +'" '+ selected +'>' + driveTrain.type + '</option>';
    });

    let optionsTransmission = '';
    this.transmissionsGlobal.forEach(transmission => {
        let selected = transmission.id == editTrim.transmission.id ? ' selected ' : '';
        optionsTransmission += '<option value="'+ transmission.id +'" '+ selected +'>' + transmission.name + '</option>';
    });





    tr.innerHTML = '<td class="text-center fit">' + editTrim.id + '</td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editTrim.name + '" id="trimNameEdit"></td>' +
        '<td class="fit"><input type="number" class="mw-60" value="' + editTrim.fuelConsumption + '" id="trimFuelConsumptionEdit"></td>' +
        '<td class="fit"><select class="form-select" id="trimModelEdit">' +
        optionsModel +
        '</select></td>' +
        '<td class="fit"><select class="form-select" id="trimEngineEdit">' +
        optionsEngine +
        '</select></td>' +
        '<td class="fit"><select class="form-select" id="trimDriveTrainEdit">' +
        optionsDriveTrain +
        '</select></td>' +

        '<td class="fit"><select class="form-select" id="trimTransmissionEdit">' +
        optionsTransmission +
        '</select></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editTrim.forcedInduction + '" id="trimForcedInductionEdit"></td>' +
        '<td class="fit"><input type="text" class="mw-60" value="' + editTrim.description + '" id="trimDescriptionEdit"></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-primary" onclick="editTrim('+editTrim.id+')">Save</button></td>' +
        '<td class="text-center fit"><button class="btn btn-small btn-danger" onclick="getAllTrims()">Cancel</button></td>';
    tableBody.prepend(tr);
}
