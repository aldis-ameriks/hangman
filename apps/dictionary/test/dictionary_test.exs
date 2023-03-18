defmodule DictionaryTest do
  use ExUnit.Case

  test "random_word/0 returns a random word" do
    word = Dictionary.random_word()
    assert String.valid?(word)
    assert String.length(word) > 0
  end
end
