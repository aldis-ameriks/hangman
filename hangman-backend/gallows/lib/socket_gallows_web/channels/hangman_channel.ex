defmodule SocketGallowsWeb.HangmanChannel do
  use Phoenix.Channel
  require Logger

  def join("hangman:game", _, socket) do
    {:ok, socket}
  end

  def handle_in("make_move", params, socket) do
    tally =
      socket.assigns.game
      |> Hangman.make_move(params["guess"])

    push(socket, "make_move", tally)
    {:noreply, socket}
  end

  def handle_in("new_game", _, socket) do
    game = Hangman.new_game()
    socket = assign(socket, :game, game)
    tally = Hangman.tally(game)
    push(socket, "new_game", tally)
    {:noreply, socket}
  end

  def handle_in(msg, _, socket) do
    Logger.error("Unknown message: #{msg}")
    {:noreply, socket}
  end

  def terminate(reason, socket) do
    Logger.debug "Leaving game: #{inspect reason}"
    socket.assigns.game |> Hangman.end_game
    :ok
  end
end
