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

function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
};

let plusButton = document.getElementById('addParam');
plusButton.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount}" placeholder="Enter Parameter ${addedParamsCount} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount}" placeholder="Enter Parameter ${addedParamsCount} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                </div>`;
    addedParamsCount++;

    let paramElement = getElementFromString(string);
    //console.log(paramElement);
    // When a parameter has to be removed
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        });
    }
    params.appendChild(paramElement);
});

// If user clicks on Submit button 

let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    // Show please wait in the response box

    document.getElementById('responsePrism').innerHTML = "Please Wait... Fetching Response";
    // Fetch all the inputs that user fetched

    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    
    data = {};
    if(contentType=='params'){
        for(let i = 0; i<addedParamsCount-1;i++){
            if(document.getElementById('parameterValue'+(i+1))!=undefined){
                // Retrieving all parameters
                let key = document.getElementById('parameterKey'+(i+1)).value;
                let value = document.getElementById('parameterValue'+(i+1)).value;
                // Json Object for data
                data[key] = value;
            }
        }
        
        data = JSON.stringify(data);
    }else{
        // User clicked on json
        data = document.getElementById('requestJsonText').value;
    }

    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    if(requestType=='GET'){
        // Now a get request has to be invoked

        fetch(url, {
            method: 'GET'
        })
        .then(response => response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

    
});

