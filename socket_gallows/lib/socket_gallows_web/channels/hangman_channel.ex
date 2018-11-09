defmodule SocketGallowsWeb.HangmanChannel do
	use Phoenix.Channel
	require Logger

	def join("hangman:game", _, socket) do
		game = Hangman.new_game()
		socket = assign(socket, :game, game)
		{ :ok, socket }
	end

	def handle_in("tally", _, socket) do
		game = socket.assigns.game
		tally = Hangman.tally(game)
		push(socket, "tally", tally)
		{:noreply, socket}
	end

	def handle_in(msg, _, socket) do
		Logger.error("Unknown message: #{msg}")
		{:noreply, socket}
	end


end