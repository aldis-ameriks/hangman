defmodule HangmanImplGameTest do
  use ExUnit.Case
  alias Hangman.Impl.Game

  test "new game returns structure" do
    game = Game.new_game()
    assert game.turns_left == 7
    assert game.game_state == :initializing
    assert game.used == MapSet.new([])
    assert length(game.letters) > 0
  end

  test "new game returns correct letters" do
    word = "foo"
    game = Game.new_game(word)
    assert game.turns_left == 7
    assert game.game_state == :initializing
    assert game.used == MapSet.new([])
    assert game.letters == ["f", "o", "o"]
  end

  test "state doesn't change if a game is won or lost" do
    for state <- [:won, :lost] do
      game = Game.new_game()
      game = Map.put(game, :game_state, state)
      {new_game, _tally} = Game.make_move(game, "x")
      assert new_game == game
    end
  end

  test "a duplicate letter is reported" do
    game = Game.new_game()
    {game, _tally} = Game.make_move(game, "x")
    assert game.game_state != :already_used
    {game, _tally} = Game.make_move(game, "y")
    assert game.game_state != :already_used
    {game, _tally} = Game.make_move(game, "x")
    assert game.game_state == :already_used
  end

  test "letters used are recorded" do
    game = Game.new_game()
    {game, _tally} = Game.make_move(game, "x")
    {game, _tally} = Game.make_move(game, "y")
    {game, _tally} = Game.make_move(game, "x")
    # assert MapSet.equal?(game.used, MapSet.new(["x", "y"]))
    assert game.used == MapSet.new(["x", "y"])
  end

  test "a letter is recognized in the word" do
    game = Game.new_game("foo")
    {game, tally} = Game.make_move(game, "f")
    assert tally.game_state == :good_guess
  end

  test "a letter is recognized that is not in the word" do
    game = Game.new_game("foo")
    {game, tally} = Game.make_move(game, "x")
    assert tally.game_state == :bad_guess
    {game, tally} = Game.make_move(game, "f")
    assert tally.game_state == :good_guess
    {game, tally} = Game.make_move(game, "y")
    assert tally.game_state == :bad_guess
  end

  test "can handle of sequence of moves" do
    [
      ["a", :bad_guess, 6, ["_", "_", "_", "_", "_"], ["a"]],
      ["a", :already_used, 6, ["_", "_", "_", "_", "_"], ["a"]],
      ["e", :good_guess, 6, ["_", "e", "_", "_", "_"], ["a", "e"]],
      ["x", :bad_guess, 5, ["_", "e", "_", "_", "_"], ["a", "e", "x"]]
    ]
    |> test_sequence_of_moves("hello")
  end

  test "handles winning game" do
    #  hello
    [
      ["a", :bad_guess, 6, ["_", "_", "_", "_", "_"], ["a"]],
      ["a", :already_used, 6, ["_", "_", "_", "_", "_"], ["a"]],
      ["e", :good_guess, 6, ["_", "e", "_", "_", "_"], ["a", "e"]],
      ["x", :bad_guess, 5, ["_", "e", "_", "_", "_"], ["a", "e", "x"]],
      ["h", :good_guess, 5, ["h", "e", "_", "_", "_"], ["a", "e", "h", "x"]],
      ["l", :good_guess, 5, ["h", "e", "l", "l", "_"], ["a", "e", "h", "l", "x"]],
      ["o", :won, 5, ["h", "e", "l", "l", "o"], ["a", "e", "h", "l", "o", "x"]]
    ]
    |> test_sequence_of_moves("hello")
  end

  test "handles losing game" do
    [
      ["a", :bad_guess, 6, ["_", "_", "_", "_", "_"], ["a"]],
      ["x", :bad_guess, 5, ["_", "_", "_", "_", "_"], ["a", "x"]],
      ["z", :bad_guess, 4, ["_", "_", "_", "_", "_"], ["a", "x", "z"]],
      ["y", :bad_guess, 3, ["_", "_", "_", "_", "_"], ["a", "x", "y", "z"]],
      ["t", :bad_guess, 2, ["_", "_", "_", "_", "_"], ["a", "t", "x", "y", "z"]],
      ["p", :bad_guess, 1, ["_", "_", "_", "_", "_"], ["a", "p", "t", "x", "y", "z"]],
      ["m", :lost, 0, ["h", "e", "l", "l", "o"], ["a", "m", "p", "t", "x", "y", "z"]]
    ]
    |> test_sequence_of_moves("hello")
  end

  defp test_sequence_of_moves(script, word) do
    game = Game.new_game(word)
    Enum.reduce(script, game, &check_one_move/2)
  end

  defp check_one_move([guess, state, turns, letters, used], game) do
    {game, tally} = Game.make_move(game, guess)
    assert tally.game_state == state
    assert tally.turns_left == turns
    assert tally.letters == letters
    assert tally.used == used
    game
  end
end
