import { Socket } from "phoenix"

export default class HangmanSocket {
	constructor() {
		this.socket = new Socket("/socket", {})
		this.socket.connect()
		console.dir(this.socket)
	}

	connectToHangman() {
		this.setupChannel()
		this.channel.on("tally", tally => {
			console.dir(tally);
		})
	}

	setupChannel() {
		this.channel = this.socket.channel("hangman:game", {})
		this.channel.join()
		.receive("ok", resp => {
			console.log("connected: " + resp);
			this.fetchTally()
		})
		.receive("error", resp => {
			alert(resp)
			throw(resp)
		})
	}

	fetchTally() {
		this.channel.push("tally", {})
	}
}