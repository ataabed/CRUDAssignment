var bookMarkList = [];
var siteName = document.getElementById('frmSiteName');
var siteUrl = document.getElementById('frmSiteUrl');
var searchKeyword = document.getElementById('frmSearchBookMark');
var localStorage_bookMark = 'savedBookMark';

// page Load 
displaySavedBookMark();
// local storage functions 

function StoreInLocalStorage(name, data) {
    if (typeof (Storage) !== undefined) {
        localStorage.setItem(name, JSON.stringify(data));

    }

}


function ClearInLocalStorage() {
    if (typeof (Storage) !== undefined) {
        localStorage.clear();
    }
}

function getDataFromLocalStorage(dataKey) {
    return JSON.parse(localStorage.getItem(dataKey));

}

// end of local storage function 


// display data on page load 

function displaySavedBookMark() {
    if (Storage !== undefined) {
        var savedlist = getDataFromLocalStorage(localStorage_bookMark);
        /*          JSON.parse(localStorage.getItem(localStorage_bookMark));
         */
        if (savedlist.length > 0) {


            for (var i = 0; i < savedlist.length; i++) {
                bookMarkList.push(savedlist[i]);
            }

            displayData(bookMarkList);

        }

    }

}



// End of display data on page load 

function resetData() {
    siteName.value = "";
    siteUrl.value = "";
}
function clearValidationMarks() {
    if (siteName.classList.contains('is-valid')) {
        siteName.classList.remove('is-valid');
    }
    if (siteName.classList.contains('is-invalid')) {
        siteName.classList.remove('is-invalid');
    }

    if (siteUrl.classList.contains('is-valid')) {
        siteUrl.classList.remove('is-valid');
    }
    if (siteUrl.classList.contains('is-invalid')) {
        siteUrl.classList.remove('is-invalid');
    }
}
function update_UI_LocalStorage() {
    displayData(bookMarkList);
    StoreInLocalStorage(localStorage_bookMark, bookMarkList);

}
function displayData(dataList) {
    var tbody_data = document.getElementById('tbody_data');

    var content = '';

    for (var i = 0; i < dataList.length; i++) {
        var newRow = ` <tr>
        <th class="py-3 px-1">
          ${i + 1}
        </th>
        <td colspan='6' class="py-3 px-1">
            ${dataList[i].Name}
        </td>
        <td>
        <a href="${dataList[i].URL}"
        
        target="_blank" class="btn btn-visit  rounded-3 "
        data-bs-toggle="tooltip" data-bs-placement="left" title="Visit!">
        
        <i class="fa-solid fa-eye me-1"></i> <span class='d-none d-lg-inline-block'> Visit</span>
      </a>
        </td>
        <td>
        <button onclick="editBookMark(${i})" 
        class="btn btn-success  rounded-3 "
        data-bs-toggle="tooltip" data-bs-placement="left" title="Edit!" >
            <i class="fa-solid fa-edit me-1"></i> <span class='d-none d-lg-inline-block'> Edit</span>
          </button>
    </td>
        <td>
            <button onclick="removeWebSite(${i})"
             class="btn btn-danger rounded-3"
             data-bs-toggle="tooltip" data-bs-placement="left" title="Delete!"
             ">
                <i class="fa-solid fa-trash-can me-1"></i> <span class='d-none d-lg-inline-block'> Delete</span>
              </button>
        </td>
    </tr>`;

        content += newRow;
    }

    tbody_data.innerHTML = content;


}
function addNewBookMark() {
    if (validateSiteName() == true && validateSiteUrl() == true) {
        var newBookMark = { Name: "", URL: "" };
        newBookMark.Name = siteName.value;
        newBookMark.URL = siteUrl.value;
        bookMarkList.push(newBookMark);
        update_UI_LocalStorage();
        resetData();
        clearValidationMarks();
    }
    else {
        var myModal  = new bootstrap.Modal(document.getElementById('myModal'))
myModal.show();
       //document.getElementById('myModal').
    }

    /*   displayData();
      StoreInLocalStorage(localStorage_bookMark,bookMarkList);
   */

}

function removeWebSite(i) {
    bookMarkList.splice(i, 1);
    update_UI_LocalStorage();
    resetData();
    /*    displayData();
       StoreInLocalStorage(localStorage_bookMark,bookMarkList);
     */
}

/*search book mark*/

function searchBookMark() {

    var noData = ``;
    if (bookMarkList.length == 0) {
        noData = `<tr><td colspan='5'> there is no BookMark Saved </td></tr>`
        document.getElementById('tbody_data').innerHTML = noData;
        return 0;
    }
    if (searchKeyword.value.length > 0) {
        var tempList = [];
        for (var i = 0; i < bookMarkList.length; i++) {
            if (bookMarkList[i].Name.toLowerCase().includes(searchKeyword.value.toLowerCase()) === true) {
                tempList.push(bookMarkList[i]);
            }

        }
        if (tempList.length > 0) {
            displayData(tempList);
            return 0;
        }
        else {
            noData = `<tr><td colspan='5'> this book mark not exist </td></tr>`
            document.getElementById('tbody_data').innerHTML = noData;
            return 0;

        }

    }
    else {
        displayData(bookMarkList);
        return 0;

    }
}
// edit  saved  data 

function editBookMark(i)
{
    siteName.value=bookMarkList[i].Name;
    siteUrl.value=bookMarkList[i].URL;
    document.getElementById('bookmark_index').value=i;
    document.getElementById('btn_saveChanges').classList.replace('d-none','d-block');
    document.getElementById('btn-addNewBookMark').classList.add('d-none');



}
function saveChanges()
{
   var i = document.getElementById('bookmark_index').value;
bookMarkList[i].Name=siteName.value;
bookMarkList[i].URL=siteUrl.value;

update_UI_LocalStorage();
resetData();
clearValidationMarks();
document.getElementById('btn_saveChanges').classList.replace('d-block','d-none');
document.getElementById('btn-addNewBookMark').classList.replace('d-none','d-block');


}
// site Name and Site Url Validation 

function checkSiteName() {
    var Pattern_bookMarkName = /^[A-Za-z]{3,}$/

  

return Pattern_bookMarkName.test(siteName.value) ;


}

function validateSiteName() {
    if (checkSiteName() == false) {

        document.getElementById('frmSiteName_error').classList.replace('d-none','d-block')

        if (siteName.classList.contains('is-valid')) {
            siteName.classList.replace('is-valid', 'is-invalid');
        }
        else {
            siteName.classList.add('is-invalid')
        }

        return false;
    }
    else {
        document.getElementById('frmSiteName_error').classList.replace('d-block','d-none')

        if (siteName.classList.contains('is-invalid')) {
            siteName.classList.replace('is-invalid', 'is-valid');
        }
        else {
            siteName.classList.add('is-valid')
        }

        return true;
    }



}
function checkSiteUrl() {
    var Pattern_bookMarkUrl = 
    /^(https:?\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(\/\w+)*?\??(\w{2,})?\=?(\w{1,})?$/

var pp=/^(https:?\/\/)?([\w]{3,}|\W{3,}|([\w]{3,}\.)?|([\w]{3,}\.[A-Za-z]{3,})?|([\w]{3,}\.[A-Za-z]{3,}\.[A-Za-z0-9]{3}\/?)?|([\w]{3,}\.[A-Za-z]{3,}\.[A-Za-z0-9]{3}\/[\w]{1,})?|([\w]{3,}\.[A-Za-z]{3,}\.[A-Za-z0-9]{3}\/[\w]{1,}[\W]{1}?\/?([A-Za-z0-9]{1,}[\W]?\/?[A-Za-z0-9]{1,}[\W]?))?)$/;

    return pp.test(siteUrl.value);
}

function validateSiteUrl() {
    if (checkSiteUrl() == false) {
        document.getElementById('frmSiteUrl_error').classList.replace('d-none','d-block')

        if (siteUrl.classList.contains('is-valid')) {
            siteUrl.classList.replace('is-valid', 'is-invalid');
        }
        else {
            siteUrl.classList.add('is-invalid')
        }
        return false;
    }
    else {
        document.getElementById('frmSiteUrl_error').classList.replace('d-block','d-none')

        if (siteUrl.classList.contains('is-invalid')) {
            siteUrl.classList.replace('is-invalid', 'is-valid');
        }
        else {
            siteUrl.classList.add('is-valid')
        }

        return true;
    }



}

/*BootStrap tooltip*/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
