//Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let addedParamsCount = 2;

// if the user clicks on params box hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

// if the user clicks on json box hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

// adding more params when user clicks "+" button

let plusButton = document.getElementById('addParam');
plusButton.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount}" placeholder="Enter Parameter ${addedParamsCount} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount}" placeholder="Enter Parameter ${addedParamsCount} Value">
                    </div>
                </div>`;
    addedParamsCount++;

    
    
});



