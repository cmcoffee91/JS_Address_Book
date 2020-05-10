let arrayOfContacts;

window.onload = function() {
  getContacts()

}

//num of contacts to show
const numOfResults = 20;

//function to fetch contacts from randomuser api
const getContacts = () => {
  fetch('https://randomuser.me/api/?results=' + numOfResults)
    .then(res => res.json())
    .then((contacts)=>{
        arrayOfContacts = contacts.results;
        displayContacts();
    });
}




//function to show more info on the contact
const showMoreContact = (buttonId) => {
    //split button id to get contact id
    let splitButton = buttonId.split("_");
    let contactId = splitButton[splitButton.length-1]; 

    //show hidden rows
    document.getElementById(`dob_${contactId}`).style.visibility='visible';
    document.getElementById(`address_${contactId}`).style.visibility='visible';
    document.getElementById(`email_${contactId}`).style.visibility='visible';
    document.getElementById(`phone_${contactId}`).style.visibility='visible';


}

//function to display all of the contacts
const displayContacts = () => {
  const allPosts = document.getElementById('allContacts')
  arrayOfContacts.map((contact, index) => {
      //create table to store info
    let table = document.createElement("table");
    let row = table.insertRow(0);
    let name = row.insertCell(0);
    let pic = row.insertCell(1);
    let showMoreButton = row.insertCell(2);
    name.innerHTML = `<strong>${contact.name.first} ${contact.name.first}</strong>`;
    pic.innerHTML = ` <img src="${contact.picture.medium}" alt="Smiley face">`;
    //showMore button shows the rest of the contact info, when clicked it passes its id
    showMoreButton.innerHTML = `<button id="button_${index}" onClick="showMoreContact(this.id)" >Show More</button>`;


    /******DOB**********************************/
    //create DOB row and cells
    let rowDOB = table.insertRow(1);
    rowDOB.style.visibility = "hidden";
    //set row id 
    rowDOB.id = `dob_${index}`;
    let DOBCellTitle = rowDOB.insertCell(0);
    let dobCell = rowDOB.insertCell(1);

    //format date
    let date = new Date(contact.dob.date);
    let options = {  year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleString('en-US', options);

    DOBCellTitle.innerHTML = `<strong>DOB:</strong>`;
    dobCell.innerHTML = `${dateString}`;


    /******Address**********************************/
    //create address row and cells
    let rowAddress = table.insertRow(2);
    //set row to hidden by default
    rowAddress.style.visibility = "hidden";
    //set row id 
    rowAddress.id = `address_${index}`;
    let addressTitle = rowAddress.insertCell(0);
    let addressCell = rowAddress.insertCell(1);
    addressTitle.innerHTML = `<strong>Address:</strong>`;
    addressCell.innerHTML = `${contact.location.street.number} ${contact.location.street.name} - <strong>${contact.location.country}</strong> - ${contact.location.city}, ${contact.location.state} ${contact.location.postcode}`;


    /******Email**********************************/
    //create email row and cells
    let rowEmail = table.insertRow(3);
    //set row to hidden by default
    rowEmail.style.visibility = "hidden";
    //set row id 
    rowEmail.id = `email_${index}`;
    let emailTitle = rowEmail.insertCell(0);
    let emailCell = rowEmail.insertCell(1);
    emailTitle.innerHTML = `<strong>Email</strong>:`;
    emailCell.innerHTML = `${contact.email}`;


    /******Phone**********************************/
    //create phone row and cells
    let rowPhone = table.insertRow(4);
    //set row to hidden by default
    rowPhone.style.visibility = "hidden";
    //set row id 
    rowPhone.id = `phone_${index}`;
    let phoneTitle = rowPhone.insertCell(0);
    let phoneCell = rowPhone.insertCell(1);
    phoneTitle.innerHTML = `<strong>Phone</strong>:`;
    phoneCell.innerHTML = `${contact.phone}`;

    let hr = document.createElement("hr");
    allPosts.append(hr);
    allPosts.append(table);
  })
}
