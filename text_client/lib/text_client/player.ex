defmodule TextClient.Player do
  alias TextClient.{Mover, Prompter, State, Summary}

  def play(%State{tally: %{game_state: :won}}) do
    exit_with_message("You may live another day.")
  end

  def play(%State{tally: %{game_state: :lost}}) do
    exit_with_message([
      "_________\n",
      "|         |\n",
      "|         0\n",
      "|        /|\\    <-- that's you now.\n",
      "|        / \\\n",
      "|\n",
      "|\n"
    ])
  end

  def play(game = %State{tally: %{game_state: :good_guess}}) do
    continue_with_message(game, "Lucky.")
  end

  def play(game = %State{tally: %{game_state: :bad_guess}}) do
    continue_with_message(game, "One step closer to your demise.")
  end

  def play(game = %State{tally: %{game_state: :already_used}}) do
    continue_with_message(game, "Your negligence disgusts me.")
  end

  def play(game) do
    continue(game)
  end

  def continue(game) do
    game
    |> Summary.display()
    |> Prompter.accept_move()
    |> Mover.make_move()
    |> play()
  end

  defp exit_with_message(msg) do
    IO.puts(msg)
    exit(:normal)
  end

  defp continue_with_message(game, msg) do
    IO.puts(msg)
    continue(game)
  end
end
