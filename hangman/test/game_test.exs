defmodule GameTest do
  use ExUnit.Case

  alias Hangman.Game

  test "new_game returns initial structure" do
    game = Game.new_game()
    assert game.turns_left == 7
    assert game.game_state == :started
    assert length(game.letters) > 0
    assert game.letters |> Enum.all?(fn x -> String.match?(x, ~r/\A[a-z]\z/) end)
  end

  test "state isn't changed for :won or :lost game" do
    for state <- [:won, :lost] do
      game = Game.new_game() |> Map.put(:game_state, state)
      assert {^game, _tally} = Game.make_move(game, "x")
    end
  end

  test "first occurence of letter is not alrady used" do
    {game, _tally} = Game.new_game() |> Game.make_move("x")
    assert game.game_state != :already_used
  end

  test "second occurence of letter is not alrady used" do
    {game, _tally} = Game.new_game() |> Game.make_move("x")
    assert game.game_state != :already_used
    {game, _tally} = Game.make_move(game, "x")
    assert game.game_state == :already_used
  end

  test "a good guess is recognized" do
    game = Game.new_game("wibble")
    {game, _tally} = Game.make_move(game, "w")
    assert game.game_state == :good_guess
    assert game.turns_left == 7
  end

  test "a guessed word is a won game" do
    game = Game.new_game("hangy")

    moves = [
      {"g", :good_guess, 7},
      {"a", :good_guess, 7},
      {"n", :good_guess, 7},
      {"h", :good_guess, 7},
      {"y", :won, 7}
    ]

    fun = fn {guess, state, turns_left}, game ->
      {game, _tally} = Game.make_move(game, guess)
      assert game.game_state == state
      assert game.turns_left == turns_left
      game
    end

    Enum.reduce(moves, game, fun)
  end

  test "too many wrong guesses lose the game" do
    game = Game.new_game("x")

    moves = [
      {"a", :bad_guess, 6},
      {"b", :bad_guess, 5},
      {"c", :bad_guess, 4},
      {"d", :bad_guess, 3},
      {"e", :bad_guess, 2},
      {"f", :bad_guess, 1},
      {"g", :lost, 0}
    ]

    fun = fn {guess, state, turns_left}, game ->
      {game, _tally} = Game.make_move(game, guess)
      assert game.game_state == state
      assert game.turns_left == turns_left
      game
    end

    Enum.reduce(moves, game, fun)
  end

  test "an invalid guess is recognized" do
    {game, _tally} = Game.new_game("word") |> Game.make_move("wo")
    assert game.game_state == :invalid_guess

    {game, _tally} = Game.new_game("word") |> Game.make_move("")
    assert game.game_state == :invalid_guess

    {game, _tally} = Game.new_game("word") |> Game.make_move("W")
    assert game.game_state == :invalid_guess
  end
end
