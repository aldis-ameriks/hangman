defmodule HangmanWeb.Live.Game do
  use HangmanWeb, :live_view

  def mount(_params, _session, socket) do
    game = HangmanCore.new_game()
    tally = HangmanCore.tally(game)
    socket = socket |> assign(%{game: game, tally: tally})
    {:ok, socket}
  end

  def handle_event("make_move", %{ "key" => key }, socket) do
    tally = HangmanCore.make_move(socket.assigns.game, key)
    { :noreply, assign(socket, :tally, tally) }
  end

  def render(assigns) do
    ~H"""
    <div class="game-holder" phx-window-keyup="make_move">
    <%= live_component(__MODULE__.Figure,    tally: assigns.tally, id: 1) %>
    <%= live_component(__MODULE__.Alphabet,  tally: assigns.tally, id: 2) %>
    <%= live_component(__MODULE__.Words, tally: assigns.tally, id: 3) %>
    </div>
    """
  end
end
