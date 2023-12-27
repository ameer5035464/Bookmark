
var bookMarkName = document.getElementById("bookMarkName");

var siteUrl = document.getElementById("siteUrl");

var siteLists = [];

if(localStorage.getItem("Urls") != null){

siteLists=JSON.parse(localStorage.getItem("Urls"));

displayUrls();

}


function userErrorMessage(){

    var toastData = 
    `
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
<div class=" p-3 d-flex justify-content-between">
    <div>
        <i class="fa-solid fa-circle me-1" style="color: #f15f5d;"></i>
        <i class="fa-solid fa-circle me-1" style="color: #febe2e;"></i>
        <i class="fa-solid fa-circle me-1" style="color: #4db748;"></i>
    </div>
    <div>
  <button type="button" class="btn-close bg-transparent me-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>    
</div>  
<div class="toast-body">
  <p class="fw-bold">Site Name or Url is not valid, Please follow the rules below :</p>

  <div>
    <div>
    <i class="fa-regular fa-circle-right" style="color: #bb4120;"></i> Site name must contain at least 3 characters
    </div>
    <div>
    <i class="fa-regular fa-circle-right" style="color: #bb4120;"></i> Site URL must be a valid one
    </div>
  </div>
</div>
</div>
    
    `;

    document.getElementById("showToast").innerHTML = toastData;
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }
    



}

function addWebsite(){
    if(validationBookmark() == true && validationUrl()== true){
    var website = {
        bookmark: bookMarkName.value,
        webUrl: siteUrl.value
    }   

    siteLists.push(website);

    localStorage.setItem("Urls",JSON.stringify(siteLists));

    clearInput();
    displayUrls();

    bookMarkName.classList.remove("is-invalid");
    bookMarkName.classList.remove("is-valid");

    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.remove("is-valid");

    userErrorMessage();

    }
    
} 

function clearInput(){
    bookMarkName.value = "";
    siteUrl.value = "";
}

function displayUrls(){

    htmlContainer = "";

    for (var index = 0; index < siteLists.length; index++) {
        
        htmlContainer += 
        `
        <tr>
            <td> ${index+1} </td>
            <td>${siteLists[index].bookmark}</td>
            <td>
            <a class="btn btnOne m-auto w-25 d-flex text-bg-danger align-items-center justify-content-between text-center pe-4" target="_blank" href="${siteLists[index].webUrl}"><i class="fa-solid fa-eye text-white"></i> Visit </a> 
            </td>
            <td>
            <button  onclick="deleteUrl(${index})" class="btn m-auto w-25 d-flex text-bg-danger align-items-center justify-content-between text-center pe-4" href=""><i class="fa-solid fa-trash-can"></i>Delete</button> 
            </td>
        </tr>
        `
    }

    document.getElementById("tableFill").innerHTML=htmlContainer;

}

function deleteUrl(urlToDelete){

    siteLists.splice(urlToDelete,1);

    localStorage.setItem("Urls",JSON.stringify(siteLists));

    displayUrls();
}


function validationBookmark(){

    var bkmrk = bookMarkName.value;
    var regexBookmark = /^[a-z A-Z]{3,}$/;

    if(regexBookmark.test(bkmrk)){

        bookMarkName.classList.add("is-valid");
        bookMarkName.classList.remove("is-invalid");

        return true;
    }
    else{
        bookMarkName.classList.add("is-invalid");
        bookMarkName.classList.remove("is-valid");

        return false;
    }
}

function validationUrl(){

    var urlValue = siteUrl.value;
    var regexUrl = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if(regexUrl.test(urlValue)){

        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");

        return true;
    }
    else{
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");

        return false;
    }
}
