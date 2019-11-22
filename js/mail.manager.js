document.getElementById("emailForm").addEventListener('submit', function(event){
    event.preventDefault();
    const name = document.getElementById("emailName").value;
    const email = document.getElementById("emailFrom").value;
    const subject = document.getElementById("emailSubject").value;
    const content = document.getElementById("emailContent").value;
    sendMail(name, email, subject, content);

});

function emailNotification(success){

    const container = document.getElementById("notifications-panel");
    let notification = document.createElement("div");
    notification.classList.add("notification", success ? "success" : "failure");

    let content = document.createElement("div");
    content.classList.add("notification-content");
    let msg = success ? "Email enviado com sucesso" : "Falha ao enviar email. Tente mais tarde";
    content.textContent = msg;

    let close = document.createElement("div");
    close.classList.add("notification-close");
    close.addEventListener("click", function(){
        notification.remove();
    }, false);

    let closeI = document.createElement("i");
    closeI.classList.add("fas", "fa-times");
    close.appendChild(closeI);

    notification.appendChild(content);
    notification.appendChild(close);
    container.appendChild(notification);


    setTimeout(function(){
        notification.remove();
    }, 6000);
}

function sendMail(name, email, subject, content){
    $.ajax({
        url: server + "/emails/send",
        type: "POST",
        data: {name, email, subject, content},
        dataType: "json",
        success: function(_data) {
            emailNotification(true);
            document.getElementById("emailForm").reset();
              
        },
        error: function(_data){
            emailNotification(false);
        }
    });
}

