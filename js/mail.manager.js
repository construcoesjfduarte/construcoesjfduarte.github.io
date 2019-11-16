document.getElementById("emailForm").addEventListener('submit', function(event){
    event.preventDefault();
    console.log("Submit catched");
    const name = document.getElementById("emailName").value;
    const email = document.getElementById("emailFrom").value;
    const subject = document.getElementById("emailSubject").value;
    const content = document.getElementById("emailContent").value;

    console.log({name, email, content});
    // sendMail(name, email, content);

});


function sendMail(name, email, content){
    $.ajax({
        url: server + "emails/send",
        type: "POST",
        data: {name: name, email: email, content},
        dataType: "json",
        success: function(data) {
            console.log(data);  
        },
        error: function(data){
            console.error(data);
        }
    });
}

