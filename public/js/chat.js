const socket = io();
let chatID = document.querySelector("#chat");
if (chatID) {
	chatID.addEventListener("submit", function (e) {
		e.preventDefault();
		let chat = {
			email: document.querySelector("#email").value,
			name: document.querySelector("#name").value,
			lastname: document.querySelector("#lastname").value,
			message: document.querySelector("#message").value,
			date: `[${moment().format("DD/MM/YYYY HH:mm:ss")}]`,
			message: document.querySelector("#message").value,
		};
		socket.emit("msn", chat);
		let messageID = document.querySelector("#message");
		if (messageID) {
			messageID.value = "";
		} else {
			console.error(error);
		}
	});
} else {
	console.error(error);
}

socket.on("chat", (data) => {
	let msn = data
		.map((d) => {
			return `
			<ul class="d-flex justify-content-start" style="margin-bottom: 0.1rem" >
			<div id="chatEmail"class=" bolder text-primary">${d.author.id}</div>
			<div id="chatDate" class="mx-1" style="color: brown;">${d.date}</div>
			<div id="chatMsn" class=" text-success fst-italic">${d.message}</div>
			</ul>`;
		})
		.join("");
	let messagesID = document.querySelector("#messages");
	if (messagesID) {
		messagesID.innerHTML = msn;
		socket.on("email", (email) => (document.querySelector("#email").value = email));
	} else {
		console.error(error);
	}
});
